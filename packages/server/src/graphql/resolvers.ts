import prisma from "../lib/prisma";

export const resolvers = {
    Query: {
        drones: () => {
            return prisma.drone.findMany();
        },
    },
};
