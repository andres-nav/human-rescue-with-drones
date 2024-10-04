'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/auth";
import Link from "next/link";

import { findDronesForUser } from "@/actions/drone";
import { findMissionsForUser } from "@/actions/mission";

import ListDrones from "@/components/drone/list";
import ListMissions from "@/components/mission/list";

export default function Dashboard() {
    const { data: session, status } = useSession()
    const [drones, setDrones] = useState([]);
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        if (status === 'authenticated') {
            const email = session?.user?.email;
            findDronesForUser(email).then((res) => {
                setDrones(res);
            });

            findMissionsForUser(email).then((res) => {
                setMissions(res);
            });
        }
    }, [status]);

    return (
        <div className="flex flex-col">
            <div className="mb-4">
                <p>Member Area</p>
                <p>Signed in as&nbsp;
                    {status === 'authenticated'
                        ? session?.user?.email
                        : '...'
                    }
                </p>
                <ListDrones drones={drones}/>
                <ListMissions missions={missions}/>
            </div>
            <form action={logout}>
                <button disabled={status === 'loading' ? true : false} className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 disabled:bg-slate-50 disabled:text-slate-500">
                    Sign Out {status === 'loading' ? '...' : ''}
                </button>
            </form>
        </div>
    );
}
