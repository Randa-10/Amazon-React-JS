 import amzonlogo from "../../assets/download.png";
 import { useState } from "react";
 import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./login.css";
 import { NavLink } from "react-router-dom";
        
        const LoginStep2 = () => {
            const [user, setUser] = useState({
                password: "",
            });
            const [errors, setErrors] = useState({
                passwordError: "",
            });
            const [visible, setvisible] = useState(false);

            const handelChange = (eve) => {
                var regexPassword =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+.]).{8,20}$/;
                if (eve.target.name == "password") {
                    setUser({ ...user, password: eve.target.value });
                    setErrors({
                        ...errors,
                        passwordError:
                            eve.target.value.length == 0
                                ? "password is Required"
                                : regexPassword.test(eve.target.value)
                                ? ""
                                : "Your password must have at least one lower case letter ,number,upperCase,symbol",
                    }),
                        // eslint-disable-next-line no-undef
                        setPassword(eve.target.value);
                }
            };
        
            const handleSubmit = (evt) => {
                evt.preventDefault();
            };
        
            return (
                <>
                    <div className='vh-100 '>
                        <div className='mask d-flex align-items-center gradient-custom-3'>
                            <div className='container '>
                                <div className='row d-flex justify-content-center '>
                                    <a href='/'>
                                        <div className='text-center'>
                                            <img src={amzonlogo} className='rounded' />
                                        </div>
                                    </a>
                                </div>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    <div className='col-sm-6 col-md-6 col-lg-4 col-xl-4 '>
                                        <div
                                            className='card'
                                            style={{ borderRadius: " 15px" }}
                                        >
                                            <div className='card-body'>
                                                <h2>Sign in</h2>
        
                                                <form
                                                    autoComplete='off'
                                                    onSubmit={(e) => {
                                                        handleSubmit(e);
                                                    }}
                                                >
                                                    <div className='form-outline mb-3'>
                                                        <label
                                                            className='form-label'
                                                            htmlFor='form3Example3cg'
                                                        >
                                                            Password
                                                        </label>
                                                        <input
                                                    type={
                                                        visible
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    required
                                                    id='formGroupExampleInput'
                                                    className={`form-control
              ${errors.passwordError ? "border-danger shadow-none" : ""}`}
                                                    name='password'
                                                    placeholder='Please Enter password'
                                                    value={user.password}
                                                    onChange={(e) => {
                                                        handelChange(e);
                                                    }}
                                                />
                                                        <div
                                                    onClick={() =>
                                                        setvisible(!visible)
                                                    }
                                                >
                                                    {visible ? (
                                                        <FaRegEye />
                                                    ) : (
                                                        <FaRegEyeSlash />
                                                    )}
                                                    <p className='text-danger'>
                                                        {errors.passwordError}
                                                    </p>
                                                </div>
                                                    </div>
                                                    <div className='form-outline mb-2'>
                                                        <NavLink to='/'>
                                                        <input
                                                            type='submit'
                                                            id='form3Example4cdg'
                                                            className='form-control submit '
                                                            value='sign in'
                                                        /></NavLink>
                                                    </div>
                                                    <div className='form-check d-flex  mb-3 ptn'>
                                                        <p>
                                                            <a href=''>
                                                            Forgot your password?
                                                            </a>
 
                                                        </p>
                                                    </div>
                                                    <a id='lab'>
                                                        <i className='fa-solid fa-arrow-right'></i>
                                                        Need help?
                                                    </a>
                                                    <a
                                                        id='para'
                                                        style={{ display: "none" }}
                                                    >
                                                        Forgot your password?
                                                    </a>
                                                    <a
                                                        id='par2'
                                                        style={{ display: "none" }}
                                                    >
                                                        Other issues with Sign-In
                                                    </a>
                                                </form>
                                            </div>
                                        </div>         
                                        <div className='row'>
                                            <div className='foot mt-5 d-flex pt-3 col-12'>
                                                <a href='../help-page/help.html'>
                                                    {" "}
                                                    Conditions of Use{" "}
                                                </a>
                                                <a href='../help-page/help.html'>
                                                    {" "}
                                                    Privacy Notice{" "}
                                                </a>
                                                <a href='../help-page/help.html'>
                                                    {" "}
                                                    Help{" "}
                                                </a>
                                            </div>
                                        </div>
                                        <p
                                            style={{
                                                fontWeight: " lighter",
                                                fontSize: "12px",
                                            }}
                                            className='text-center mt-4'
                                        >
                                            ©1996–2023, Amazon.com, Inc. or its
                                            affiliates
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   </>
    );
}

export default LoginStep2;