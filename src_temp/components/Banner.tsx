"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function Banner() {
    const router = useRouter();
    const {data: session} = useSession();
    const [imageIndex, setImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // console.log(session?.user.token);

    const images = [
        "/img/cover.jpg",
        "/img/cover2.jpg",
        "/img/cover3.jpg",
        "/img/cover4.jpg"
    ];

    const handleBannerClick = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
        }
    };

    const handleSelectVenue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push("/venue");
    };

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsTransitioning(false);
            }, 420);

            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    return (
        <div className="relative w-full h-[400px] cursor-pointer overflow-hidden"  onClick={handleBannerClick}>
            {session && (
                <div className="absolute top-2 right-4 z-30 font-semibold text-cyan-100 text-xl pointer-events-none">
                    Welcome {session.user.name}
                </div>
            )}
            
            <div className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${isTransitioning ? "-translate-x-full" : "translate-x-0"}`}>
                <Image src={images[imageIndex]} alt="cover" fill={true} className="object-cover w-full h-full" priority />
            </div>

            <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
                {images.map((_, idx) => (
                    <button key={idx} className={`w-3 h-3 rounded-full ${idx === imageIndex ? "bg-white" : "bg-gray-400"}`} onClick={(e) => {e.stopPropagation(); setImageIndex(idx);}} />
                ))}
            </div>

            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center px-5 z-5">
                <h1 className="text-4xl mb-4 font-bold text-shadow-lg">where every event finds its venue</h1>
                <p className="text-lg text-shadow-md">มาม่วนร่วมกันในบรรยากาศหมอลำสุดมันส์!</p>
            </div>

            <button className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-lg transition-colors duration-300 z-20" onClick={handleSelectVenue}>
                Select Venue
            </button>
        </div>
    );
}
