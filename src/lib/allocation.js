import { prisma } from "./prisma";
import { mandatoryProviders, providerPools } from "./rules";

export async function allocateLead(leadId, serviceType) {
    return prisma.$transaction(async (tx) => {
        const selectedProviders = new Set();

        const mandatory = mandatoryProviders[serviceType];

        for (const providerNumber of mandatory) {
            const provider = await tx.provider.findUnique({
                where: {
                    providerNumber,
                },
            });

            if (provider && provider.leadsReceived < provider.monthlyQuota) {
                selectedProviders.add(providerNumber);
            }
        }

        const pool = providerPools[serviceType];

        const state = await tx.allocationState.findUnique({
            where: {
                id: serviceType,
            },
        });

        let currentIndex = state.currentIndex;

        while (selectedProviders.size < 3) {
            const providerNumber = pool[currentIndex % pool.length];

            currentIndex++;

            if (selectedProviders.has(providerNumber)) {
                continue;
            }

            const provider = await tx.provider.findUnique({
                where: {
                    providerNumber,
                },
            });

            if (!provider || provider.leadsReceived >= provider.monthlyQuota) {
                continue;
            }

            selectedProviders.add(providerNumber);
        }

        await tx.allocationState.update({
            where: {
                id: serviceType,
            },
            data: {
                currentIndex,
            },
        });

        for (const providerNumber of selectedProviders) {
            const provider = await tx.provider.findUnique({
                where: {
                    providerNumber,
                },
            });

            await tx.leadAssignment.create({
                data: {
                    leadId,
                    providerId: provider.id,
                },
            });

            await tx.provider.update({
                where: {
                    id: provider.id,
                },
                data: {
                    leadsReceived: {
                        increment: 1,
                    },
                },
            });
        }

        return [...selectedProviders];
    });
}
