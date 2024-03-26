import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const errorMsg = useRouteError();
    const {data,error}=errorMsg;

    return (
        <>
            <h3>Oops Something went wrong</h3>
            <br/>
            Hello User
            <br/>
            {data}
            <br/>
            {error.stack}
        </>
    )
}

export default ErrorPage;