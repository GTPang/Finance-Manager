import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastConfig } from '../Globals/globalMetaData';
import { userDetails } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { login } from '../Globals/auth';

function Login() {
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!userName || !passWord) {
            toast.error('Username OR Password Missing!', ToastConfig);
        } else {
            try {
                const data = await login(userName, passWord);
                if (data.status === 200) {
                    dispatch(userDetails({ userid: data.user_details.id, username: data.user_details.username, token: data.token }))
                    sessionStorage.setItem('token', data.token);
                    navigate('/dashboard');
                }
            } catch (err) {
                toast.error(err, ToastConfig);
            }
        }
    }

    return (
        <>
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                                    <div className="card card-plain">
                                        <div className="card-header pb-0 text-start">
                                            <h4 className="font-weight-bolder">Sign In</h4>
                                            <p className="mb-0">Enter your email and password to sign in</p>
                                        </div>
                                        <div className="card-body">
                                            <form role="form">
                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        placeholder="Email"
                                                        aria-label="Email"
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        placeholder="Password"
                                                        aria-label="Password"
                                                        value={passWord}
                                                        onChange={(e) => setPassWord(e.target.value)}
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0"
                                                        onClick={handleSignIn}
                                                    >
                                                        Sign in
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                            <p className="mb-4 text-sm mx-auto">
                                                Don't have an account?
                                                <Link
                                                    to="/sign-up"
                                                    className="text-primary text-gradient font-weight-bold"
                                                >
                                                    Sign up
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                    <div
                                        className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                                        style={{
                                            backgroundImage:
                                                'url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg")',
                                            backgroundSize: "cover"
                                        }}
                                    >
                                        <span className="mask bg-gradient-primary opacity-6" />
                                        <h4 className="mt-5 text-white font-weight-bolder position-relative">
                                            "Attention is the new currency"
                                        </h4>
                                        <p className="text-white position-relative">
                                            The more effortless the writing looks, the more effort the
                                            writer actually put into the process.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login