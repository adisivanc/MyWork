import React from "react";
import { useNavigate } from "react-router-dom";

const BeforeLogin = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/landing");
    }

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>LOGIN</button>
        </>
    )
}

export default BeforeLogin;