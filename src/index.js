import React from "react";
import ReactDOM from "react-dom";
import ContexManager from "./ContextManager.jsx";
// import MainFile from "./MainFile.jsx";
import Routing from "./Routing.jsx";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(<BrowserRouter>
    <ContexManager>
        <Routing></Routing>
    </ContexManager>
</BrowserRouter>, document.getElementById("root"));
