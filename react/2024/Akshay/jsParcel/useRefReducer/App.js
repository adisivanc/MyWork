import React from 'react';
import ReactDOM from 'react-dom/client';
import UseReducer from './components/UseReducer';
import UseRef from './components/UseRef';
import "./index.css";

const App = () => {
  return (
    <div className='flexContainer'>
        <UseReducer/>
        <UseRef/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App/>);

export default App