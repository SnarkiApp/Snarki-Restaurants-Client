import React, {useState} from "react";
import { useFormik } from 'formik';
import DOMPurify from 'dompurify';
import { useLazyQuery } from '@apollo/client';
import {CONTACT_TEAM} from "./queries/contactTeam";

import "./Contact.css";

const Contact = () => {

    const [error, setErrorMessage] = useState(null);
    const [success, setSuccessMessage] = useState(null);
    const [contactTeam] = useLazyQuery(CONTACT_TEAM);

    const validate = values => {
        const errors = {};
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.comments) {
            errors.comments = 'Required';
        }
      
        return errors;
    };

    const cleanData = (value) => DOMPurify.sanitize(value);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            comments: '',
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            const cleanEmail = cleanData(values.email);
            const cleanFirstName = cleanData(values.firstName);
            const cleanLastName = cleanData(values.lastName);
            const cleanComments = cleanData(values.comments);

            const {data} = await contactTeam({
                variables: {
                    email: cleanEmail,
                    firstName: cleanFirstName,
                    lastName: cleanLastName,
                    comments: cleanComments
                }
            });

            if (data.contact.code !== 200) {
                setErrorMessage("Not able to contact support at the moment. Please try again later!");
            } else {
                setSuccessMessage("Your Query has been received. Thank you!");
            }

            resetForm();
        },
    });

    return (
        <div className="contact">
            <div className="contact-header">
                <div className="contact-header-title">Contact</div>
                <div className="contact-header-subtitle">
                    We're here to help. Contact us with any questions, comments, or concerns!
                </div>
            </div>
            <div className="contact-chat-container">
                <div className="contact-chat-title">Let's Chat</div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={formik.handleSubmit}>
                    <div className="contact-chat-form-first">
                        <div>
                            <label htmlFor="firstName" className="contact-chat-form-first-label">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="firstName"
                                className="contact-chat-form-first-input"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="contact-chat-form-first-label">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="lastName"
                                className="contact-chat-form-first-input"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="contact-chat-form-first-label">
                                Email <span className="contact-chat-form-error">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="contact-chat-form-first-input"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {
                                formik.touched.email && formik.errors.email ? (
                                    <div className="contact-chat-form-error">
                                        {formik.errors.email}
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                    
                    <div className="contact-chat-form-second">
                        <label className="contact-chat-form-first-label">
                            Comments<span className="contact-chat-form-error">* </span>
                            {
                                formik.touched.comments && formik.errors.comments ? (
                                    <span className="contact-chat-form-error">
                                        {formik.errors.comments}
                                    </span>
                                ) : null
                            }
                        </label>
                        <textarea
                            id="comments"
                            name="comments"
                            type="text"
                            className="contact-chast-form-textarea"
                            onChange={formik.handleChange}
                            value={formik.values.comments}
                            onBlur={formik.handleBlur}
                        ></textarea>
                    </div>
                
                    <button type="submit" className="chat-form-button">Submit</button>
                </form>
            </div>
        </div>  
    );

};

export default Contact;
