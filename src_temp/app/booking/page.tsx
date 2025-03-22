"use client";

// import {getServerSession} from "next-auth";
import {useDispatch} from "react-redux";
import {addBooking} from "@/redux/features/bookSlice";
import DateReserve from "@/components/DateReserve";
import {TextField, Select, MenuItem, Button, CircularProgress, Snackbar, Alert} from "@mui/material"
// import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
// import getUserProfile from "@/libs/getUserProfile";
// import getVenues from "@/libs/getVenues";
import {useState} from "react";

export default function BookingPage() {
    // const session = await getServerSession(authOptions);

    // if (!session || !session.user.token) {
    //     return null;
    // }

    // const userData = await getUserProfile(session.user.token);
    // const userProfile = userData.data;

    // const venues = await getVenues();

    const dispatch = useDispatch();

    const [nameLastname, setNameLastname] = useState("");
    const [tel, setTel] = useState("");
    const [venue, setVenue] = useState("");
    const [bookDate, setBookDate] = useState("");

    const [successOpen, setSuccessOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
    
        setTimeout(() => {
            const newBooking = {nameLastname, tel, venue, bookDate};
            dispatch(addBooking(newBooking));
            
            setNameLastname("");
            setTel("");
            setVenue("");
            setBookDate("");
            
            setSuccessOpen(true);
            setIsSubmitting(false);
        }, 800); 
    };

    const handleCloseSuccess = () => {
        setSuccessOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Venue Booking</h1>

                {/* {userProfile && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>
                        <div className="text-l text-gray-600">
                            <p><strong>Name:</strong> {userProfile.name}</p>
                            <p><strong>Email:</strong> {userProfile.email}</p>
                            <p><strong>Tel.:</strong> {userProfile.tel}</p>
                            <p><strong>Member Since:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                )} */}

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div className="w-full">
                        <TextField fullWidth variant="standard" name="Name-Lastname" label="Name-Lastname" required value={nameLastname} onChange={(e) => setNameLastname(e.target.value)} className="w-full" />
                    </div>

                    <div className="w-full">
                        <TextField fullWidth variant="standard" name="Contact-Number" label="Contact-Number" required value={tel} onChange={(e) => setTel(e.target.value)} className="w-full" />
                    </div>

                    {/* <div className="w-full">
                        <Select variant="standard" name="venue" id="venue" label="Venue" required className="w-full" defaultValue="">
                            <MenuItem value="" disabled>Select a venue</MenuItem>
                            {venues.data.map((venue) => (
                                <MenuItem key={venue.id} value={venue.name}>
                                    {venue.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div> */}

                    <div className="w-full">
                        <Select variant="standard" name="venue" id="venue" label="Venue" required value={venue} onChange={(e) => setVenue(e.target.value)} className="w-full" defaultValue="">
                            <MenuItem value="" disabled>Select a venue</MenuItem>
                            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                            <MenuItem value="Spark">Spark Space</MenuItem>
                            <MenuItem value="GrandTable">The Grand Table</MenuItem>
                        </Select>
                    </div>

                    <div className="w-full">
                        <DateReserve value={bookDate} onChange={(e) => setBookDate(e)} />
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button type="submit" variant="contained" color="primary" size="large" name="Book Venue" disabled={isSubmitting} sx={{textTransform: 'none'}} className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <CircularProgress size={24} color="inherit" className="mr-2" />
                                Processing...
                            </div>
                        ) : (
                            'Book Venue'
                        )}
                        </Button>
                    </div>
                </form>
            </div>

            <Snackbar open={successOpen} autoHideDuration={5000} onClose={handleCloseSuccess} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleCloseSuccess} severity="success" variant="filled" sx={{width: '100%'}}>
                    Booking successfully submitted!
                </Alert>
            </Snackbar>
        </div>
    );
}