import BACKEND_URL from "./geturl";

export default async function getUserProfile(token: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
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
