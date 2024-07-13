import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const droneData: Prisma.DroneCreateInput[] = [
    {
        ip: "12.12.12.13",
        secret: "LKDJFSLDF",
        name: "Comeback Kid",
        status: "ACTIVE",
    },
];

export async function main() {
    try {
        console.log(`Start seeding ...`);
        for (const d of droneData) {
            const drone = await prisma.drone.create({
                data: d,
            });
            console.log(`Created drone with id: ${drone.id}`);
        }
        console.log(`Seeding finished.`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
