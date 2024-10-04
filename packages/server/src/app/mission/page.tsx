'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

import ListDrones from "@/components/drone/list";
import ListAlerts from "@/components/alert/list";

import { findDronesForMission } from "@/actions/drone";
import { findAlertsForMission } from "@/actions/alert";

export default function Mission() {
    const { data: session, status } = useSession()
  const searchParams = useSearchParams();
    const [drones, setDrones] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (status === 'authenticated') {
            const id = searchParams.get('id');

            if (!id || isNaN(parseInt(id))) {
                return;
            }
            console.log('id', id);

            findDronesForMission(id).then((res) => {
                setDrones(res);
            });

            findAlertsForMission(id).then((res) => {
                setAlerts(res);
            });
        }
    }, [status]);

    return (
        <div className="flex flex-col">
            <div className="mb-4">
                <ListDrones drones={drones} />
                <ListAlerts alerts={alerts} />
            </div>
        </div>
    );
}
