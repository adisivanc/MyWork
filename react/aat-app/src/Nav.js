import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <>
            <nav class="navbar navbar-expand-sm">
                <div class="container-fluid">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/landing">
                                <a class="nav-link text-white">Home</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/todolist">
                                <a class="nav-link text-white">TodoList</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/services">
                                <a class="nav-link text-white">Services</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/about">
                                <a class="nav-link text-white">About US</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/contact">
                                <a class="nav-link text-white">Contact Us</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav;