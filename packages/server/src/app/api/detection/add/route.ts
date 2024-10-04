'use server';

import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const { droneId, missionId, detectedObject, confidence, imageUrl } = await req.json();

        if (!droneId || !missionId || !detectedObject || confidence === undefined) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // TODO: Check if droneId and missionId exist

        const detection = await prisma.detection.create({
            data: {
                droneId: parseInt(droneId),
                missionId: parseInt(missionId),
                detectedObject,
                confidence,
                imageUrl,
            },
        });

        return new Response(JSON.stringify(detection), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding detection:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
