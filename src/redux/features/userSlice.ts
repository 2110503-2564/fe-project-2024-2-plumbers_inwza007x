import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserItem } from "@/libs/interfaces";

type UserState = {
    userID: UserItem | null;
};

const initialState: UserState = {
    userID: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserID: (state, action: PayloadAction<UserItem>) => {
            state.userID = action.payload;
        },
        clearUserID: (state) => {
            state.userID = null;
        },
    },
});

export const { setUserID, clearUserID } = userSlice.actions;
export default userSlice.reducer;
