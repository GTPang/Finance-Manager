import React, { useEffect, useState } from 'react'
import SideNav from './Components/SideNav'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { useSelector } from 'react-redux'
import { CategoryDetails } from './Hooks/CategoryDetails'
import { type } from '@testing-library/user-event/dist/type'
import { createTransaction, updateTransaction } from '../Globals/globalFunctions'
import { toast } from 'react-toastify'
import { ToastConfig } from '../Globals/globalMetaData'
import { useNavigate, useParams } from 'react-router-dom'

function TransactionSetup({ pageType }) {
    const { fetchBudgetAlert } = CategoryDetails();
    const categoryList = useSelector((state) => state.category.categories);
    const accountId = useSelector((state) => state.user.userid);
    const storedTransactions = useSelector((state) => state.user.transactions);
    const [transacDetails, setTransacDetails] = useState({
        account_id: accountId,
        amount: "",
        type: "",
        category_id: "",
        description: "",
        date: "",
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

    const createNewTransaction = async () => {
        if (!transacDetails.amount) {
            toast.error('Amount is required', ToastConfig);
            return
        }
        if (!transacDetails.type) {
            toast.error('Type is required', ToastConfig);
            return
        }
        if (!transacDetails.category_id) {
            toast.error('Category is required', ToastConfig);
            return
        }
        try {
            const response = await createTransaction(transacDetails.account_id, transacDetails.amount, transacDetails.type, transacDetails.category_id, transacDetails.description, transacDetails.date);
            if (response.status === 200) {
                toast.success('Transaction Created Successfully!', ToastConfig);
                fetchBudgetAlert();
                navigate(`/transactions/${accountId}`)
            } else {
                toast.error('Transaction Creation Failed', ToastConfig);
            }
        } catch (err) {
            toast.error(err, ToastConfig);
        }
    }


    const editExistingTransaction = async () => {
        try {
            const response = await updateTransaction(id, transacDetails.account_id, transacDetails.amount, transacDetails.type, transacDetails.category_id, transacDetails.description, transacDetails.date);
            if (response.status === 200) {
                toast.success('Transaction Updated Successfully!', ToastConfig);
                navigate(`/transactions/${accountId}`)
            } else {
                toast.error('Transaction Updation Failed', ToastConfig);
            }
        }
        catch (err) {
            toast.error(err, ToastConfig);
        }
    }

    useEffect(() => {
        if (storedTransactions && id) {
            setTransacDetails(storedTransactions.find((transaction) => parseInt(transaction.id) === parseInt(id)));
        }
        console.log(storedTransactions.find((transaction) => parseInt(transaction.id) === parseInt(id)));
        console.log(id);
    }, [storedTransactions])


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
                                            <p className="mb-0">{pageType} Transaction</p>
                                        </div>
                                        <div>
                                            <button className="btn btn-dark btn-sm ms-auto" onClick={() => navigate(-1)}>Back</button>
                                            <button className="btn btn-primary btn-sm ms-3" onClick={pageType === "Add" ? createNewTransaction : editExistingTransaction}>Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="text-uppercase text-sm">Transaction Information</p>
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
                                                    Type
                                                </label>
                                                <select className='form-control' name="type" value={transacDetails?.type} onChange={handleInputData}>
                                                    <option value={""}>Select Option</option>
                                                    <option value={'expense'}>Expense</option>
                                                    <option value={'income'}>Income</option>
                                                </select>
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
                                                    Date
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="datetime-local"
                                                    name='date'
                                                    value={transacDetails?.date}
                                                    onChange={handleInputData}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">
                                                    Description
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name='description'
                                                    value={transacDetails?.description}
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

export default TransactionSetup