import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserItem } from "@/libs/interfaces";

type UserState = {
    user: UserItem | null;
};

const initialState: UserState = {
    user: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserItem>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
