import InteractiveCard from "./InteractiveCard";
import { DentistItem } from "@/libs/interfaces";

export default function Card({ dentistID, name, experience, expertise }: DentistItem) {
    return (
        <InteractiveCard DentistID={dentistID}>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 mt-4 w-100 p-6">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
                    <p className="text-sm text-gray-500">{expertise}</p>
                </div>

                <div className="flex justify-between mb-4 text-lg text-gray-600">
                    <div>
                        <p className="font-semibold">Experience</p>
                        <p>{experience} years</p>
                    </div>
                    <div className="ml-3">
                        <p className="font-semibold">Expertise</p>
                        <p>{expertise}</p>
                    </div>
                </div>
            </div>
        </InteractiveCard>
    );
}
