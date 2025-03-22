import { ReactNode } from "react";

interface InteractiveCardProps {
    children: ReactNode;
    DentistID: number;
}

export default function InteractiveCard({ children, DentistID }: InteractiveCardProps) {
    return (
        <div className="w-fit inline-block overflow-hidden m-4 align-top rounded-lg shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer hover:shadow-xl">
            {children}
        </div>
    );
}
