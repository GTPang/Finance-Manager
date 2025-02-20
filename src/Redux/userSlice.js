import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userid: "",
    username: "",
    password: "",
    token: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userDetails: (state, action) => {
            state.userid = action.payload.userid
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        logout: (state) => {
            return initialState;
        }
    },
});

export const { userDetails, logout } = userSlice.actions;
export default userSlice.reducer;