"use client";

import { TextField, Select, MenuItem, Button, CircularProgress, Snackbar, Alert, FormControl, InputLabel } from "@mui/material";
import { DentistItem } from "@/libs/interfaces";
import DateReserve from "@/components/DateReserve";
import { useState, useEffect } from "react";
import createMeBooking from "@/libs/createMeBooking";
import getMeBooking from "@/libs/getMeBooking";
import { useSession } from "next-auth/react";
import getDentists from "@/libs/getDentists";

interface DentistBookingPageProps {
    params: {
        bookingID: number;
    };
}

export default function DentistBookingPage({ params }: DentistBookingPageProps) {
    const { data: session, status } = useSession();
    const [dentists, setDentists] = useState<DentistItem[]>([]);
    const [dentistID, setDentistID] = useState<number>(0);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [bookingErrorOpen, setBookingErrorOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (session?.user?.token) {
                setLoading(true);
                try {
                    const data = await getDentists(session.user.token);
                    const fetchedDentists = data.data.map((dentist: any) => ({
                        dentistID: dentist.dentistid,
                        name: dentist.name,
                        expertise: dentist.expertise,
                        experience: dentist.experience
                    }));
                    setDentists(fetchedDentists);

                    try {
                        const booking = await getMeBooking(session.user.token);
                        if (booking) {
                            setBookingErrorOpen(true);
                        }
                    } 
                    catch {
                        setBookingErrorOpen(false);
                    }

                    if (params.bookingID) {
                        const bookingIdNumber = Number(params.bookingID);
                        const dentistExists = fetchedDentists.some(
                            (dentist: any) => dentist.dentistID === bookingIdNumber
                        );
                        if (dentistExists) {
                            setDentistID(bookingIdNumber);
                            console.log(`Auto-selected dentist with ID: ${bookingIdNumber}`);
                        } 
                        else {
                            console.log(`Dentist with ID ${bookingIdNumber} not found`);
                        }
                    }
                } 
                catch (error) {
                    console.error("Failed to load dentists:", error);
                    setDentists([]);
                } 
                finally {
                    setLoading(false);
                }
            } 
            else {
                setLoading(false);
            }
        };

        fetchData();
    }, [session]);

    const getDentistNameById = (id: number): string => {
        if (id === 0) {
            return "Select a Dentist";
        }
        const dentist = dentists.find(d => d.dentistID === id);
        return dentist ? dentist.name : `Dentist #${id}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!session?.user?.token) {
            setErrorOpen(true);
            setIsSubmitting(false);
            return;
        }

        if (dentistID === 0) {
            setErrorOpen(true);
            setIsSubmitting(false);
            return;
        }

        if (bookingErrorOpen) {
            setIsSubmitting(false);
            return;
        }

        const newBooking = { dentistID, date };
        try {
            await createMeBooking(newBooking, session.user.token);
            
            setDentistID(0);
            setDate(new Date());
            setSuccessOpen(true);
        } 
        catch (error) {
            setErrorOpen(true);
        } 
        finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseSuccess = () => setSuccessOpen(false);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Dentist Appointment Booking</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="dentist-select-label">Select a Dentist</InputLabel>
                            <Select labelId="dentist-select-label" id="dentist-select" value={dentistID} onChange={(e) => setDentistID(Number(e.target.value))} label="Select a Dentist" renderValue={(selected) => getDentistNameById(selected as number)} required>
                                <MenuItem value={0} disabled>Select a Dentist</MenuItem>
                                {loading ? (
                                    <MenuItem disabled>Loading dentists...</MenuItem>
                                ) : (
                                    dentists.map((dentist) => (
                                        <MenuItem key={dentist.dentistID} value={dentist.dentistID}>
                                            {dentist.name} - {dentist.expertise} ({dentist.experience} years)
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="w-full">
                        <DateReserve value={date} onChange={setDate} />
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting || dentistID === 0 || bookingErrorOpen}>
                            {isSubmitting ? (
                                <>
                                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                                    Processing...
                                </>
                            ) : (
                                'Book Appointment'
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            <Snackbar open={successOpen} autoHideDuration={5000} onClose={handleCloseSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSuccess} severity="success" variant="filled">
                    Appointment successfully booked!
                </Alert>
            </Snackbar>

            <Snackbar open={errorOpen} autoHideDuration={5000} onClose={() => setErrorOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setErrorOpen(false)} severity="error" variant="filled">
                    There was an error booking your appointment.
                </Alert>
            </Snackbar>

            <Snackbar open={bookingErrorOpen} autoHideDuration={20000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="warning" variant="filled">
                    You already have a booking and cannot make another one at this time.
                </Alert>
            </Snackbar>
        </div>
    );
}