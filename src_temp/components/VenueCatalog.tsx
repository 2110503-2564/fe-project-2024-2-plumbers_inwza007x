import Card from "./Card";
import {VenueJson} from "@/libs/interfaces";
import Link from "next/link";

interface VenueCatalogProps {
    venuesJson: VenueJson;
}

export default function VenueCatalog({venuesJson}: VenueCatalogProps) {
    return (
        <div className="flex flex-wrap justify-center gap-6">
            {venuesJson.data.map((venue) => (
                <Link key={venue._id} href={`/venue/${venue.id}`} passHref>
                    <Card venueName={venue.name} imgSrc={venue.picture} vid={venue.id} />
                </Link>
            ))}
        </div>
    );
}