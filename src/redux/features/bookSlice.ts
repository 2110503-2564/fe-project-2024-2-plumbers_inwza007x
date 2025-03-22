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
            const bookDateObj = bookDate instanceof Date ? bookDate : new Date(bookDate);
            
            const existingBookingIndex = state.bookItems.findIndex((item) => {
                    const itemDateObj = item.bookDate instanceof Date ? 
                        item.bookDate : new Date(item.bookDate);
                    
                    return item.dentistID === dentistID && itemDateObj.getTime() === bookDateObj.getTime();
                }
            );

            if (existingBookingIndex !== -1) {
                state.bookItems[existingBookingIndex] = { 
                    ...state.bookItems[existingBookingIndex], 
                    userID 
                };
            } else {
                state.bookItems.push({ 
                    ...action.payload, 
                    bookDate: bookDateObj,
                    userID 
                });
            }
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            const { dentistID, bookDate } = action.payload;
            const bookDateObj = bookDate instanceof Date ? bookDate : new Date(bookDate);
            
            state.bookItems = state.bookItems.filter(item => {
                const itemDateObj = item.bookDate instanceof Date ? item.bookDate : new Date(item.bookDate);
                
                return item.dentistID !== dentistID || itemDateObj.getTime() !== bookDateObj.getTime();
            });
        },
    },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
export const selectUserID = (state: RootState) => state.user?.user?.userID;