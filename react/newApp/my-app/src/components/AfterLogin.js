import React from "react";
import { useState, useEffect } from "react";

const AfterLogin = () => {


    const [count, setCount] = useState(0);

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
        }, 1000);

        return () => clearTimeout(timer)
    },[]);

    return (
        <>
            <h3>I've rendered {count} times!</h3>;
        </>
    )
}

export default AfterLogin;

