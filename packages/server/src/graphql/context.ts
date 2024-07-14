import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function createContext({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}): Promise<{ user?: Session["user"] }> {
    const session = await getSession({ req });

    // if the user is not logged in, return an empty object
    if (!session || !session.user) return {};

    const { user } = session;

    return {
        user,
    };
}
