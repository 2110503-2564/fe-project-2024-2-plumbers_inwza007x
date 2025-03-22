"use client";

import {ReactNode, useState} from "react";
import { useRouter } from "next/navigation";

interface InteractiveCardProps {
    children: ReactNode;
    vid: string;
    onRemove?: () => void;
}

export default function InteractiveCard({children, vid, onRemove}: InteractiveCardProps) {
    // const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        // router.push(`/venue/${vid}`);
        /*
        if (onRemove) {
            onRemove();
        }
        */
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            className={`w-fit inline-block overflow-hidden m-4 align-top rounded-lg ${
                isHovered ? "shadow-2xl bg-neutral-200" : "shadow-lg bg-white"
            } transition-all duration-300 ease-in-out cursor-pointer`}
        >
            {children}
        </div>
    );
}
