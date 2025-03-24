"use client";

import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import DentistCatalog from "@/components/DentistCatalog";
import { DentistJson } from "@/libs/interfaces";
import getDentists from "@/libs/getDentists";
import { useSession } from "next-auth/react";

export default function DentistList() {
    const { data: session, status } = useSession();
    const [dentists, setDentists] = useState<DentistJson | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            getDentists(session.user.token)
                .then((data) => setDentists(data)) // dentistid -> dentistID
                .catch(() => setDentists(null))
                .finally(() => setLoading(false));
        }
    }, [session]);

    if (!session) {
        return <h1>Error naja 😢</h1>;
    }

    if (loading) {
        return <LinearProgress />;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Choose Your Dentist</h1>
            {dentists ? (
                <DentistCatalog DentistJson={dentists} />
            ) : (
                <h2>No dentists available. Karu is still the cutest though 🥰.</h2>
            )}
        </div>
    );
}
