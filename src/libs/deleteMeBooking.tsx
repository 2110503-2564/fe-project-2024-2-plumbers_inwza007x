export default async function deleteMeBooking(token: string) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/bookings/me", {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete booking");
        }

        return data;
    } 
    catch (error: any) {
        console.error("delete booking error:", error.message || error);
        return null;
    }
}