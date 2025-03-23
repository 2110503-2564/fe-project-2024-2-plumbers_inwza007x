export default async function userLogIn(userEmail: string, userPassword: string) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: userEmail, password: userPassword})
        });

        const data = await response.json();
        //console.log("Login Response Data:", data);

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
