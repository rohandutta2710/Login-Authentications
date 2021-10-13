import { React, useContext } from "react";
import { context } from "./ContextManager";
import Navbar from "./Navbar";
function NewUser() {
    document.title="Create Account";
    const usingContext = useContext(context);
    const today = new Date();
    let todayDate;
    if ((today.getMonth() + 1) <= 9 && today.getDate() <= 9) {
        todayDate = `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`;
    }
    else if ((today.getMonth() + 1) <= 9) {
        todayDate = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`;
    }
    else if (today.getDate() <= 9) {
        todayDate = `${today.getFullYear()}-${today.getMonth() + 1}-0${today.getDate()}`;
    }
    else {
        todayDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }

    const handleNewUser = (e) => {
        usingContext.setNewUserData({ ...usingContext.newUserData, [e.target.name]: e.target.value });
    }
    const handleNewUserSubmit = (e) => {
        if (usingContext.newUserData.password !== usingContext.newUserData.confirmPassword) {
            e.preventDefault();
            alert("Password mismatched.")
        }
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="form-container">
                <div className="newUserFormDiv">
                    <form className="newUserForm" action="https://loginauthentications.herokuapp.com/newuser" method="post" onSubmit={handleNewUserSubmit}>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <input type="text" minLength="3" maxLength="20" className="form-control" placeholder="First name" name="firstName" onChange={handleNewUser} required />
                            </div>
                            <div className="col-6 mb-3">
                                <input type="text" minLength="3" maxLength="20" className="form-control" placeholder="Last name" name="lastName" onChange={handleNewUser} required />
                            </div>
                        </div>
                        <div className="input-group flex-nowrap mb-3">
                            <span className="input-group-text" id="addon-wrapping">+91</span>
                            <input type="tel" className="form-control" minLength="10" maxLength="10" placeholder="Phone number" name="phoneno" onChange={handleNewUser} aria-label="phoneno" aria-describedby="addon-wrapping" required />
                        </div>

                        <div className="form-floating mb-3">
                            <input type="date" className="form-control" id="floatingInput" name="DOB" min="1960-01-01" max={todayDate} onChange={handleNewUser} required></input>
                            <label htmlFor="floatingInput">Date of Birth</label>
                        </div>

                        <div className="form-floating mb-3">
                            <select className="form-select" id="floatingSelect" name="gender" aria-label="Floating label select example" onChange={handleNewUser} required>
                                <option value="" selected>Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                            <label htmlFor="floatingSelect">Gender</label>
                        </div>

                        <input type="email" placeholder="Username" className="form-control mb-3" name="id" onChange={handleNewUser} required></input>

                        <div className="row mb-3">
                            <div className="col-6">
                            <div className="password-icon specific-icon">
                                <input type={usingContext.passwordToggle.types} onCopy={(e) => { e.preventDefault() }} onCut={(e) => { e.preventDefault() }} onPaste={(e) => { e.preventDefault() }} minLength="5" maxLength="20" className="form-control" autoComplete="off" placeholder="Password" name="password" onChange={handleNewUser} required></input>
                                <i className={usingContext.passwordToggle.icons} onClick={usingContext.togglePassword}></i>
                            </div>
                            </div>
                            <div className="col-6">
                                <input type="password" onCopy={(e) => { e.preventDefault() }} onCut={(e) => { e.preventDefault() }} onPaste={(e) => { e.preventDefault() }} minLength="5" maxLength="20" className="form-control" placeholder="Confirm password" name="confirmPassword" onChange={handleNewUser} required></input>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success" >Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default NewUser;
