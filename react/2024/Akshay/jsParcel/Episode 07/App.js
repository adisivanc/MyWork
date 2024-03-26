import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom';
import './index.css';

/*Pages*/
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import ErrorPage from './components/ErrorPage';
import ResturantDetails from './components/ResturantDetails';

import Testing from './components/Testing';


export const App = () => {
  return (
    <div>
        <Header/>
        <Testing/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

const appRouter = createBrowserRouter([{
  path:"/",
  element:<App/>,
  errorElement:<ErrorPage/>,
  children:[{
    path:"/",
    element:<Main/>
  },{
    path:"/about",
    element:<About/>
  },{
    path:"/contactus",
    element:<Contact/>
  },,{
    path:"/resturants/:resId",
    element:<ResturantDetails/>
  }]
}])

let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)