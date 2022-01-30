import React from "react";
import { useFormik } from 'formik'
import { useNavigate, useParams } from "react-router-dom";
import AnimatedTextInput from "../AnimatedTextInput/AnimatedTextInput";

import login from '../../assets/login.svg';
import "./RestaurantForm.css";

const RestaurantForm = () => {

    const params = useParams();
    let navigate = useNavigate(); 
    const validate = values => {
        const errors = {};
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 10) {
            errors.password = '< 10 characters';
        }
      
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
    });

    const isLogin = params.action === "login";

    return (
        <div className="restaurantForm">
            <div className="restaurant-form-container">
                
                <img className="restaurant-form-image" src={login} alt="Chef" />

                <div className="restaurant-form">
                    <div className="restaurant-form-title">{
                        isLogin ? "Login" : "Sign Up!"
                    }</div>
                    <div className="restaurant-form-subtitle">Welcome to the world of Snarki</div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="restaurant-form-input">
                            <AnimatedTextInput
                                required
                                id="email"
                                name="email"
                                label="Email"
                                formikInstance = {formik}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>
                        <div className="restaurant-form-input">
                            <AnimatedTextInput
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                formikInstance = {formik}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        <div className="restaurant-form-options">
                            <div>
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formik.values.rememberMe}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                            <span>Forgot Password</span>
                        </div>

                        <button type="submit" className="restaurant-form-submit">{
                            isLogin ? "Login" : "Sign Up"
                        }</button>
                    </form>

                    <div className="login-message">
                        {
                            isLogin ? (
                                <>
                                    Don't have an account?
                                    <span onClick={() => {
                                        navigate('/snarki/register');
                                    }}> Sign Up</span>
                                </>
                            ) : (
                                <>
                                    Already have an account?
                                    <span onClick={() => {
                                        navigate('/snarki/login');
                                    }}> Login</span>
                                </>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>  
    );

};

export default RestaurantForm;
