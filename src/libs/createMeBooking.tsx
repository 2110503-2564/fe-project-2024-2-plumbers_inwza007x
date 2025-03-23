export default async function createMeBooking(formData: { userID: number, dentistID: number, bookDate: Date}, token: string) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/bookings/me", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                dentistID: formData.dentistID,
                date: formData.bookDate instanceof Date ? formData.bookDate.toISOString() : formData.bookDate,
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