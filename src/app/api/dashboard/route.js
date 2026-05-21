export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const providers = await prisma.provider.findMany({
            include: {
                assignments: {
                    include: {
                        lead: true,
                    },
                },
            },

            orderBy: {
                providerNumber: "asc",
            },
        });

        return NextResponse.json(providers);
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                error: error.message || "Failed to fetch dashboard",
            },
            {
                status: 500,
            },
        );
    }
}
