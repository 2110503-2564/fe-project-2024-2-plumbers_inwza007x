export default async function createMeBooking(formData: { userID: Number, dentistID: Number, date: Date}) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/booking/me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create booking");
        }

        return data;
    } 
    catch (error: any) {
        console.error("create booking error:", error.message || error);
        return null;
    }
}