"use client";

import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { BookingItem, BookingJson } from "@/libs/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getMeBooking from "@/libs/getMeBooking";

export default function BookingList() {
    const { data: session, status } = useSession();
    const [booking, setBooking] = useState<BookingItem | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch the user's booking on load
    useEffect(() => {
        if (session) {
            getMeBooking(session.user.token)
                .then((data) => {
                    const transformedBooking: BookingItem = {
                        bookingID: data.data.bookingid, 
                        userID: data.data.userid,
                        dentistID: data.data.dentistid,
                        date: new Date(data.data.date)
                    };

                    setBooking(transformedBooking);
                })
                .catch(() => setBooking(null))
                .finally(() => setLoading(false));

            console.log("nig", booking);
        }
    }, [session]);



    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {!booking ? (
                <div className="bg-slate-200 rounded-lg shadow-md px-6 py-4 text-center">
                    <div className="text-md text-gray-600 font-medium">No Dentist Appointment</div>
                </div>
            ) : (
                <Card
                    key={`${booking.dentistID}-${booking.date}`}
                    className="shadow-lg rounded-lg p-6 bg-white w-[450px] mb-4"
                    sx={{
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                        borderRadius: "16px",
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="div" className="font-semibold mb-4">
                            Dentist Appointment
                        </Typography>
                        <Typography variant="body1" className="mb-2 text-gray-600">
                            <strong>Dentist ID:</strong> {booking.dentistID}
                        </Typography>
                        <Typography variant="body1" className="mb-4 text-gray-600">
                            <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                        </Typography>
                    </CardContent>
                    <CardActions className="justify-center">
                        <Button
                            size="large"
                            color="error"
                            // onClick={handleCancel}
                            variant="contained"
                            sx={{
                                borderRadius: "20px",
                                padding: "10px 20px",
                                fontWeight: "bold",
                                textTransform: "none",
                            }}
                        >
                            Cancel Appointment
                        </Button>
                    </CardActions>
                </Card>
            )}
        </div>
    );
}