import React, {useState, useCallback} from "react";
import { useLazyQuery, useMutation } from '@apollo/client';
import {useDropzone} from 'react-dropzone';
import { useSelector } from 'react-redux';
import { TailSpin } from "react-loader-spinner";
import {POST_PRESIGNED_URLS} from "./queries/claimRestaurants";
import {ADD_CLAIM_DOCUMENTS} from "./mutation/addDocuments";

import "./ClaimRestaurant.css";

const ClaimRestaurant = () => {
    const [message, setMessage] = useState({});
    const [uploadStatus, setUploadStatus] = useState({});
    const [loading, setLoading] = useState(false);
    const [documentKeys, setDocumentKeys] = useState(new Set());
    const claimRestaurant = useSelector((state) => state.addClaimRestaurant);
    const [postPresignedUrls] = useLazyQuery(POST_PRESIGNED_URLS);
    const [addDocuments] = useMutation(ADD_CLAIM_DOCUMENTS);

    const onDrop = useCallback(async (acceptedFiles) => {
        setMessage({});
        setUploadStatus({});
        const {data} = await postPresignedUrls({
            variables: {
                category: "claim",
                count: acceptedFiles.length,
                _id: claimRestaurant.addClaimRestaurant._id
            }
        });

        if (data.postUploadUrl.code === 409) {
            setMessage({type: "failure", message: data.postUploadUrl.message});
            return;
        } else if (data.postUploadUrl.code !== 200) {
            setMessage({type: "failure", message: "Something went wrong Please try again!"});
            return;
        }

        const postUrls = data.postUploadUrl.urls;
        const promiseList = [];
        for(let index = 0; index < postUrls.length; index++) {
            const fileSizeCheck = acceptedFiles[index].size <= 5000000;
            const fileTypeCheck = acceptedFiles[index].type === "application/pdf";

            if (!fileSizeCheck) {
                setMessage({
                    type: "failure",
                    message: "Total Files Size should be <= 5MB"
                });
                return;
            }

            if (!fileTypeCheck) {
                setMessage({
                    type: "failure",
                    message: "Please upload files in pdf format"
                });
                return;
            }

        }

        setLoading(true);
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
            setDocumentKeys(prevState => new Set([
                ...prevState,
                content["fields"]["key"]
            ]));
            promiseList.push(fetch(content.url, requestOptions));
        }

        let success = true;
        const uploadResult = await Promise.all(promiseList);
        for(let index = 0; index < uploadResult.length; index++) {
            if (uploadResult[index].status !== 204) success = false;
        }

        if (success) setUploadStatus({type: "success", message: "Files Uploaded successfully!"});
        else {
            setUploadStatus({type: "failure", message: "Something went wrong! Please try again!"});
            if (documentKeys.size) setDocumentKeys(new Set());
        }
        setLoading(false);

    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const submitClaimRequest = async () => {        
        if (documentKeys.size && uploadStatus.type === "success") {
            const response = await addDocuments({
                variables: {
                    documents: [...documentKeys],
                    _id: claimRestaurant.addClaimRestaurant._id
                }
            });
            
            if (loading) setLoading(false);
            if (documentKeys.size) setDocumentKeys(new Set());
            if (response.data.addClaimDocuments.code !== 200) {
                setMessage({type: "failure", message: response.data.addClaimDocuments.message});
                return;
            }
            setMessage({type: "success", message: 'Claim Request Submitted!!'});
        }
        if (documentKeys.size) setDocumentKeys(new Set());
        if (loading) setLoading(false);
    }
    
    return (
    <div className="claim-restaurant-container">
        <div className="claim-restaurant-spacing">
            <div className="claim-restaurant-title">Restaurant Name:</div>
            <div className="claim-restaurant-value">{claimRestaurant.addClaimRestaurant.name}</div>
        </div>
        <div className="claim-restaurant-spacing">
            <div className="claim-restaurant-title">Restaurant Address:</div>
            <div className="claim-restaurant-value">
                {claimRestaurant.addClaimRestaurant.address}{", "}
                {claimRestaurant.addClaimRestaurant.city}{", "}
                {claimRestaurant.addClaimRestaurant.state}{", "}
                {claimRestaurant.addClaimRestaurant.postalCode}
            </div>
        </div>
        <div className="claim-restaurant-upload-title claim-restaurant-spacing">
            Upload Claim Documents
        </div>
        {
            Object.keys(uploadStatus).length ?
                <div className="add-restaurant-upload-message">
                    <span className={uploadStatus.type === "success" ? "message-green" : "message-red"}>{uploadStatus.message}</span>
                </div> : (
                    loading ?
                    <div className="processing-message">
                        {"Uploading... "}
                        <TailSpin ariaLabel="loading-indicator" width={30} />
                    </div> : null
                )
        }
        <div {...getRootProps()} className="upload-document-container">
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop files here ...</p> :
                <p>Drag 'n' drop / Click</p>
            }
        </div>

        <button
            type="submit"
            className="add-restaurant-submit"
            disabled={!documentKeys.size || uploadStatus.type !== "success"}
            onClick={submitClaimRequest}
        >
            Submit
        </button>

        {
            Object.keys(message).length ?
                <div className="claim-restaurant-message">
                    <span className={message.type === "success" ? "message-green" : "message-red"}>{message.message}</span>
                    {
                        message.type === "success" ? 
                            <div className="additional-message">
                                Snarki Support Team will verify the documents and 
                                will update you within 24-48 hours
                            </div>
                        : null
                    }
                </div> : null
        }
    </div>
    )
};

export default ClaimRestaurant;
