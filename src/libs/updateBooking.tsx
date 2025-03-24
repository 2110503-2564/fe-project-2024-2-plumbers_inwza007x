export default async function updateBooking( bookingID: string, formData: { userID: Number, dentistID: Number, date: Date}) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/booking/${bookingID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
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