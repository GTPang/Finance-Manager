import React from 'react'
import { useDispatch } from 'react-redux';
import { getCategories } from '../../Globals/globalFunctions';
import { useParams } from 'react-router-dom';
import { allCategories } from '../../Redux/categorySlice';

export function CategoryDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const fetchAllCategories = async () => {
        const data = await getCategories(id);
        if (data.status === 200) {
            dispatch(allCategories({ categories: data.details }))
        }
    }

    return { fetchAllCategories };
}