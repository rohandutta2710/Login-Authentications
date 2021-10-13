// createContext is used to manage all the states of an application
import React, { createContext, useState } from "react";
import APIFetching from "./APIFetching";
const context = createContext();
const ContextManager = (props) => {
    //fetching api
    const [, mainData,] = APIFetching("http://localhost:4000/login");

    // used in Login page
    const [formData, setFormData] = useState({});
    const [userMailErr, setUserMailErr] = useState({ text: null, border: null });
    const [userPasswordErr, setUserPasswordErr] = useState({ text: null, border: null });
    const [passwordToggle, setPasswordToggle] = useState({ types: "password", icons: "far fa-eye-slash" });

    // used in NewUser Page
    const [newUserData, setNewUserData] = useState({});

    // used in updatedetails page
    const [updateData, setUpdateData] = useState({});
    const [borderUpdateData, setBorderUpdateData] = useState({ emailBorder: null, phoneBorder: null, newPassword: null, confirmPassword: null });

    //deleteuser page
    const [deleteData, setDeleteData] = useState({});
    const [borderDeleteData, setBorderDeleteData] = useState({ emailBorder: null, phoneBorder: null, password: null, confirmPassword: null });
    // password visibility toggling
    const togglePassword = () => {
        if (passwordToggle.types === "password") {
            setPasswordToggle({ types: "text", icons: "far fa-eye" });
        }
        else {
            setPasswordToggle({ types: "password", icons: "far fa-eye-slash" });
        }
    }
    return (
        <>
            <context.Provider value={{ mainData, togglePassword, formData, setFormData, userMailErr, setUserMailErr, userPasswordErr, setUserPasswordErr, passwordToggle, setPasswordToggle, newUserData, setNewUserData, updateData, setUpdateData, borderUpdateData, setBorderUpdateData, deleteData, setDeleteData, borderDeleteData, setBorderDeleteData }}>
                {props.children}
            </context.Provider>
        </>
    );
}
export default ContextManager;
export { context };