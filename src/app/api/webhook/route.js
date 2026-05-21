export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const existingEvent = await prisma.webhookEvent.findUnique({
            where: {
                id: body.eventId,
            },
        });

        if (existingEvent) {
            return NextResponse.json({
                message: "Webhook already processed",
            });
        }

        await prisma.webhookEvent.create({
            data: {
                id: body.eventId,
            },
        });

        await prisma.provider.updateMany({
            data: {
                leadsReceived: 0,
            },
        });

        return NextResponse.json({
            message: "Provider quotas reset successfully",
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                error: "Webhook failed",
            },
            {
                status: 500,
            },
        );
    }
}
