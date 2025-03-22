/**
 * This TypeScript code defines a Redux slice for managing booking items with actions to add and remove
 * bookings.
 * @property {BookingItem[]} bookItems - `bookItems` is an array of `BookingItem` objects. Each
 * `BookingItem` object represents a booking with properties `nameLastname`, `tel`, `venue`, and
 * `bookDate`.
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BookingItem} from "@/libs/interfaces";

type BookState = {
    bookItems: BookingItem[];
};

const initialState: BookState = {bookItems: []};

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const {nameLastname, venue, bookDate} = action.payload;

            const existingBookingIndex = state.bookItems.findIndex(
                (item) => item.venue === venue && item.bookDate === bookDate
            );

            if (existingBookingIndex !== -1) {
                state.bookItems[existingBookingIndex] = action.payload;
            } 
            else {
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookItems = state.bookItems.filter((item) =>
                item.nameLastname !== action.payload.nameLastname ||
                item.tel !== action.payload.tel ||
                item.venue !== action.payload.venue ||
                item.bookDate !== action.payload.bookDate
            );
        },
    },
});

export const {addBooking, removeBooking} = bookSlice.actions;
export default bookSlice.reducer;
