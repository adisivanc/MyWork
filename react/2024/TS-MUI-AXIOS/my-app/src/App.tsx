import React from 'react';
import AxiosTesting from './components/AxiosTesting'
import UseMemo from './components/UseMemo';
import Login from './components/Login';
import Error from './components/Error';
import "./App.css";
import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Outlet/>
    </div>
  );
}

const appRouter = createBrowserRouter([{
  path:"/",
  element:<Login/>,
  errorElement:<Error/>,
  children:[{
    path:"/usememo",
    element:<UseMemo/>
  },{
    path:"/axios",
    element:<AxiosTesting/>
  }]
}])

export default App;
