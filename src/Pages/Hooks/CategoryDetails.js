import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetAlert, getCategories } from '../../Globals/globalFunctions';
import { useParams } from 'react-router-dom';
import { allCategories } from '../../Redux/categorySlice';
import { toast } from 'react-toastify';
import { ToastConfig } from '../../Globals/globalMetaData';
import { userBudget } from '../../Redux/userSlice';

export function CategoryDetails() {
    const dispatch = useDispatch();
    const userid = useSelector((state) => state.user.userid);
    const category = useSelector((state) => state.category.categories)
    const fetchAllCategories = async () => {
        if (category.length === 0) {
            const data = await getCategories(userid);
            if (data.status === 200) {
                dispatch(allCategories({ categories: data.details }))
            } else {
                toast.error(data.error, ToastConfig);
            }
        }
    }

    const fetchBudgetAlert = async () => {
        const data = await getBudgetAlert(userid);
        if (data.status === 200) {
            dispatch(userBudget({ budgetAlert: data.budgetAlert }));
            for (let eachBudget of data.budgets) {
                if (eachBudget.status !== 'Within Budget') {
                    toast.error(`You are about to exceed budget for ${eachBudget.category_name}!`, ToastConfig);
                }
            }
        }
    }

    return { fetchAllCategories, fetchBudgetAlert };
}