"use client";

import { useState } from "react";
import Link from "next/link";
import { BookingItem, BookingsJson } from "@/libs/interfaces";
import { 
    Button, 
    TextField, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Paper,
    Typography,
    Box,
    Chip
} from "@mui/material";

interface BookingsCatalogProps {
    BookingsJson: BookingsJson;
}

export default function BookingsCatalog({ BookingsJson }: BookingsCatalogProps) {
    const [bookItems, setBookItems] = useState<BookingItem[]>(BookingsJson.data);
    const [editableBooking, setEditableBooking] = useState<BookingItem | null>(null);
    const [editedDate, setEditedDate] = useState<string>(""); 
    const [editedUserID, setEditedUserID] = useState<string>(""); 
    const [editedDentistID, setEditedDentistID] = useState<string>(""); 

    const handleEdit = (bookingItem: BookingItem) => {
        setEditableBooking(bookingItem);
        setEditedDate(new Date(bookingItem.date).toISOString().split("T")[0]);
        setEditedUserID(String(bookingItem.userID));
        setEditedDentistID(String(bookingItem.dentistID));
    };

    const handleSave = () => {
        if (editableBooking) {
            const updatedBooking = {
                ...editableBooking,
                userID: parseInt(editedUserID),
                dentistID: parseInt(editedDentistID),
                bookDate: new Date(editedDate),
            };
            setBookItems((prevItems) =>
                prevItems.map((item) =>
                    item.dentistID === updatedBooking.dentistID ? updatedBooking : item
                )
            );
            setEditableBooking(null);
        }
    };

    const handleCancel = () => {
        setEditableBooking(null);
    };

    const handleDelete = (bookingItem: BookingItem) => {
        setBookItems((prevItems) =>
            prevItems.filter((item) => item.dentistID !== bookingItem.dentistID)
        );
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-slate-50 p-4">
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', marginBottom: '40px' }}>
                <Link href="/admin/bookings"><Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3b82f6', cursor: 'pointer', '&:hover': { color: '#2563eb' } }}>Booking System</Typography></Link>
                <Typography variant="h5" sx={{ fontWeight: 'medium', color: '#475569' }}>Appointment Management</Typography>
            </Box>

            <Paper elevation={3} sx={{ width: '90%', maxWidth: '900px', padding: '24px', borderRadius: '12px', backgroundColor: 'white' }}>
                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '24px', fontWeight: 'bold', color: '#1e293b' }}>Appointments List</Typography>

                {bookItems.length === 0 ? (
                    <Box sx={{ padding: '40px', textAlign: 'center', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                        <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 'medium' }}>No appointments scheduled</Typography>
                    </Box>
                ) : (
                    <TableContainer sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ backgroundColor: '#f1f5f9' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>User ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Dentist ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Appointment Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookItems.map((bookingItem) => (
                                    <TableRow key={`${bookingItem.dentistID}-${bookingItem.date}`} sx={{ '&:hover': { backgroundColor: '#f8fafc' }, transition: 'background-color 0.2s' }}>
                                        <TableCell>
                                            {editableBooking === bookingItem ? (
                                                <TextField label="User ID" value={editedUserID} onChange={(e) => setEditedUserID(e.target.value)} fullWidth variant="outlined" size="small" />
                                            ) : (
                                                <Chip label={`User #${bookingItem.userID}`} color="primary" variant="outlined" size="small" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableBooking === bookingItem ? (
                                                <TextField label="Dentist ID" value={editedDentistID} onChange={(e) => setEditedDentistID(e.target.value)} fullWidth variant="outlined" size="small" />
                                            ) : (
                                                <Chip label={`Dr. #${bookingItem.dentistID}`} color="success" variant="outlined" size="small" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableBooking === bookingItem ? (
                                                <TextField label="Date" type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} fullWidth variant="outlined" size="small" />
                                            ) : (
                                                <Typography variant="body2" sx={{ color: '#334155' }}>{new Date(bookingItem.date).toLocaleDateString('en-US')}</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableBooking === bookingItem ? (
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Button color="success" onClick={handleSave} variant="contained" size="small">Save</Button>
                                                    <Button color="inherit" onClick={handleCancel} variant="outlined" size="small">Cancel</Button>
                                                </Box>
                                            ) : (
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Button color="primary" onClick={() => handleEdit(bookingItem)} variant="outlined" size="small">Edit</Button>
                                                    <Button color="error" onClick={() => handleDelete(bookingItem)} variant="outlined" size="small">Cancel</Button>
                                                </Box>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </div>
    );
}
