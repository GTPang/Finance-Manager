import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import reducers here

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;