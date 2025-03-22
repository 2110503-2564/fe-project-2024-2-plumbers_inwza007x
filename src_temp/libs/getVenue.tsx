import {VenueItem, VenueResponse} from "./interfaces";

export default async function getVenue(vid: string): Promise<VenueResponse> {
    const url = `https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues/${vid}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch venue data");
        }

        const json: VenueResponse = await response.json();
        return json;
    } 
    catch (error) {
        console.error("Error fetching venue:", error);
        throw error;
    }
}
