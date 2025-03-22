import {VenueJson} from "./interfaces";

export default async function getVenues(): Promise<VenueJson> {
    const url = "https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues";

    await new Promise(resolve => setTimeout(resolve, 300));

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch venues");
        }

        const json: VenueJson = await response.json();
        return json;
    } 
    catch (error) {
        console.error("Error fetching venues:", error);
        return {
            success: false,
            count: 0,
            pagination: {},
            data: []
        };
    }
};