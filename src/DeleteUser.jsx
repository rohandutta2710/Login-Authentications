import { React, useContext } from 'react';
import Navbar from './Navbar';
import { context } from './ContextManager';
function DeleteUser() {
    document.title = "Delete Account";
    const usingContext = useContext(context);
    const DeleteAccount = (e) => {
        usingContext.setDeleteData({ ...usingContext.deleteData, [e.target.name]: e.target.value })
    }

    const handleDeleteSubmit = (e) => {
        if (usingContext.deleteData.password !== usingContext.deleteData.confirmpassword) {
            usingContext.setBorderDeleteData({ emailBorder: null, phoneBorder: null, password: "red", confirmPassword: "red" })
            alert("Password mismatched.");
            e.preventDefault();
        }
        else {
            let data = usingContext.mainData.find((val) => {
                return (val.id.toLowerCase() === usingContext.deleteData.id.toLowerCase() && val.password[val.password.length - 1] === usingContext.deleteData.password && val.phoneno === usingContext.deleteData.phoneno);
            });
            if (data === undefined) {
                alert("Invalid Credential.");
                usingContext.setBorderDeleteData({ emailBorder: "red", phoneBorder: "red", password: "red", confirmPassword: "red" })
                e.preventDefault();
            }
            else if (data.password[data.password.length - 1] !== usingContext.deleteData.password) {
                alert("Password mismatched.");
                usingContext.setBorderDeleteData({ emailBorder: null, phoneBorder: null, password: "red", confirmPassword: "red" })
                e.preventDefault();
            }
        }
    }
    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-inner-container">
                    <form onSubmit={handleDeleteSubmit} action='http://localhost:4000/deleteuser/' method="post">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name="id" placeholder="Enter your username" onChange={DeleteAccount} style={{ borderColor: usingContext.borderDeleteData.emailBorder }} required />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="tel" className="form-control" minLength="10" maxLength="10" name="phoneno" placeholder="Enter your phone number" onChange={DeleteAccount} style={{ borderColor: usingContext.borderDeleteData.phoneBorder }} required />
                            <label htmlFor="floatingInput">Phone Number</label>
                        </div>
                        <div className="form-floating mb-3 password-icon password-icon-pages">
                            <input type={usingContext.passwordToggle.types} onCopy={(e) => { e.preventDefault() }} onCut={(e) => { e.preventDefault() }} onPaste={(e) => { e.preventDefault() }} className="form-control" minLength="5" maxLength="20" autoComplete="off" name="password" placeholder="Enter your password" onChange={DeleteAccount} style={{ borderColor: usingContext.borderDeleteData.password }} required />
                            <i className={usingContext.passwordToggle.icons} onClick={usingContext.togglePassword}></i>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" onCopy={(e) => { e.preventDefault() }} onCut={(e) => { e.preventDefault() }} onPaste={(e) => { e.preventDefault() }} minLength="5" maxLength="20" name="confirmpassword" placeholder="Confirm your Password" onChange={DeleteAccount} style={{ borderColor: usingContext.borderDeleteData.confirmPassword }} required />
                            <label htmlFor="floatingPassword">Confirm Password</label>
                        </div>
                        <button type="submit" className="btn btn-danger" style={{ width: "100%" }}>Delete</button>
                    </form>
                </div>
            </div>
        </>
    );
};
export default DeleteUser;