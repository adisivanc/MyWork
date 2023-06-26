import React from "react";
import { Link } from "react-router-dom";

const AfterLogin = () => {


    return (
        <>
            <h3>I've rendered count times!</h3>;
            <Link to="/todolist">Todolist</Link>
        </>
    )
}

export default AfterLogin;

