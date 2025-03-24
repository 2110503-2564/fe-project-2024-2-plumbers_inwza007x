export default async function getMeBooking(token: string) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/bookings/me", {
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
        console.error("get booking error:", error.message || error);
        return null;
    }
}