import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <ul className="navbar-nav d-flex gap-x-5">
                        <li className="nav-item">
                            <Link to="/landing" className="text-white">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/todolist" className="text-white">TodoList</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="text-white">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/aboutus" className="text-white">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contactus" className="text-white">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav;