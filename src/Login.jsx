import { React, useContext } from "react";
import { context } from "./ContextManager";
import "./index.css";
import Navbar from "./Navbar";
const Login = () => {
    document.title = "Login";
    const usingContext = useContext(context);
    const inputData = (e) => {
        usingContext.setFormData({ ...usingContext.formData, [e.target.name]: e.target.value });
    }

    const SubmittingForm = (e) => {
        let data = usingContext.formData.id !== undefined && usingContext.formData.password !== undefined ? usingContext.mainData.find((val) => {
            return val.id.toLowerCase() === usingContext.formData.id.toLowerCase();
        }) : undefined;
        if (data === undefined) {
            usingContext.setUserMailErr({ text: "Incorrect Username", border: "red" });
            usingContext.setUserPasswordErr({ text: "Incorrect password", border: "red" });
            e.preventDefault();
        }
        else if (data.password[data.password.length - 1] !== usingContext.formData.password) {
            usingContext.setUserMailErr({ text: null, border: null });
            usingContext.setUserPasswordErr({ text: "Incorrect password", border: "red" });
            e.preventDefault();
        }
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="form-container">
                <div className="form-inner-container">
                    <form onSubmit={SubmittingForm} action="https://loginauthentications.herokuapp.com/" method="post">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" name="id" aria-describedby="emailHelp" onChange={inputData} style={{ borderColor: usingContext.userMailErr.border }} />
                            <div id="emailHelp" className="form-text">{usingContext.userMailErr.text}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <div className="password-icon">
                                <input type={usingContext.passwordToggle.types} autoComplete="off" onCopy={(e) => { e.preventDefault() }} onCut={(e) => { e.preventDefault() }} onPaste={(e) => { e.preventDefault() }} maxLength="20" className="form-control" id="exampleInputPassword1" name="password" onChange={inputData} style={{ borderColor: usingContext.userPasswordErr.border }} ></input>
                                <i className={usingContext.passwordToggle.icons} onClick={usingContext.togglePassword}></i>
                            </div>
                            <div className="form-text">{usingContext.userPasswordErr.text}</div>
                        </div>
                        <button type="submit" className="btn btn-primary form-control fs-5 mb-2"><b>Log in</b></button>
                        <p className="forgotten-password mb-3"><a href="/updatedetails">Forgotton password?</a></p>
                        <button type="submit" className="btn btn-success form-control fs-5 mb-2"><b><a href="/newuser">Create Account</a></b></button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login;