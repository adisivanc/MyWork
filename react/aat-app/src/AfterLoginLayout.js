import React from "react";
import Landing from "./Landing";
import Footer from "./Footer";
import Header from "./Header";
import Services from "./Services";
import AboutUs from "./AboutUs";
import Todolist from "./Todolist";
import ContactUs from "./ContactUs";
import {Routes,Route} from "react-router-dom";

const AfterLoginLayout = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Landing/>}>
                    <Route path="/landing" element={<Landing/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/contactus" element={<ContactUs/>}/>
                    <Route path="/todolist" element={<Todolist/>}/>
                </Route>
            </Routes>
            <Footer/>
        </>
    )
}

export default AfterLoginLayout;