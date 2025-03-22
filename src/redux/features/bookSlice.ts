import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "@/libs/interfaces";
import { RootState } from "@/redux/store"; 

type BookState = {
    bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const { dentistID, bookDate, userID } = action.payload;
            const existingBookingIndex = state.bookItems.findIndex(
                (item) => item.dentistID === dentistID && item.bookDate.getTime() === bookDate.getTime()
            );

            if (existingBookingIndex !== -1) {
                state.bookItems[existingBookingIndex] = { ...state.bookItems[existingBookingIndex], userID };
            } else {
                state.bookItems.push({ ...action.payload, userID });
            }
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            const { dentistID, bookDate } = action.payload;
            state.bookItems = state.bookItems.filter(
                (item) =>
                    item.dentistID !== dentistID || item.bookDate.getTime() !== bookDate.getTime()
            );
        },
    },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
export const selectUserID = (state: RootState) => state.user.userID;