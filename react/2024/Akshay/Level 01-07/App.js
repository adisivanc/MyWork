import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import About from "./components/About";
import Services from "./components/Services";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import ErrorPage from "./components/ErrorPage";
import ResturantDetails from "./components/ResturantDetails";


const App = () => {
    return (
        <>
            <div className="main-container">
                <Header/>
                <Outlet/>
                <Footer/>
            </div>
        </>
    )
}


const appRouter = createBrowserRouter([{
    path:"/",
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[{
        path:"/",
        element:<Body/>
    },{
        path:"/aboutus",
        element:<About/>
    },{
        path:"/services",
        element:<Services/>
    },{
        path:"/resturant/:resId",
        element:<ResturantDetails/>
    }]
}])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);

export default App;