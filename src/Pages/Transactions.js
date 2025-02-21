import React, { useEffect, useState } from 'react'
import Footer from './Components/Footer'
import NavBar from './Components/NavBar'
import SideNav from './Components/SideNav'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTransaction, getTransactions } from '../Globals/globalFunctions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CategoryDetails } from './Hooks/CategoryDetails'
import { toast } from 'react-toastify'
import { ToastConfig } from '../Globals/globalMetaData'
import { userTransac } from '../Redux/userSlice'

function Transactions() {
    const { fetchAllCategories } = CategoryDetails();
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
        type: "",
        startDate: "",
        endDate: ""
    });
    const { id } = useParams();
    const categoryList = useSelector((state) => state.category.categories)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAllTransactions = async () => {
        const data = await getTransactions(id);
        if (data.status === 200) {
            setInitialData(data.transactions);
            try {
                dispatch(userTransac({ transactions: data.transactions }));
            } catch (err) {
                console.log(err)
            }
        } else {
            toast.error(data.error, ToastConfig)
            console.log(data.error);

        }
    }

    const filterTransactions = (initialData, { type, category, startDate, endDate }) => {
        return initialData.filter(data => {
            if (category && data.category_id !== parseInt(category)) return false;
            if (type && data.type !== type) return false;

            const dataDate = new Date(data.date);
            const dataDateUTC = new Date(dataDate.getUTCFullYear(), dataDate.getUTCMonth(), dataDate.getUTCDate());
            if (startDate) {
                const startUTC = new Date(new Date(startDate).getUTCFullYear(), new Date(startDate).getUTCMonth(), new Date(startDate).getUTCDate());
                if (dataDateUTC < startUTC) return false;
            }

            if (endDate) {
                const endUTC = new Date(new Date(endDate).getUTCFullYear(), new Date(endDate).getUTCMonth(), new Date(endDate).getUTCDate());
                if (dataDateUTC > endUTC) return false;
            }

            return true;
        })
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value  // Update the specific filter field
        }));
    };

    const handleDeleteTransaction = async (id, accountId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
        if (confirmDelete) {
            const response = await deleteTransaction(id, accountId);
            if (response.status === 200) {
                toast.success(response.message, ToastConfig);
                fetchAllTransactions();
            }
        }
    }

    useEffect(() => {
        fetchAllTransactions();
        fetchAllCategories();
    }, [])

    useEffect(() => {
        const filteredExpenses = filterTransactions(initialData, filters);
        setFilteredTransactions(filteredExpenses)
    }, [initialData, filters])

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
                            <div className="card mb-4">
                                <div className="card-header pb-0">
                                    <div className='d-flex justify-content-between'>
                                        <div className='row'>
                                            <div className='col-auto'><h6>All Transactions table</h6></div>
                                            <div className='col-auto'>
                                                <Link className="btn btn-primary btn-sm ms-auto" to="/transaction-add">Create</Link>
                                            </div>
                                        </div>
                                        <div className='row gx-3'>
                                            <div className="col-auto">
                                                <div className="form-group is-filled">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Select Type
                                                    </label>
                                                    <select className='form-control' value={filters.type} name="type" onChange={handleFilterChange}>
                                                        <option value={'expense'}>Expense</option>
                                                        <option value={'income'}>Income</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="form-group is-filled">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Select Category
                                                    </label>
                                                    <select className='form-control' style={{ textTransform: 'capitalize' }} name="category" value={filters.category} onChange={handleFilterChange}>
                                                        <option value={""}>All</option>
                                                        {categoryList && categoryList.map((item, index) =>
                                                            (<option key={index} value={item.id}>{item.name}</option>)
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="form-group is-filled">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Select Start Date
                                                    </label>
                                                    <input className='form-control' type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="form-group is-filled">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Select End Date
                                                    </label>
                                                    <input className='form-control' type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-0 pt-0 pb-2">
                                    <div className="table-responsive p-0">
                                        <table className="table align-items-center justify-content-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Amount
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Type
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Description
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                                        Date & Time
                                                    </th>
                                                    <th />
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredTransactions.length > 0 ? filteredTransactions.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <div className="d-flex px-2">
                                                                <div>
                                                                    <img
                                                                        src="../assets/img/icons/dollar.png"
                                                                        className="avatar avatar-sm rounded-circle me-2"
                                                                        alt="spotify"
                                                                    />
                                                                </div>
                                                                <div className="my-auto">
                                                                    <h6 className="mb-0 text-sm">{item.amount}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`text-xxs badge badge-sm bg-gradient-${item.amount === "income" ? "success" : "danger"}`}>
                                                                {item.type}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="text-xs font-weight-bold">{item.description}</span>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <p className="text-sm font-weight-bold mb-0">{new Date(item.date).toLocaleDateString()} - {new Date(item.date).toLocaleTimeString()}</p>
                                                        </td>
                                                        <td className="align-middle">
                                                            <Link className="btn btn-link text-secondary mb-0" to={`/transaction-edit/${item.id}`}>
                                                                Edit
                                                            </Link>
                                                        </td>
                                                        <td className="align-middle">
                                                            <button className="btn btn-link text-secondary mb-0" onClick={() => handleDeleteTransaction(item.id, id)}>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan={99} className='text-center'>No Available Data</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
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

export default Transactions