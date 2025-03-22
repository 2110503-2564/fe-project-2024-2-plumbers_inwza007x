import Image from "next/image";
import InteractiveCard from "./InteractiveCard"
import Rating from "@mui/material/Rating";

interface CardProps {
    venueName: string;
    imgSrc: string;
    rating?: number;
    vid: string;
    onRatingChange?: (newRating: number) => void;
    onRemove?: () => void;
}

export default function Card({venueName, imgSrc, rating, vid, onRatingChange, onRemove}: CardProps) {
    const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
        onRatingChange?.(newValue ?? 0);
    };

    return (
        <InteractiveCard vid={vid} onRemove={onRemove}>
            <div className="relative w-full h-[200px]">
                <Image src={imgSrc} alt={venueName} width={300} height={200} className="object-cover" />
            </div>
            <div className="p-6">
                <h2 className="text-xl mb-3 text-gray-800">{venueName}</h2>
                {rating !== undefined && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Rating value={rating} onChange={handleRatingChange} id={`${venueName} Rating`} name={`${venueName} Rating`} data-testid={`${venueName} Rating`} />
                    </div>
                )}
            </div>
        </InteractiveCard>
    );
}