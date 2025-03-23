import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserItem } from "@/libs/interfaces";
import { RootState } from "@/redux/store"; 

type UserState = {
    userID: number | null;
    token: string;
};

const initialState: UserState = {
    userID: null,
    token: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserItem>) => {
            state.userID = action.payload.userID;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.userID = null;
            state.token = "";
        },
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUserID = (state: RootState) => state.user.userID;
export const selectToken = (state: RootState) => state.user.token;
