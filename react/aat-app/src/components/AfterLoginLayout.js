import React from "react";
import Landing from "./../view/Landing";
import Footer from "./../view/Footer";
import Header from "./../view/Header";
import Services from "./../view/Services";
import AboutUs from "./../view/AboutUs";
import Todolist from "./../view/Todolist";
import ContactUs from "./../view/ContactUs";
import {Routes,Route} from "react-router-dom";

const AfterLoginLayout = () => {
    return (
        <>
            <Header/>
                <Routes>
                    <Route path="/" element={<Landing/>} />
                    <Route path="/landing" element={<Landing/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/contactus" element={<ContactUs/>}/>
                    <Route path="/todolist" element={<Todolist/>}/>
                </Routes>
            <Footer/>
        </>
    )
}

export default AfterLoginLayout;