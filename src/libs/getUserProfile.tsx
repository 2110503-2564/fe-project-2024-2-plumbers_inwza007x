export default async function getUserProfile(token: string) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/auth/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch user profile");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Profile fetch error:", error.message || error);
        return null;
    }
};
