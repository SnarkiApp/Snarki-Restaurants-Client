import React, {useState, useContext, useEffect} from "react";
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import AnimatedTextInput from "../../AnimatedTextInput/AnimatedTextInput";
import { UPDATE_PASSWORD } from "./mutations/updatePassword";
import { cleanData } from "../../../utils/DOMPurify";
import login from '../../../assets/login.svg';
import { UserContext } from "../../../providers/User/UserProvider";
import "./PostForgotPassword.css";

const PostForgotPassword = () => {
    const params = useParams();
    let navigate = useNavigate();
    const [error, setErrorMessage] = useState(null);
    const [success, setSuccessMessage] = useState(null);
    const [updatePassword] = useMutation(UPDATE_PASSWORD);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            return navigate("/");
        }
    }, [user]);

    const validate = values => {
        const errors = {};
      
        if (!values.newPassword) {
            errors.newPassword = 'Required';
        } else if (values.newPassword.length < 10) {
            errors.newPassword = '< 10 characters';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
        } else if (values.confirmPassword.length < 10) {
            errors.confirmPassword = '< 10 characters';
        }
      
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: async (values) => {
            setErrorMessage(null);
            setSuccessMessage(null);

            const cleanNewPassword = cleanData(values.newPassword);
            const cleanConfirmPassword = cleanData(values.confirmPassword);

            if (!params.token) {
                setSuccessMessage(null);
                setErrorMessage("This Page Link has Expired.");
                return;
            }

            if (cleanNewPassword !== cleanConfirmPassword) {
                setSuccessMessage(null);
                setErrorMessage("passwords do not match");
                return;
            }

            const {data} = await updatePassword({
                variables: {
                    token: params.token,
                    password: cleanNewPassword
                }
            });

            if (data.resetPassword.code !== 200) {
                setSuccessMessage(null);
                setErrorMessage(data.resetPassword.message);
            } else {
                setErrorMessage(null);
                setSuccessMessage("Password updated successfully.");
            }
        },
    });

    return (
        <div className="container">
            <div className="post-forgot-password-container">
                
                <img className="post-forgot-password-image" src={login} alt="Chef" />

                <div className="post-forgot-password">
                    <div className="post-forgot-password-title">Reset Password</div>
                    <div className="post-forgot-password-subtitle">
                        Make sure both the passwords match
                        {error && <div className="error-message"> {error}</div>}
                        {success && <div className="success-message"> {success}</div>}
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="post-forgot-password-input">
                            <AnimatedTextInput
                                required
                                id="newPassword"
                                name="newPassword"
                                label="New Password"
                                type="password"
                                formikInstance = {formik}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                            />
                        </div>
                        <div className="post-forgot-password-input">
                            <AnimatedTextInput
                                required
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                formikInstance = {formik}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                        </div>

                        <button type="submit" className="post-forgot-password-submit">Submit</button>
                    </form>

                    <div className="login-message">
                        {
                            <>
                                Try Logging again?
                                <span onClick={() => {
                                    setErrorMessage(null);
                                    navigate('/snarki/login');
                                }}> Login</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>  
    );

};

export default PostForgotPassword;
