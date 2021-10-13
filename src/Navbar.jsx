import React from 'react'

export default function Navbar() {
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">RDX Attires</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/newuser">Sign Up</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/updatedetails">Update Password</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/deleteuser">Delete Account</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
