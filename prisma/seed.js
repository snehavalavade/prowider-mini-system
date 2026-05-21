import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const providers = Array.from({ length: 8 }, (_, i) => ({
        providerNumber: i + 1,
        name: `Provider ${i + 1}`,
    }));

    await prisma.provider.createMany({
        data: providers,
        skipDuplicates: true,
    });

    await prisma.allocationState.createMany({
        data: [
            {
                id: "SERVICE_1",
                currentIndex: 0,
            },
            {
                id: "SERVICE_2",
                currentIndex: 0,
            },
            {
                id: "SERVICE_3",
                currentIndex: 0,
            },
        ],
        skipDuplicates: true,
    });

    console.log("Seed complete");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
