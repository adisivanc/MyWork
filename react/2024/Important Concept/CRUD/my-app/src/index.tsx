import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import UserList from './components/UserList';
import ErrorPage from './components/ErrorPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const UserRoutes = () =>{
  return <Routes>
    <Route path="/" element={<UserList />} />
    <Route path="/addUser" element={<AddUser />} />
    <Route path="/updateUser" element={<UpdateUser />} />
  </Routes>
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
