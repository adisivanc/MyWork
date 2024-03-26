import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
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