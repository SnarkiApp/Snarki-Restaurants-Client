import React, {useState} from "react";
import { useFormik } from 'formik'
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import AnimatedTextInput from "../../AnimatedTextInput/AnimatedTextInput";
import { RESET_PASSWORD_LINK } from "./queries/resetPassword";
import { cleanData } from "../../../utils/DOMPurify";
import login from '../../../assets/login.svg';
import "./PreForgotPassword.css";

const PreForgotPassword = () => {
    let navigate = useNavigate();
    const [error, setErrorMessage] = useState(null);
    const [success, setSuccessMessage] = useState(null);
    const [sendResetPasswordLink] = useLazyQuery(RESET_PASSWORD_LINK);

    const validate = values => {
        const errors = {};
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
      
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate,
        onSubmit: async (values) => {
            setErrorMessage(null);
            setSuccessMessage(null);

            const cleanEmail = cleanData(values.email);

            const {data} = await sendResetPasswordLink({
                variables: {
                    email: cleanEmail
                }
            });

            if (data.sendPasswordResetLink.code !== 200) {
                setSuccessMessage("");
                setErrorMessage(data.sendPasswordResetLink.message);
            } else {
                setErrorMessage(null);
                setSuccessMessage("Password Reset Link sent successfully.");
            }
        },
    });

    return (
        <div className="container">
            <div className="forgot-password-container">
                
                <img className="forgot-password-image" src={login} alt="Chef" />

                <div className="forgot-password">
                    <div className="forgot-password-title">
                        Forgot Password
                    </div>
                    <div className="forgot-password-subtitle">
                        We will send you password reset link to this email.
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="forgot-password-input">
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

                        <button type="submit" className="forgot-password-submit">
                            Submit
                        </button>
                    </form>

                    <div className="register-message">
                        {
                            <>
                                Don't have an account?
                                <span onClick={() => {
                                    setErrorMessage(null);
                                    navigate('/snarki/register');
                                }}> Sign Up</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>  
    );

};

export default PreForgotPassword;
