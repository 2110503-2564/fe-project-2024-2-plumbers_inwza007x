import BACKEND_URL from "./geturl";

export default async function getMeBooking(token: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/bookings/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to get booking");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Get booking error:", error.message || error);
        return null;
    }
}