import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function SideNav() {
    const user = useSelector((state) => state.user);
    return (
        <aside
            className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
            id="sidenav-main"
        >
            <div className="sidenav-header">
                <i
                    className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                    aria-hidden="true"
                    id="iconSidenav"
                />
                <a
                    className="navbar-brand m-0"
                    href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html "
                    target="_blank"
                >
                    <img
                        src="/Assets/img/logo-ct-dark.png"
                        width="26px"
                        height="26px"
                        className="navbar-brand-img h-100"
                        alt="main_logo"
                    />
                    <span className="ms-1 font-weight-bold">Welcome, {user.username}</span>
                </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div
                className="collapse navbar-collapse  w-auto "
                id="sidenav-collapse-main"
            >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-tv-2 text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link " to={`/transactions/${user.userid}`}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-calendar-grid-58 text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Transactions</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link " to="/billing">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-credit-card text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Billing</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link " to={`/budget/${user.userid}`}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-app text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Budget</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                            Account pages
                        </h6>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="../pages/profile.html">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-single-02 text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Profile</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link " to="/sign-in">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-single-copy-04 text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Sign In</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link " to="/sign-up">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-collection text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Sign Up</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideNav