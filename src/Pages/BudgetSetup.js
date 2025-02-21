import React, { useEffect, useState } from 'react'
import SideNav from './Components/SideNav'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { useSelector } from 'react-redux'
import { CategoryDetails } from './Hooks/CategoryDetails'
import { type } from '@testing-library/user-event/dist/type'
import { createBudget, updateBudget } from '../Globals/globalFunctions'
import { toast } from 'react-toastify'
import { ToastConfig } from '../Globals/globalMetaData'
import { useNavigate, useParams } from 'react-router-dom'

function BudgetSetup({ pageType }) {
    const categoryList = useSelector((state) => state.category.categories);
    const accountId = useSelector((state) => state.user.userid);
    const storedBudgets = useSelector((state) => state.user.budgets);
    const [transacDetails, setTransacDetails] = useState({
        account_id: accountId,
        amount: "",
        category_id: "",
        date_start: "",
        date_end: "",
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setTransacDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
    }

    const createNewBudget = async () => {
        if (!transacDetails.amount) {
            toast.error('Amount is required', ToastConfig);
            return
        }
        if (!transacDetails.category_id) {
            toast.error('Category is required', ToastConfig);
            return
        }
        if (!transacDetails.date_start) {
            toast.error('Date Start is required', ToastConfig);
            return
        }
        if (!transacDetails.date_end) {
            toast.error('Date End is required', ToastConfig);
            return
        }
        try {
            const response = await createBudget(transacDetails.account_id, transacDetails.category_id, transacDetails.amount, transacDetails.date_start, transacDetails.date_end);
            if (response.status === 200) {
                toast.success('Budget Created Successfully!', ToastConfig);
                navigate(`/budget/${accountId}`)
            } else {
                toast.error('Budget Creation Failed', ToastConfig);
            }
        } catch (err) {
            toast.error(err, ToastConfig);
        }
    }


    const editExistingBudget = async () => {
        try {
            const response = await updateBudget(id, transacDetails.account_id, transacDetails.category_id, transacDetails.amount, transacDetails.date_start, transacDetails.date_end);
            if (response.status === 200) {
                toast.success('Budget Updated Successfully!', ToastConfig);
                navigate(`/budget/${accountId}`)
            } else {
                toast.error('Budget Updation Failed', ToastConfig);
            }
        }
        catch (err) {
            toast.error(err, ToastConfig);
        }
    }

    useEffect(() => {
        if (storedBudgets && id) {
            setTransacDetails(storedBudgets.find((budget) => parseInt(budget.id) === parseInt(id)));
        }
        console.log(storedBudgets.find((budget) => parseInt(budget.id) === parseInt(id)));
        console.log(id);
    }, [storedBudgets])


    return (
        <>
            <div className="min-height-300 bg-dark position-absolute w-100" />
            <SideNav />
            <main className="main-content position-relative border-radius-lg ">
                {/* Navbar */}
                <NavBar />
                {/* End Navbar */}
                <div className="container-fluid py-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header pb-0">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="mb-0">{pageType} Budget</p>
                                        </div>
                                        <div>
                                            <button className="btn btn-dark btn-sm ms-auto" onClick={() => navigate(-1)}>Back</button>
                                            <button className="btn btn-primary btn-sm ms-3" onClick={pageType === "Add" ? createNewBudget : editExistingBudget}>Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="text-uppercase text-sm">Budget Information</p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">
                                                    Amount
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="amount"
                                                    value={transacDetails?.amount}
                                                    onChange={handleInputData}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">
                                                    Category
                                                </label>
                                                <select className='form-control' style={{ textTransform: 'capitalize' }} name="category_id" value={transacDetails?.category_id} onChange={handleInputData}>
                                                    <option value={""}>Select Option</option>
                                                    {categoryList && categoryList.map((item, index) =>
                                                        (<option key={index} value={item.id}>{item.name}</option>)
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">
                                                    Date Start
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    name='date_start'
                                                    value={transacDetails?.date}
                                                    onChange={handleInputData}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">
                                                    Date End
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    name='date_end'
                                                    value={transacDetails?.date}
                                                    onChange={handleInputData}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="horizontal dark" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer />
                </div>
            </main>
        </>
    )
}

export default BudgetSetup