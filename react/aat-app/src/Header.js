import React from "react";
import logo from "./assets/img/3592579.jpg";
import Nav from "./Nav"

const Header = () => {
    return (
        <header className="bg-primary p-3">
            <div className="container d-flex">
                <div className="me-auto">
                    <img src={logo} alt="Landing Logo" style={{maxHeight:"42px"}} />
                </div>
                <div>
                    <Nav/>
                </div>
            </div>
        </header>
    )
}

export default Header;