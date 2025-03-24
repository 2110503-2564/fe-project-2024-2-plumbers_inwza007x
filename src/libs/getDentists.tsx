export default async function getDentists(token: string) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/dentists", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch dentists");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Dentists fetch error:", error.message || error);
        return null;
    }
};