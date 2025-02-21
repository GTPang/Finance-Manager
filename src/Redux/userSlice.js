import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userid: "",
    username: "",
    password: "",
    token: "",
    transactions: []
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
        userTransac: (state, action) => {
            state.transactions = action.payload.transactions
        },
        userBudget: (state, action) => {
            state.budgets = action.payload.budgets;
        },
        userBudgetAlert: (state, action) => {
            state.budgetAlert = action.payload.budgetAlert
        },
        logout: (state) => {
            return initialState;
        }
    },
});

export const { userDetails, userTransac, userBudget, userBudgetAlert, logout } = userSlice.actions;
export default userSlice.reducer;