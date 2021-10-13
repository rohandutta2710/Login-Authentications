import { React, useContext } from "react";
import { context } from "./ContextManager";
import Navbar from "./Navbar";
function UpdateDetails() {
    document.title = "Update Password";
    const usingContext = useContext(context);
    const updateFormData = (e) => {
        usingContext.setUpdateData({ ...usingContext.updateData, [e.target.name]: e.target.value })
    }
    const handleUpdateSubmit = (e) => {
        if (usingContext.updateData.newpassword !== usingContext.updateData.confirmpassword) {
            e.preventDefault();
            alert("Password Mismatch");
            usingContext.setBorderUpdateData({ emailBorder: null, phoneBorder: null, newPassword: "red", confirmPassword: "red" })
        }
        else {
            let data = usingContext.mainData.find((val) => {
                return val.id.toLowerCase() === usingContext.updateData.id.toLowerCase() && val.phoneno === usingContext.updateData.phoneno;
            });
            if (data === undefined) {
                alert("Invalid credentials.")
                usingContext.setBorderUpdateData({ emailBorder: "red", phoneBorder: "red", newPassword: "red", confirmPassword: "red" })
                e.preventDefault();
            }
            else {
                for (let i of data.password) {
                    if (i === usingContext.updateData.newpassword) {
                        alert("You have already used this password.")
                        e.preventDefault();
                        break;
                    }
                }
            }
        }
    }
    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-inner-container">
                    <form onSubmit={handleUpdateSubmit} action='http://localhost:4000/updatedetails' method="post">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name="id" placeholder="Username" onChange={updateFormData} style={{ borderColor: usingContext.borderUpdateData.emailBorder }} required />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="tel" className="form-control" minLength="10" maxLength="10" name="phoneno" placeholder="Enter your phone number" onChange={updateFormData} style={{ borderColor: usingContext.borderUpdateData.phoneBorder }} required />
                            <label htmlFor="floatingInput">Phone Number</label>
                        </div>
                        <div className="form-floating mb-3 password-icon password-icon-pages">
                            <input type={usingContext.passwordToggle.types} onCopy={(e) => { e.preventDefault() }} onCut={(e) => { e.preventDefault() }} onPaste={(e) => { e.preventDefault() }} className="form-control" minLength="5" maxLength="20" autoComplete="off" name="newpassword" placeholder="Enter your new password" onChange={updateFormData} style={{ borderColor: usingContext.borderUpdateData.newPassword }} required />
                            <i className={usingContext.passwordToggle.icons} onClick={usingContext.togglePassword}></i>
                            <label htmlFor="floatingPassword">New Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" onCopy={(e) => { e.preventDefault() }} onCut={(e) => { e.preventDefault() }} onPaste={(e) => { e.preventDefault() }} className="form-control" minLength="5" maxLength="20" name="confirmpassword" placeholder="Confirm Password" onChange={updateFormData} style={{ borderColor: usingContext.borderUpdateData.confirmPassword }} required />
                            <label htmlFor="floatingPassword">Confirm Password</label>
                        </div>
                        <button type="submit" className="btn btn-success" style={{ width: "100%" }}>Update</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateDetails;