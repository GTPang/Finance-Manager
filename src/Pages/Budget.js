import React, { useEffect, useState } from 'react'
import Footer from './Components/Footer'
import NavBar from './Components/NavBar'
import SideNav from './Components/SideNav'
import { CategoryDetails } from './Hooks/CategoryDetails'
import { useParams } from 'react-router-dom'
import { getBudgets } from '../Globals/globalFunctions'
import { useSelector } from 'react-redux'


function Budget() {
    const { fetchAllCategories } = CategoryDetails();
    const { id } = useParams();
    const [budgetArr, setBudgetArr] = useState([]);
    const [filteredBudgetArr, setFilteredBudgetArr] = useState([]);
    const categoryList = useSelector((state) => state.category.categories);
    const [filters, setFilters] = useState({
        category: "",
        startDate: "",
        endDate: ""
    })

    const fetchAllBudgets = async () => {
        const data = await getBudgets(id);
        if (data.status === 200) {
            setBudgetArr(data.budgets);
        }
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }))
    }

    const filterData = (initialData, { category, startDate, endDate }) => {
        return initialData.filter(data => {
            if (category && data.category_id !== parseInt(category)) return false;

            const dataStartDate = new Date(data.date_start);
            const dataEndDate = new Date(data.date_end);
            if (startDate) {
                const startUTC = new Date(new Date(startDate).getUTCFullYear(), new Date(startDate).getUTCMonth(), new Date(startDate).getUTCDate());
                if (dataStartDate < startUTC) return false;
            }

            if (endDate) {
                const endUTC = new Date(new Date(endDate).getUTCFullYear(), new Date(endDate).getUTCMonth(), new Date(endDate).getUTCDate());
                if (dataEndDate > endUTC) return false;
            }

            return true;
        })
    }

    useEffect(() => {
        fetchAllBudgets();
        fetchAllCategories();
    }, [])

    useEffect(() => {
        const filteredBudget = filterData(budgetArr, filters);
        setFilteredBudgetArr(filteredBudget)
    }, [budgetArr, filters])

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
                                        <div><h6>Budget table</h6></div>
                                        <div className='row gx-3'>
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
                                                        Category
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Budget
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Date Range
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                                        Available
                                                    </th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredBudgetArr.length > 0 ? filteredBudgetArr.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <h6 className="mb-0 text-sm ps-3" style={{ textTransform: 'capitalize' }}>{item.category_name}</h6>
                                                        </td>
                                                        <td>
                                                            <p className="text-sm font-weight-bold mb-0">${item.amount}</p>
                                                        </td>
                                                        <td>
                                                            <span className="text-xs font-weight-bold">
                                                                {new Date(item.date_start).toLocaleDateString()} - {new Date(item.date_end).toLocaleDateString()}
                                                            </span>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <span className="me-2 text-xs font-weight-bold">
                                                                    60%
                                                                </span>
                                                                <div>
                                                                    <div className="progress">
                                                                        <div
                                                                            className="progress-bar bg-gradient-info"
                                                                            role="progressbar"
                                                                            aria-valuenow={60}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                            style={{ width: "60%" }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <button className="btn btn-link text-secondary mb-0">
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )) : ""}
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

export default Budget