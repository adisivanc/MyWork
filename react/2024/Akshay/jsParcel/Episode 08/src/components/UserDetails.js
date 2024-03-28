import React from "react";

class UserDetails extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

        //Creating state
        this.state = {
            count:0
        }
    }

    handleCount = (operation) => {
        this.setState((prevState)=>{
            let newValue;
            switch(operation){
                case "+":
                    newValue = prevState.count + 1;
                    break;
                case "-":
                    newValue = prevState.count - 1;
                    break;
                case "*":
                    newValue = prevState.count * 2;
                    break;
                default:
                    newValue = prevState;
            }
            return {count:newValue};
        })
    }

    render(){
        const {name} = this.props.datas;

        return <div className="bg-red-100 my-4 p-5">
            <div>
                <h1 className="text-2xl">Details Overview</h1>
                <p>Name:{name}</p>
            </div>
            <div>
                <h2>State</h2>
                <p>{this.state.count}</p>
                <button type="button" className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={()=>this.handleCount("+")}>Increase Count</button>
                <button type="button" className="inline-block rounded border border-blue-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={()=>this.handleCount("-")}>Decrease Count</button>
                <button type="button" className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={()=>this.handleCount("*")}>Double Count</button>
            </div>
        </div>
    }
}

export default UserDetails;