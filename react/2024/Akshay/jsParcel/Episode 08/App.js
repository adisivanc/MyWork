import React from 'react';
import ReactDOM from 'react-dom/client';
import User from './src/components/User';
import './App.css';

class App extends React.Component{
    
    render(){
        return <>
            <h3>Class based component</h3>
            <p>Overview</p>
            <User/>
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

export default App