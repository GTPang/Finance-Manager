import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        allCategories: (state, action) => {
            state.categories = action.payload.categories;
        }
    }
})

export const { allCategories } = categorySlice.actions;
export default categorySlice.reducer;