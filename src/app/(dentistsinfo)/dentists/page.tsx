import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import DentistCatalog from "@/components/DentistCatalog";
import { DentistItem, DentistJson } from "@/libs/interfaces";

const mockDentists: DentistItem[] = [
    { DentistID: 1, name: "Dr. Karu Sudsuay", experience: 10, expertise: "Morlam" },
    { DentistID: 2, name: "Dr. Poru Yraii", experience: 8, expertise: "ไม่เชื่อครับโม้" },
    { DentistID: 3, name: "Dr. opal zaza", experience: 12, expertise: "Just a nerd" },
    { DentistID: 4, name: "Dr. Fluke ka5567", experience: 5, expertise: "Dota top tier player" },
    { DentistID: 5, name: "Dr. Kkang 456", experience: 2, expertise: "Roblox pro player" }
];

const getDentists = async (): Promise<DentistJson> => { // TODO
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                pagination: {},
                data: mockDentists,
            });
        }, 1000);
    });
};

export default async function DentistPage() {
    const dentists = await getDentists();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Choose Your Dentist</h1>
            <DentistCatalog DentistJson={dentists} />
        </div>
    );
}
