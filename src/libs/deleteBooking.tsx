import BACKEND_URL from "./geturl";

export default async function deleteBooking(bookingID: Number, token: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${bookingID}`, {
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
        console.error("Delete booking error:", error.message || error);
        return null;
    }
}