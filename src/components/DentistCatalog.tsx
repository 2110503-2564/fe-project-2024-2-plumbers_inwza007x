import Card from "./Card";
import { DentistJson } from "@/libs/interfaces";

interface DentistCatalogProps {
    DentistJson: DentistJson;
}

export default function DentistCatalog({ DentistJson }: DentistCatalogProps) {
    return (
        <div className="flex flex-wrap justify-center gap-6">
            {DentistJson.data.map((dentist) => (
                <Card 
                    key={dentist.dentistID}
                    dentistID={dentist.dentistID} 
                    name={dentist.name} 
                    experience={dentist.experience} 
                    expertise={dentist.expertise} 
                />
            ))}
        </div>
    );
}
