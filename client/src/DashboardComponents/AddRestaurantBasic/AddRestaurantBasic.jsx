import React, {useState, useRef, useCallback} from "react";
import { useFormik } from 'formik';
import classNames from "classnames";
import { useDropzone } from 'react-dropzone';
import { TailSpin } from "react-loader-spinner";
import { cleanData } from "../../utils/DOMPurify";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_RESTAURANT_DATA } from "./mutation/addRestaurantDetails";
import { POST_PRESIGNED_URLS } from "../ClaimRestaurant/queries/claimRestaurants";

import "./AddRestaurantBasic.css";

const AddRestaurantBasic = () => {
    const bottomRef = useRef(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImagesLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState({});
    const [verificationMessage, setVerificationMessage] = useState({});
    const [imagesMessage, setImagesMessage] = useState({});
    const [postPresignedUrls] = useLazyQuery(POST_PRESIGNED_URLS);
    const [addRestaurantData] = useMutation(ADD_RESTAURANT_DATA);

    const documentKeys = [];
    const imageKeys = [];

    const uploadToS3 = async ({acceptedFiles, category, type}) => {
        category !== "images" ? setVerificationMessage({}) : setImagesMessage({});
        const {data} = await postPresignedUrls({
            variables: {
                category,
                count: acceptedFiles.length
            }
        });

        if (data.postUploadUrl.code === 409) {
            let error = {type: "failure", message: data.postUploadUrl.message};
            category !== "images" ? setVerificationMessage(error) : setImagesMessage(error);
            return;
        } else if (data.postUploadUrl.code !== 200) {
            let error = {type: "failure", message: "Something went wrong Please try again!"};
            category !== "images" ? setVerificationMessage(error) : setImagesMessage(error);
            return;
        }

        const postUrls = data.postUploadUrl.urls;
        const promiseList = [];

        for(let index = 0; index < postUrls.length; index++) {
            const fileSizeCheck = acceptedFiles[index].size <= 5000000;
            const fileTypeCheck = type === "image/" ?
                acceptedFiles[index].type.includes("image/")
                : acceptedFiles[index].type === type;

            if (!fileSizeCheck) {
                let error = {
                    type: "failure",
                    message: "Total Files Size should be <= 5MB"
                };
                category !== "images" ? setVerificationMessage(error) : setImagesMessage(error);
                return;
            }

            if (!fileTypeCheck) {
                let error = {
                    type: "failure",
                    message: type === "image/" ?
                        "Please upload in valid image format (jpg, png, etc.)"
                        : "Please upload valid pdf files"
                };
                category !== "images" ? setVerificationMessage(error) : setImagesMessage(error);
                return;
            }

        }

        const confirmation = window.confirm("Are you sure you want to upload these files?");
        if (confirmation) {

            for(let index = 0; index < postUrls.length; index++) {
                const content = JSON.parse(postUrls[index]);

                const formData = new FormData();
                formData.append('Content-type', acceptedFiles[index].type);
                Object.entries(content.fields).forEach(([k, v]) => {
                    formData.append(k, v);
                });
                formData.append("file", acceptedFiles[index]);
                const requestOptions = {
                    method: 'POST',
                    body: formData
                };
                promiseList.push(fetch(content.url, requestOptions));

                if (type === "image/") {
                    imageKeys.push(`${content["fields"]["key"]}`);
                } else {
                    documentKeys.push(`${content["fields"]["key"]}`);
                }
            }

            let success = true;
            type === "image/" ? setImagesLoading(true) : setLoading(true);
            const uploadResult = await Promise.all(promiseList);
            type === "image/" ? setImagesLoading(false) : setLoading(false);

            for(let index = 0; index < uploadResult.length; index++) {
                if (uploadResult[index].status !== 204) success = false;
            }

            const message = {type: "success", message: "Documents uploaded successfully."};
            const error = {type: "failure", message: "Something went wrong!"};
            if (success) {
                setUploadStatus((prevState) => ({
                    ...prevState,
                    [category]: type==="image/" ? imageKeys : documentKeys
                }));
            }

            category !== "images" ? setVerificationMessage(success ? message : error) : setImagesMessage(success ? message : error);
        }
        return;
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        await uploadToS3({
            acceptedFiles,
            category: "register",
            type: "application/pdf"
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const onImagesDrop = useCallback(async (acceptedFiles) => {
        await uploadToS3({
            acceptedFiles,
            category: "images",
            type: "image/"
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const {
        getRootProps: getImagesRootProps,
        getInputProps: getImagesInputProps,
        isDragActive: isImagesDragActive,
    } = useDropzone({onDrop: onImagesDrop, autoUpload: false});

    const validate = values => {
        const errors = {};

        const requiredFields = ["name", "address", "city", "state", "contact", "cuisines", "hours"];
        requiredFields.forEach((field) => {
            if (!values[field]) errors[field] = 'is required';
        });

        if (!/^[0-9]{1,6}$/.test(values.postalCode)) {
            errors.postalCode = 'should be 1-6 digits';
        }

        if (!/^[-]?\d+(\.\d+)?$/.test(values.latitude)) {
            errors.latitude = 'eg: 38.8951';
        }

        if (!/^[-]?\d+(\.\d+)?$/.test(values.longitude)) {
            errors.longitude = 'eg: -77.0364';
        }

        if (!/^[0-9]*$/.test(values.contact)) {
            errors.contact = 'should be digits';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            postalCode: '',
            address: '',
            city: '',
            state: '',
            contact: '',
            cuisines: '',
            hours: '',
            latitude: '',
            longitude: ''
        },
        validate,
        onSubmit: async (values) => {
            const cleanRestaurantName = cleanData(values.name);
            const cleanAddress = cleanData(values.address);
            const cleanCity = cleanData(values.city);
            const cleanState = cleanData(values.state);
            const cleanPostalCode = cleanData(values.postalCode);
            const cleanContact = cleanData(values.contact);
            const cleanCuisines = cleanData(values.cuisines);
            const cleanHours = cleanData(values.hours);
            const cleanLatitude = parseFloat(cleanData(values.latitude));
            const cleanLongitude = parseFloat(cleanData(values.longitude));

            const finalData = {
                input: {
                    cuisines: cleanCuisines,
                    name: cleanRestaurantName,
                    address: cleanAddress,
                    city: cleanCity,
                    state: cleanState,
                    postalCode: cleanPostalCode,
                    contact: cleanContact,
                    hours: cleanHours,
                    location: {
                        type: "Point",
                        coordinates: [cleanLongitude, cleanLatitude]
                    },
                    documents: uploadStatus["register"],
                    images: uploadStatus["images"]
                }
            };

            const addRestaurantResponse = await addRestaurantData({
                variables: finalData
            });

            const response = addRestaurantResponse.data.registerRestaurants;
            if (response.code === 409) {
                setMessage({type: "failure", message: response.message});
                bottomRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (response.code === 200) {
                navigate("/dashboard");
            } else {
                setMessage({type: "failure", message: "Something went wrong!"});
                bottomRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        },
    });

    return (
        <div className="add-restaurant-container">
            <span className="add-restaurant-heading">Add New Restaurant</span>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex-container">
                    <div className="add-restaurant-full-div">
                        <label htmlFor="name" className="add-restaurant-label">
                            Restaurant Name<span className="required-star">* </span>
                            {formik.touched['name'] && formik.errors.name ?
                                <span className="add-restaurant-error">{formik.errors.name}</span>
                                : null
                            }
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            className="add-restaurant-input"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </div>
                </div>

                <div className="flex-container">
                    <div className="add-restaurant-full-div">
                        <label htmlFor="address" className="add-restaurant-label">
                            Address<span className="required-star">* </span>
                            {formik.touched['address'] && formik.errors.address ?
                                <span className="add-restaurant-error">{formik.errors.address}</span>
                                : null
                            }
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />
                    </div>
                </div>

                <div className="flex-container">
                    <div className="add-restaurant-div">
                        <label htmlFor="city" className="add-restaurant-label">
                            City<span className="required-star">* </span>
                            {formik.touched['city'] && formik.errors.city ?
                                <span className="add-restaurant-error">{formik.errors.city}</span>
                                : null
                            }
                        </label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                        />
                    </div>
                    <div className="add-restaurant-div">
                        <label htmlFor="state" className="add-restaurant-label">
                            State<span className="required-star">* </span>
                            {formik.touched['state'] && formik.errors.state ?
                                <span className="add-restaurant-error">{formik.errors.state}</span>
                                : null
                            }
                        </label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.state}
                        />
                    </div>
                </div>

                <div className="flex-container">
                <div className="add-restaurant-div">
                        <label htmlFor="postalCode" className="add-restaurant-label">
                            Postal Code<span className="required-star">* </span>
                            {formik.touched['postalCode'] && formik.errors.postalCode ?
                                <span className="add-restaurant-error">{formik.errors.postalCode}</span>
                                : null
                            }
                        </label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.postalCode}
                        />
                    </div>
                    <div className="add-restaurant-div">
                        <label htmlFor="contact" className="add-restaurant-label">
                            Contact<span className="required-star">* </span>
                            {formik.touched['contact'] && formik.errors.contact ?
                                <span className="add-restaurant-error">{formik.errors.contact}</span>
                                : null
                            }
                        </label>
                        <input
                            id="contact"
                            name="contact"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.contact}
                        />
                    </div>
                </div>

                <div className="flex-container">
                    <div className="add-restaurant-div">
                        <label htmlFor="cuisines" className="add-restaurant-label">
                            Cuisines eg: Deli, Pizza<span className="required-star">* </span>
                            {formik.touched['cuisines'] && formik.errors.cuisines ?
                                <span className="add-restaurant-error">{formik.errors.cuisines}</span>
                                : null
                            }
                        </label>
                        <input
                            id="cuisines"
                            name="cuisines"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.cuisines}
                        />
                    </div>
                    <div className="add-restaurant-div">
                        <label htmlFor="hours" className="add-restaurant-label">
                            Business Hours<span className="required-star">* </span>
                            {formik.touched['hours'] && formik.errors.hours ?
                                <span className="add-restaurant-error">{formik.errors.hours}</span>
                                : null
                            }
                        </label>
                        <input
                            id="hours"
                            name="hours"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.hours}
                        />
                    </div>
                </div>

                <div className="flex-container">
                    <div className="add-restaurant-div">
                        <label htmlFor="latitude" className="add-restaurant-label">
                            Latitude<span className="required-star">* </span>
                            {formik.touched['latitude'] && formik.errors.latitude ?
                                <span className="add-restaurant-error">{formik.errors.latitude}</span>
                                : null
                            }
                        </label>
                        <input
                            id="latitude"
                            name="latitude"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.latitude}
                        />
                    </div>
                    <div className="add-restaurant-div">
                        <label htmlFor="longitude" className="add-restaurant-label">
                            Longitude<span className="required-star">* </span>
                            {formik.touched['longitude'] && formik.errors.longitude ?
                                <span className="add-restaurant-error">{formik.errors.longitude}</span>
                                : null
                            }
                        </label>
                        <input
                            id="longitude"
                            name="longitude"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            className="add-restaurant-input"
                            onChange={formik.handleChange}
                            value={formik.values.longitude}
                        />
                    </div>
                </div>

                <div className="add-restaurant-upload-title">
                    Upload Verification Documents
                    <span className="required-star">* </span>
                </div>
                {
                    Object.keys(verificationMessage).length ?
                        <div className="add-restaurant-upload-message">
                            <span className={verificationMessage.type === "success" ? "message-green" : "message-red"}>{verificationMessage.message}</span>
                        </div> : (
                            loading ?
                            <div className="processing-message">
                                {"Uploading... "}
                                <TailSpin ariaLabel="loading-indicator" width={30} />
                            </div> : null
                        )
                }
                <div {...getRootProps()}
                    className={classNames({
                        "add-restaurant-upload-document-container": true,
                        "overlay": loading
                    })}
                >
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop files here ...</p> :
                        <p>Drag 'n' drop / Click</p>
                    }
                </div>

                <div className="add-restaurant-upload-title">
                    Upload Restaurant Images<span className="required-star">* </span>
                </div>
                {
                    Object.keys(imagesMessage).length ?
                        <div className="add-restaurant-upload-message">
                            <span className={imagesMessage.type === "success" ? "message-green" : "message-red"}>{imagesMessage.message}</span>
                        </div> : (
                            imageLoading ?
                            <div className="processing-message">
                                {"Uploading... "}
                                <TailSpin ariaLabel="loading-indicator" width={30} />
                            </div> : null
                        )
                }
                <div {...getImagesRootProps()}
                    className={classNames({
                        "add-restaurant-upload-document-container": true,
                        "overlay": imageLoading
                    })}
                >
                    <input {...getImagesInputProps()} />
                    {
                        isImagesDragActive ?
                        <p>Drop files here ...</p> :
                        <p>Drag 'n' drop / Click</p>
                    }
                </div>

                <button
                    ref={bottomRef}
                    type="submit"
                    className="add-restaurant-submit"
                    disabled={
                        Object.keys(uploadStatus).length !== 2
                    }
                >{
                    "Submit"
                }</button>
            </form>

            <div className="add-restaurant-message">
                <span className={message.type === "success" ? "message-green" : "message-red"}>{message.message}</span>
                {
                    message.type === "success" ? 
                        <div className="additional-message">
                            Snarki Support Team will verify detailsimport { useNavigate } from "react-router-dom"; and 
                            will update you within 24-48 hours
                        </div>
                    : null
                }
            </div>
        </div>
    );
};

export default AddRestaurantBasic;
