import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './index.css';

export const App = () => {
  return (
    <div>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}

let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>)