import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/img/3592579.jpg"

const Login = ({isLoggedIn,setIsLoggedIn}) => {
    return (
        <section className="d-flex justify-center align-items-center vh-100">
            <div className="col-lg-3 rounded overflow-hidden">
            <form className="py-10 px-4 bg-gray-300">
                <div className="text-center">
                    <img src={logo} alt="Logo" style={{maxHeight:"72px"}} className="mt-2 mb-4 mx-auto" />
                </div>
                <div>
                    <input type="text" placeholder="Username" className="form-control mb-4" />
                </div>
                <div>
                    <input type="password" placeholder="Password" className="form-control mb-4" />
                </div>
                <div className="d-flex justify-content-between">
                    <span className="">
                        <Link to="/">Forgot?</Link>
                    </span>
                    <span className="">
                        <Link to="/landing"><button className="btn btn-primary" onClick={()=>setIsLoggedIn(!isLoggedIn)}>Login</button></Link>
                    </span>
                </div>
            </form>
            </div>
        </section>
    )
}

export default Login;