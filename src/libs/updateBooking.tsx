import BACKEND_URL from "./geturl";

export default async function updateBooking(formData: { userID: Number, dentistID: Number, date: Date, bookingID: Number }, token: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${formData.bookingID}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update booking");
        }

        return data;
    } 
    catch (error: any) {
        console.error("update booking error:", error.message || error);
        return null;
    }
}