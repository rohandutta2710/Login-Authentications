import {React,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";
function MainFile() {
    useEffect(() => {
        return document.title = "Login Authentication";
    }, [])
    return (
        <>
            <Login />
        </>
    );
}
export default MainFile;