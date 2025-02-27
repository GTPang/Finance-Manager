import React from 'react'

function Footer() {
    return (
        <footer className="footer pt-3  ">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 offset-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <a
                                    href="https://www.creative-tim.com"
                                    className="nav-link text-muted"
                                    target="_blank"
                                >
                                    Creative Tim
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="https://www.creative-tim.com/presentation"
                                    className="nav-link text-muted"
                                    target="_blank"
                                >
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="https://www.creative-tim.com/blog"
                                    className="nav-link text-muted"
                                    target="_blank"
                                >
                                    Blog
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="https://www.creative-tim.com/license"
                                    className="nav-link pe-0 text-muted"
                                    target="_blank"
                                >
                                    License
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer