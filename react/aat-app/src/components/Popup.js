import React, { useState, useEffect } from "react";


const Popup = ({showPopup,setShowPopup,itemsList,setItemsList,editItem,setEditItem}) => {

    const [newDesp,setNewDesp] = useState("");
    //const [editedDesp, setEditedDesp] = useState("");

    useEffect(() => {
        const abc = editItem?setNewDesp(editItem.description):"";
    }, [showPopup]);

    const handlePopCancel = () => {
        setShowPopup(!showPopup);
        setNewDesp("");
    }

    const handlePopAdd = () => {
        const newId = itemsList.length+1;
        const newItems = {
            id:newId,
            description:newDesp,
            checked:false
        }
        const newListOfItems = [...itemsList,newItems];
        setItemsList(newListOfItems);
        setShowPopup(!showPopup);
        setNewDesp("");
    }


    const handlePopUpdate = () => {
        const editNewItem = itemsList.map((item)=>{
            return (item.id===editItem.id)?{...item,description:newDesp}:item;
        })
        setItemsList(editNewItem);
        setNewDesp("");
        setShowPopup(!showPopup);
        setEditItem("");
    }

    return (
        <div className={`${showPopup?'d-block':'d-none'} position-fixed top-0 left-0 vh-100 col-12`} style={{backgroundColor:"rgba(0,0,0,0.5)",zIndex:200}}>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="col-4 bg-white p-10 rounded-2">
                    <h3 className="mb-3">Add Task</h3>
                    <textarea className="col-12 form-control" rows={4} onChange={(e)=>setNewDesp(e.target.value)} value={newDesp} required></textarea>
                    <div className="d-flex justify-content-end gap-7 mt-4">
                        <button className="btn btn-danger" onClick={handlePopCancel}>Cancel</button>
                        <button className="btn btn-success" onClick={editItem?handlePopUpdate:handlePopAdd}>{editItem?'Save':'Add'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;