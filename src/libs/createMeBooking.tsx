import BACKEND_URL from "./geturl";

export default async function createMeBooking(formData: { dentistID: number, date: Date }, token: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/bookings/me`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                dentistID: formData.dentistID,
                date: formData.date instanceof Date ? formData.date.toISOString() : formData.date,
            })            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create booking");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Create booking error:", error.message || error);
        return null;
    }
}