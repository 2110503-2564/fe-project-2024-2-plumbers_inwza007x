import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserItem } from "@/libs/interfaces";
import { RootState } from "@/redux/store"; 

type UserState = {
    user: UserItem | null;
    token: string;
};

const initialState: UserState = {
    user: null,
    token: ""
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
export const selectToken = (state: RootState) => state.user?.token;