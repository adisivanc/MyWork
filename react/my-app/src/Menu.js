import React from "react";
import adv01 from "./assets/img/adv01.jpg";

const Menu = () => {
    return (
        <nav className="bg-pink-900 h-[calc(100vh-110px)] w-[180px]">
            <div className="flex flex-col flex-nowrap justify-between h-full">
                <div>
                    <img src={adv01} alt="poster01" /> 
                </div>
                <div>
                    <img src={adv01} alt="poster01" /> 
                </div>
                <div>
                    <img src={adv01} alt="poster01" /> 
                </div> 
            </div>
        </nav>
    )
}

export default Menu