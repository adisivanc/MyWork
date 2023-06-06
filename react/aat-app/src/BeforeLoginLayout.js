import React from "react";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

const BeforeLoginLayout = ({isLoggedIn,setIsLoggedIn}) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            </Routes>
        </>
    )
}

export default BeforeLoginLayout;