"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { BookingItem } from "@/libs/interfaces";

export default function BookingList() {
    const bookItems = useAppSelector((state) => state.book.bookItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {bookItems.length === 0 ? (
                <div className="bg-slate-200 rounded-lg shadow-md px-6 py-4 text-center">
                    <div className="text-md text-gray-600 font-medium">No Dentist Appointment</div>
                </div>
            ) : (
                bookItems.map((bookingItem: BookingItem) => (
                    <Card
                        key={`${bookingItem.dentistID}-${bookingItem.bookDate}`}
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
                                <strong>Dentist ID:</strong> {bookingItem.dentistID}
                            </Typography>
                            <Typography variant="body1" className="mb-4 text-gray-600">
                                <strong>Date:</strong> {new Date(bookingItem.bookDate).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                        <CardActions className="justify-center">
                            <Button
                                size="large"
                                color="error"
                                onClick={() => dispatch(removeBooking(bookingItem))}
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
                ))
            )}
        </div>
    );
}
