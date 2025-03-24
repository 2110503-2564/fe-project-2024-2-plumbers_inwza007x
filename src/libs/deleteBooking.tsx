export default async function deleteBooking( bookingID: string) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/booking/${bookingID}`, {
            method: "DEL",
            headers: { "Content-Type": "application/json" },
            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete booking");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Delete booking error:", error.message || error);
        return null;
    }
}