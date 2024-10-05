'use server';

import prisma from '@/lib/prisma';

import { checkRulesForMission } from '@/actions/rule';

export async function POST(req) {
    try {
        const { droneId, secret, missionId, detectedObject, confidence, imageUrl } = await req.json();

        if (!droneId || !secret || !missionId || !detectedObject || confidence === undefined) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const droneSecret = await prisma.drone.findUnique({
            where: {
                id: parseInt(droneId),
            },
            select: {
                secret: true,
            },
        });

        if (!droneSecret || droneSecret.secret !== secret) {
            return new Response(JSON.stringify({ message: 'Invalid drone secret' }), {
                status: 403,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // TODO: Check if droneId and missionId exist and if user has persmission

        const detection = await prisma.detection.create({
            data: {
                droneId: parseInt(droneId),
                missionId: parseInt(missionId),
                detectedObject,
                confidence,
                imageUrl,
            },
        });

        // check detections to create a new alert
        checkRulesForMission(missionId, detection);

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
