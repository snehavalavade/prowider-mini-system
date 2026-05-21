import { prisma } from "@/lib/prisma";
import { allocateLead } from "@/lib/allocation";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const promises = Array.from({ length: 10 }, async (_, index) => {
            const lead = await prisma.lead.create({
                data: {
                    name: `Test User ${Date.now()}-${index}`,

                    phone: `${Math.floor(Math.random() * 10000000000)}`,

                    city: "Bangalore",

                    description: "Bulk generated lead",

                    serviceType: "SERVICE_1",
                },
            });

            await allocateLead(lead.id, "SERVICE_1");
        });

        await Promise.all(promises);

        return NextResponse.json({
            message: "10 leads generated successfully",
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                error: "Failed to generate leads",
            },
            {
                status: 500,
            },
        );
    }
}
