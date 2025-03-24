"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookingItem, BookingsJson } from "@/libs/interfaces";
import updateBooking from "@/libs/updateBooking";
import deleteBooking from "@/libs/deleteBooking";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip } from "@mui/material";
import DateReserve from "@/components/DateReserve"; 

interface BookingsCatalogProps {
    BookingsJson: BookingsJson;
}

export default function BookingsCatalog({ BookingsJson }: BookingsCatalogProps) {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [editableBooking, setEditableBooking] = useState<BookingItem | null>(null);
    const [date, setDate] = useState<Date>(new Date()); 
    const [userID, setUserID] = useState<number | null>(null); 
    const [dentistID, setDentistID] = useState<number | null>(null);

    useEffect(() => {
        if (BookingsJson && Array.isArray(BookingsJson.data)) {
            const transformedBookings: BookingItem[] = BookingsJson.data.map((item: any) => ({
                bookingID: item.bookingid,
                userID: Number(item.userid),
                dentistID: Number(item.dentistid),
                date: new Date(item.date),
            }));
            setBookings(transformedBookings);
        }
    }, [BookingsJson]);
    
    const handleEdit = (booking: BookingItem) => {
        setEditableBooking(booking);
        setDate(new Date(booking.date));
        setUserID(booking.userID);
        setDentistID(booking.dentistID);
    };

    const handleSave = async () => {
        if (!session || !editableBooking || userID === null || dentistID === null || !date) {
            return;
        }
    
        const formData = { userID, dentistID, date, bookingID: editableBooking.bookingID };
    
        try {
            const response = await updateBooking(formData, session.user.token);
            if (response) {
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking.bookingID === editableBooking.bookingID
                            ? { ...booking, ...formData }
                            : booking
                    )
                );
                setEditableBooking(null);
            } 
            else {
                console.error("Failed to update booking");
            }
        } 
        catch (error) {
            console.error("Error updating booking:", error);
        }
    };    

    const handleCancel = () => {
        setEditableBooking(null);
    };

    const handleDelete = async (booking: BookingItem) => {
        if (!session) {
            return;
        }

        try {
            const response = await deleteBooking(booking.bookingID, session.user.token);
            if (response.success) {
                setBookings((prevBookings) =>
                    prevBookings.filter((item) => item.bookingID !== booking.bookingID)
                );
            } else {
                console.error("Failed to delete booking");
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const EditingModal = () => {
        if (!editableBooking) return null;
        
        return (
            <Box className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Box className="bg-white p-6 rounded-lg w-full max-w-md">
                    <Typography variant="h6" className="mb-4">Edit Appointment</Typography>
                    
                    <Box className="mb-4">
                        <Typography variant="subtitle2" className="mb-1">User ID</Typography>
                        <TextField fullWidth type="number" value={userID || ''} onChange={(e) => setUserID(Number(e.target.value))} />
                    </Box>
                    
                    <Box className="mb-4">
                        <Typography variant="subtitle2" className="mb-1">Dentist ID</Typography>
                        <TextField fullWidth type="number" value={dentistID || ''} onChange={(e) => setDentistID(Number(e.target.value))} />
                    </Box>
                    
                    <Box className="mb-6">
                        <Typography variant="subtitle2" className="mb-1">Date</Typography>
                        <div className="w-full">
                            <DateReserve value={date} onChange={setDate} />
                        </div>
                    </Box>
                    
                    <Box className="flex justify-end gap-2">
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 md:p-6">
            <Box className="w-full bg-white shadow-lg rounded-xl p-4 md:p-6 mb-8">
                <Typography variant="h4" className="text-blue-600 font-bold text-center mb-4">
                    Appointment Management
                </Typography>
                {bookings.length === 0 ? (
                    <Box className="p-6 bg-gray-200 rounded-lg text-center">
                        <Typography variant="body1" className="text-gray-600 font-medium">
                            No appointments scheduled
                        </Typography>
                    </Box>
                ) : (
                    <div className="overflow-x-auto">
                        <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
                            <Table className="min-w-full">
                                <TableHead className="bg-gray-200">
                                    <TableRow>
                                        <TableCell className="font-bold text-gray-700">User ID</TableCell>
                                        <TableCell className="font-bold text-gray-700">Dentist ID</TableCell>
                                        <TableCell className="font-bold text-gray-700">Date</TableCell>
                                        <TableCell className="font-bold text-gray-700">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking.bookingID} className="hover:bg-gray-100 transition-all">
                                            <TableCell>
                                                <Chip label={`User #${booking.userID}`} color="primary" variant="outlined" />
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={`Dr. #${booking.dentistID}`} color="success" variant="outlined" />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" className="text-gray-700">
                                                    {booking.date.toLocaleDateString("en-US")}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box className="flex flex-wrap gap-2">
                                                    <Button color="primary" onClick={() => handleEdit(booking)} variant="outlined" size="small">
                                                        Edit
                                                    </Button>
                                                    <Button color="error" onClick={() => handleDelete(booking)} variant="outlined" size="small">
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </Box>
            
            {editableBooking && <EditingModal />}
        </div>
    );
}
