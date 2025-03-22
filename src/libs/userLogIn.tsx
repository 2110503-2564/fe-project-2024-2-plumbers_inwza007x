export default async function userLogIn(userEmail: string, userPassword: string) {
    try {
        const response = await fetch("https://a08-venue-explorer-backend-3.vercel.app/api/v1/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: userEmail, password: userPassword})
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to log in");
        }

        return data;
    } 
    catch (error: any) {
        console.error("Login error:", error.message || error);
        return null;
    }
};
