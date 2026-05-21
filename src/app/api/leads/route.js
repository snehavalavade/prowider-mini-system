import { prisma } from "@/lib/prisma";
import { allocateLead } from "@/lib/allocation";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const lead = await prisma.lead.create({
            data: {
                name: body.name,
                phone: body.phone,
                city: body.city,
                description: body.description,
                serviceType: body.serviceType,
            },
        });

        await allocateLead(lead.id, body.serviceType);

        return NextResponse.json({
            success: true,
            message: "Lead created successfully",
        });
    } catch (error) {
        console.log(error);

        if (error.code === "P2002") {
            return NextResponse.json(
                {
                    error: "Duplicate lead for same service is not allowed",
                },
                {
                    status: 400,
                },
            );
        }

        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            {
                status: 500,
            },
        );
    }
}
