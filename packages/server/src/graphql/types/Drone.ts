import { builder } from "../builder";

builder.prismaObject("Drone", {
    fields: (t) => ({
        id: t.exposeID("id"),
        ip: t.exposeString("ip"),
        name: t.exposeString("name"),
    }),
});

builder.queryField("drone", (t) =>
    t.prismaField({
        type: "Drone",
        nullable: true,
        args: {
            id: t.arg.id({ required: true }),
        },
        resolve: (query, _parent, args, _info) =>
            prisma.drone.findUnique({
                ...query,
                where: {
                    id: Number(args.id),
                },
            }),
    }),
);
