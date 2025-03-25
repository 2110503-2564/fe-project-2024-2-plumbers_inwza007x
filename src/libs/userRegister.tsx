import BACKEND_URL from "./geturl";

export default async function userRegister(formData: { name: string; email: string; phone: string; password: string; role: string }) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to register");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Registration error:", error.message || error);
        return null;
    }
}