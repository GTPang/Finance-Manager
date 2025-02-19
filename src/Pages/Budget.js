import React from 'react'
import Footer from './Components/Footer'
import NavBar from './Components/NavBar'
import SideNav from './Components/SideNav'


function Budget() {
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
                                    <h6>Budget table</h6>
                                </div>
                                <div className="card-body px-0 pt-0 pb-2">
                                    <div className="table-responsive p-0">
                                        <table className="table align-items-center justify-content-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Project
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Budget
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Status
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                                        Completion
                                                    </th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2">
                                                            <div>
                                                                <img
                                                                    src="../assets/img/small-logos/logo-spotify.svg"
                                                                    className="avatar avatar-sm rounded-circle me-2"
                                                                    alt="spotify"
                                                                />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">Spotify</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm font-weight-bold mb-0">$2,500</p>
                                                    </td>
                                                    <td>
                                                        <span className="text-xs font-weight-bold">
                                                            working
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
                                                            <i className="fa fa-ellipsis-v text-xs" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2">
                                                            <div>
                                                                <img
                                                                    src="../assets/img/small-logos/logo-invision.svg"
                                                                    className="avatar avatar-sm rounded-circle me-2"
                                                                    alt="invision"
                                                                />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">Invision</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm font-weight-bold mb-0">$5,000</p>
                                                    </td>
                                                    <td>
                                                        <span className="text-xs font-weight-bold">done</span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <span className="me-2 text-xs font-weight-bold">
                                                                100%
                                                            </span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div
                                                                        className="progress-bar bg-gradient-success"
                                                                        role="progressbar"
                                                                        aria-valuenow={100}
                                                                        aria-valuemin={0}
                                                                        aria-valuemax={100}
                                                                        style={{ width: "100%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <button
                                                            className="btn btn-link text-secondary mb-0"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fa fa-ellipsis-v text-xs" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2">
                                                            <div>
                                                                <img
                                                                    src="../assets/img/small-logos/logo-jira.svg"
                                                                    className="avatar avatar-sm rounded-circle me-2"
                                                                    alt="jira"
                                                                />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">Jira</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm font-weight-bold mb-0">$3,400</p>
                                                    </td>
                                                    <td>
                                                        <span className="text-xs font-weight-bold">
                                                            canceled
                                                        </span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <span className="me-2 text-xs font-weight-bold">
                                                                30%
                                                            </span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div
                                                                        className="progress-bar bg-gradient-danger"
                                                                        role="progressbar"
                                                                        aria-valuenow={30}
                                                                        aria-valuemin={0}
                                                                        aria-valuemax={30}
                                                                        style={{ width: "30%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <button
                                                            className="btn btn-link text-secondary mb-0"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fa fa-ellipsis-v text-xs" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2">
                                                            <div>
                                                                <img
                                                                    src="../assets/img/small-logos/logo-slack.svg"
                                                                    className="avatar avatar-sm rounded-circle me-2"
                                                                    alt="slack"
                                                                />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">Slack</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm font-weight-bold mb-0">$1,000</p>
                                                    </td>
                                                    <td>
                                                        <span className="text-xs font-weight-bold">
                                                            canceled
                                                        </span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <span className="me-2 text-xs font-weight-bold">
                                                                0%
                                                            </span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div
                                                                        className="progress-bar bg-gradient-success"
                                                                        role="progressbar"
                                                                        aria-valuenow={0}
                                                                        aria-valuemin={0}
                                                                        aria-valuemax={0}
                                                                        style={{ width: "0%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <button
                                                            className="btn btn-link text-secondary mb-0"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fa fa-ellipsis-v text-xs" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2">
                                                            <div>
                                                                <img
                                                                    src="../assets/img/small-logos/logo-webdev.svg"
                                                                    className="avatar avatar-sm rounded-circle me-2"
                                                                    alt="webdev"
                                                                />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">Webdev</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm font-weight-bold mb-0">$14,000</p>
                                                    </td>
                                                    <td>
                                                        <span className="text-xs font-weight-bold">
                                                            working
                                                        </span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <span className="me-2 text-xs font-weight-bold">
                                                                80%
                                                            </span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div
                                                                        className="progress-bar bg-gradient-info"
                                                                        role="progressbar"
                                                                        aria-valuenow={80}
                                                                        aria-valuemin={0}
                                                                        aria-valuemax={80}
                                                                        style={{ width: "80%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <button
                                                            className="btn btn-link text-secondary mb-0"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fa fa-ellipsis-v text-xs" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2">
                                                            <div>
                                                                <img
                                                                    src="../assets/img/small-logos/logo-xd.svg"
                                                                    className="avatar avatar-sm rounded-circle me-2"
                                                                    alt="xd"
                                                                />
                                                            </div>
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">Adobe XD</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm font-weight-bold mb-0">$2,300</p>
                                                    </td>
                                                    <td>
                                                        <span className="text-xs font-weight-bold">done</span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <span className="me-2 text-xs font-weight-bold">
                                                                100%
                                                            </span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div
                                                                        className="progress-bar bg-gradient-success"
                                                                        role="progressbar"
                                                                        aria-valuenow={100}
                                                                        aria-valuemin={0}
                                                                        aria-valuemax={100}
                                                                        style={{ width: "100%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <button
                                                            className="btn btn-link text-secondary mb-0"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fa fa-ellipsis-v text-xs" />
                                                        </button>
                                                    </td>
                                                </tr>
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