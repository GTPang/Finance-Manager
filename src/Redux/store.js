import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import reducers here
import categoryReducer from './categorySlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer
    },
});

export default store;