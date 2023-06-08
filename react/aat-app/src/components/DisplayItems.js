import React, { useState } from "react";
import Popup from "./Popup";


const DisplayItems = ({itemsList,setItemsList}) => {

    const [searchItem,setSearchItem] = useState("");
    const [showPopup,setShowPopup] = useState(false);
    const [editItem,setEditItem] = useState(null);

    const handleCheck = (paramID) => {
        const newCheckArr = itemsList.map((item)=>{
            return (item.id===paramID)?{...item,checked:!item.checked}:item;
        })
        return setItemsList(newCheckArr);
    }

    const handleEdit = (editId) => {
        const editItem = itemsList.find((item)=>(item.id===editId));
        setEditItem(editItem);
        setShowPopup(!showPopup);
    }

    const handleDelete = (deleteID) => {
        const newListArr = itemsList.filter((item)=>{
            return (item.id!==deleteID)
        })

        setItemsList(newListArr);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        setShowPopup(!showPopup);
    }

       
    return (
        <div className="container">
        <form className="mt-4">
            <h4 className="px">To Do List</h4>
            <div className="col-sm-5 d-flex justify-content-between gap-10 my-10">
                <input type="search" defaultValue={searchItem} className="form-control" placeholder="Search" />
                <button className="btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e)=>handleAdd(e)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <ul className="ps-0">
                {
                itemsList.map((item)=> (
                    <li className="d-flex gap-6 py-3 border-bottom col-sm-5" key={item.id}>
                        <input type="checkbox" className="w-5 h-5" checked={item.checked} onChange={()=>handleCheck(item.id)} />
                        <p className="col-sm-9">{item.description}</p>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>handleEdit(item.id)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>handleDelete(item.id)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </span>
                    </li>
                ))
                }
            </ul>
        </form>
        {
            <Popup editItem={editItem} setEditItem={(val)=>setEditItem(val)} showPopup={showPopup} itemsList={itemsList} setItemsList={(newItem)=>setItemsList(newItem)} setShowPopup={(show)=>setShowPopup(show)}/>
        }
        </div>
    )
}

export default DisplayItems;