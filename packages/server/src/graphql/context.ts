import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function createContext({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    // const session = await getSession(req, res)
    const session = undefined;

    // if the user is not logged in, return null
    if (!session || typeof session === "undefined") return {};

    const { user, accessToken } = session;

    return {
        user,
        accessToken,
    };
}
