import React, { useReducer, useState } from "react";

const UseReducer = () => {

    const [transactionVal,settransactionVal] = useState(0);

    const transactionReducer = (balance,action) => {
        let result;
        switch(action.type){
            case "WITHDRAW":
                result = balance - Number(action.loadNumber);
                settransactionVal(0);
                return result;
            case "DEPOSIT":
                result = balance + Number(action.loadNumber);
                settransactionVal(0);
                return result;
            default:
                return balance
        }
    }

    const [balance,dispatch] = useReducer(transactionReducer,transactionVal);

    return <>
        <div className="useReducer">
            <h4>Current Balance {balance}</h4>
            <input type="text" value={transactionVal} aria-label="transaction-amount" onChange={(e)=>settransactionVal(e.target.value)}/>
            <button onClick={()=>dispatch({type:"WITHDRAW",loadNumber:transactionVal})}>Withdraw</button>
            <button onClick={()=>dispatch({type:"DEPOSIT",loadNumber:transactionVal})}>Deposits</button>
        </div>
    </>
}

export default UseReducer;