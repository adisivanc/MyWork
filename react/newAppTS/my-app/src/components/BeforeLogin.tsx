import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BeforeLogin = () => {

    const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = () => {
        navigate("/landing");
    }

    return (
        <>
            <div className="loginForm">
            <form className="form formVer">
                <span>
                    <h4>LOGO</h4>
                </span>
                <span>
                    <label htmlFor="userName">Username</label>
                    <input type="text" id="userName" className="form-input" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                </span>
                <span>
                    <label htmlFor="userName">Password</label>
                    <input type="password" id="password" className="form-input" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </span>
                <span>
                    <button type="button" className="btn-primary" onClick={handleLogin}>LOGIN</button>
                </span>
            </form>
            </div>
        </>
    )
}

export default BeforeLogin;