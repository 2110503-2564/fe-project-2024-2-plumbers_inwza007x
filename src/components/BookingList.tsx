"use client";

import { Card, CardContent, Typography, Button, CardActions, Select, MenuItem, CircularProgress, FormControl, InputLabel } from "@mui/material";
import { BookingItem, DentistJson, DentistItem } from "@/libs/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import getMeBooking from "@/libs/getMeBooking";
import updateMeBooking from "@/libs/updateMeBooking";
import deleteMeBooking from "@/libs/deleteMeBooking";
import getDentists from "@/libs/getDentists";
import DateReserve from "@/components/DateReserve";

export default function BookingList() {
    const { data: session, status } = useSession();
    const [booking, setBooking] = useState<BookingItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [newDentistID, setNewDentistID] = useState<number>(0);
    const [newDate, setNewDate] = useState<Date>(new Date());
    const [dentists, setDentists] = useState<DentistItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!session) {
                return;
            }

            try {
                const bookingData = await getMeBooking(session.user.token);
                const transformedBooking: BookingItem = {
                    bookingID: bookingData.data.bookingid,
                    userID: bookingData.data.userid,
                    dentistID: bookingData.data.dentistid,
                    date: new Date(bookingData.data.date),
                };
                setBooking(transformedBooking);
                setNewDentistID(transformedBooking.dentistID);
                setNewDate(transformedBooking.date);
            } 
            catch (error) {
                console.error("Error fetching booking:", error);
                setBooking(null);
            }

            try {
                const dentistsData = await getDentists(session.user.token);
                setDentists(
                    dentistsData.data.map((dentist: any) => ({
                        dentistID: dentist.dentistid,
                        name: dentist.name,
                        experience: dentist.experience,
                        expertise: dentist.expertise
                    }))
                );
            } 
            catch (error) {
                console.error("Error fetching dentists:", error);
                setDentists([]);
            }

            setLoading(false);
        };

        fetchData();
    }, [session]);

    const getDentistNameById = (id: number): string => {
        const dentist = dentists.find(d => d.dentistID === id);
        return dentist ? dentist.name : `Dentist #${id}`;
    };

    const handleUpdate = async () => {
        if (!session || !booking) {
            return;
        }

        try {
            const formData = { dentistID: newDentistID, date: newDate };

            const response = await updateMeBooking(formData, session.user.token);

            if (response) {
                setBooking({ ...booking, dentistID: newDentistID, date: formData.date });
                alert("Appointment updated successfully!");
            } 
            else {
                alert("Failed to update appointment");
            }
        } 
        catch (error) {
            console.error("Error updating booking:", error);
            alert("An error occurred while updating your appointment");
        }
    };

    const handleCancel = async () => {
        if (!session || !booking) return;

        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            try {
                await deleteMeBooking(session.user.token);

                setBooking(null);
                alert("Appointment cancelled successfully!");
            } 
            catch (error) {
                console.error("Error cancelling booking:", error);
                alert("An error occurred while cancelling your appointment");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {!booking ? (
                <div className="bg-slate-200 rounded-lg shadow-md px-6 py-4 text-center">
                    <Link href="/booking" passHref>
                        <div className="text-md text-gray-600 font-medium">No Dentist Appointment - Book One Now!</div>
                    </Link>
                </div>
            ) : (
                <Card key={`${booking.dentistID}-${booking.date}`} className="shadow-lg rounded-lg p-6 bg-white w-[450px] mb-4" sx={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", borderRadius: "16px" }}>
                    <CardContent>
                        <Typography variant="h5" component="div" className="font-semibold mb-4">
                            Dentist Appointment
                        </Typography>
                        <Typography variant="body1" className="mb-2 text-gray-600">
                            <strong>Dentist:</strong> {getDentistNameById(booking.dentistID)}
                        </Typography>
                        <Typography variant="body1" className="mb-2 text-gray-600">
                            <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                        </Typography>

                        <div className="mt-4">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="dentist-select-label">Select Dentist</InputLabel>
                                <Select labelId="dentist-select-label" id="dentist-select" value={newDentistID} onChange={(e) => setNewDentistID(Number(e.target.value))} label="Select Dentist" renderValue={(selected) => getDentistNameById(selected as number)}>
                                    {dentists.map((dentist) => (
                                        <MenuItem key={dentist.dentistID} value={dentist.dentistID}>
                                            {dentist.name} - {dentist.expertise} ({dentist.experience} years)
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mt-4">
                            <DateReserve value={newDate} onChange={setNewDate} />
                        </div>
                    </CardContent>
                    <CardActions className="flex justify-between">
                        <Button onClick={handleUpdate} variant="contained" color="primary">Reschedule</Button>
                        <Button onClick={handleCancel} variant="contained" color="error">Cancel Appointment</Button>
                    </CardActions>
                </Card>
            )}
        </div>
    );
}
