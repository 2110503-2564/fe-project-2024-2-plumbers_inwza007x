"use client";

// import { useDispatch, useSelector } from "react-redux";
// import { addBooking } from "@/redux/features/bookSlice";
// import { selectUserID } from "@/redux/features/bookSlice";
// import { selectToken } from "@/redux/features/userSlice";
import { TextField, Select, MenuItem, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { useState } from "react";
import createMeBooking from "@/libs/createMeBooking";
import { useSession } from "next-auth/react";

export default function DentistBookingPage() {
    const { data: session, status } = useSession();
    const [nameLastname, setNameLastname] = useState("");
    const [dentistID, setDentistID] = useState(0);
    const [bookDate, setBookDate] = useState(new Date());

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!session?.user?.token) {
            setErrorOpen(true);
            setIsSubmitting(false);
            return;
        }

        const newBooking = { dentistID, bookDate };
        try {
            await createMeBooking(newBooking, session.user.token);

            setNameLastname("");
            setDentistID(0);
            setBookDate(new Date());
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
                        <TextField fullWidth variant="standard" label="Name-Lastname" required value={nameLastname} onChange={(e) => setNameLastname(e.target.value)} />
                    </div>

                    <div className="w-full">
                        <Select variant="standard" required value={dentistID} onChange={(e) => setDentistID(Number(e.target.value))} displayEmpty>
                            <MenuItem value="" disabled>Select a Dentist</MenuItem>
                            <MenuItem value="1">Dr. Karu Sudsuay</MenuItem>
                            <MenuItem value="2">Dr. Poru Yraii</MenuItem>
                            <MenuItem value="3">Dr. Opal Zaza</MenuItem>
                            <MenuItem value="4">Dr. Fluke Ka5567</MenuItem>
                            <MenuItem value="5">Dr. Kkang 456</MenuItem>
                        </Select>
                    </div>

                    <div className="w-full">
                        <DateReserve value={bookDate} onChange={setBookDate} />
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <CircularProgress size={24} color="inherit" className="mr-2" />
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
        </div>
    );
}