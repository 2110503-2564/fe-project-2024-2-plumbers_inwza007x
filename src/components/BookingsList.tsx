"use client";

import { Card, CardContent, Typography, Button, CardActions, LinearProgress, Box, Link } from "@mui/material";
import { BookingItem, BookingsJson } from "@/libs/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";
import BookingsCatalog from "./BookingsCatalog";

export default function BookingsList() {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState<BookingsJson | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            getBookings(session.user.token)
                .then((data) => {
                    setBookings(data);
                })
                .catch(() => setBookings(null))
                .finally(() => setLoading(false));
        }
    }, [session]);

    if (!session) {
        return <h1>Error naka 😢</h1>
    }

    if (loading) {
        return <LinearProgress />;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            { bookings ? (
                <BookingsCatalog BookingsJson={bookings}/>
            ) : (
                <h2> No Booking available. Karu is still the cutest though 🥰.</h2>
            )}
        </div>
    );
}
