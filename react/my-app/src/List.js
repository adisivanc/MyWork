import React from 'react';
import { useState } from "react";

const List = () => {

    const listObj = [{
        id:1,
        checked:false,
        description:"Early Morning",
    },{
        id:2,
        checked:true,
        description:"Good Morning",
    },{
        id:3,
        checked:false,
        description:"Good Afternoon",
    },{
        id:4,
        checked:false,
        description:"Good Evening",
    }]


    const [items,setItems] = useState(listObj);

    const handleCheck = (para) => {
        const newListItems = items.map((item) => {
            return item.id===para?{...item,checked:!item.checked}:item
        })
        setItems(newListItems);
    }

    const handleDelete = (para) => {
        const finalArray = items.filter(item => item.id!==para)
        setItems(finalArray);
    }

    return <ul>
    {
        items.map((item) => {
            return <li className="item py-3" key={item.id}>
            <div className="flex">
                <div className="basis-8">
                    <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)} className="accent-purple-900 w-4 h-4" />
                </div>
                <div className="flex-1">
                    <p className="">{item.description}</p>
                </div>
                <div className="basis-7">
                    <button className="">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" onClick={()=>handleDelete(item.id)} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                            <path d="M10 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M14 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
        })
    }
    </ul>
}

export default List
