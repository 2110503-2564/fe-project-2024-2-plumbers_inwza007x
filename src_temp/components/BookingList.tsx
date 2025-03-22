"use client";

import {AppDispatch, useAppSelector} from "@/redux/store";
import {useDispatch} from "react-redux";
import {removeBooking} from "@/redux/features/bookSlice";
import {Card, CardContent, Typography, Button, CardActions} from "@mui/material";
import {BookingItem} from "@/libs/interfaces";

export default function BookingList() {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="space-y-4 p-4">
            {bookItems.length === 0 ? (
                <div className="bg-slate-200 rounded px-5 py-2 text-center">
                    <div className="text-md">No Venue Booking</div>
                </div>
            ) : (
                bookItems.map((bookingItem: BookingItem) => (
                    <Card key={`${bookingItem.nameLastname}-${bookingItem.bookDate}`} className="shadow-lg rounded-lg p-4 transition-transform transform">
                        <CardContent>
                            <Typography variant="h6" component="div" className="font-semibold">
                                {bookingItem.nameLastname}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Contact: {bookingItem.tel}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Venue: {
                                    bookingItem.venue === "Bloom" ? "The Bloom Pavilion" :
                                    bookingItem.venue === "Spark" ? "Spark Space" :
                                    bookingItem.venue === "GrandTable" ? "The Grand Table" :
                                    bookingItem.venue
                                }
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Date: {bookingItem.bookDate}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="error" onClick={() => dispatch(removeBooking(bookingItem))} variant="contained" sx={{borderRadius: "20px"}}>
                                Cancel Booking
                            </Button>
                        </CardActions>
                    </Card>
                ))
            )}
        </div>
    );
}
