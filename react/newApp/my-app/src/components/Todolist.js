import React from "react";
import { useState } from "react";
import AddTodolist from "./AddTodoList";
import ViewTodoList from "./ViewTodoList";
import UserContext from "./UserContext";

const Todolist = () => {

    const [searchText,setSearchText] = useState("");
    const [itemsList,setItemsList] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editIdDesp,setEditIdDesp] = useState(null);

    return (
        <>
            <form className="todolist">
                <h3>To do List</h3>
                <UserContext.Provider value={showPopup}>
                    <AddTodolist searchText={searchText} setSearchText={(val)=>setSearchText(val)} showPopup={showPopup} setShowPopup={(popVal)=>setShowPopup(popVal)} 
                    itemsList={itemsList} setItemsList={(item)=>setItemsList(item)} editIdDesp={editIdDesp} setEditIdDesp={(editVl)=>setEditIdDesp(editVl)}/>
                </UserContext.Provider>
                <ViewTodoList itemsList={itemsList} setItemsList={(val)=>setItemsList(val)} showPopup={showPopup} setShowPopup={(popVal)=>setShowPopup(popVal)} editIdDesp={editIdDesp} setEditIdDesp={(editVl)=>setEditIdDesp(editVl)}/>
            </form>
        </>
    )
}

export default Todolist;