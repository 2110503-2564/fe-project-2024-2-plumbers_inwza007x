"use client";

import React, { useState } from "react";
import userRegister from "@/libs/userRegister";
import { TextField, Button, CircularProgress, Snackbar, Alert, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target as { name?: string; value: string };
        if (name) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = await userRegister(formData);

            if (!data) {
                throw new Error("Failed to register");
            }

            console.log("User registered successfully:", data);
            setSuccessOpen(true);
            setFormData({ name: "", email: "", phone: "", password: "", role: "user" });
        } 
        catch (error: any) {
            console.error("Registration error:", error.message || error);
        } 
        finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseSuccess = () => setSuccessOpen(false);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key) => (
                        key !== "role" ? (
                            <TextField key={key} type={key === "password" ? "password" : "text"} name={key} value={(formData as any)[key]} onChange={handleChange} label={key.charAt(0).toUpperCase() + key.slice(1)} variant="standard" fullWidth required />
                        ) : (
                            <Select key={key} name={key} value={formData.role} onChange={handleChange} fullWidth displayEmpty variant="standard">
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        )
                    ))}

                    <div className="flex justify-center mt-8">
                        <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting}>
                            {isSubmitting ? <CircularProgress size={24} color="inherit" className="mr-2" /> : "Register"}
                        </Button>
                    </div>
                </form>
            </div>

            <Snackbar open={successOpen} autoHideDuration={5000} onClose={handleCloseSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSuccess} severity="success" variant="filled">
                    Registration successful!
                </Alert>
            </Snackbar>
        </div>
    );
}