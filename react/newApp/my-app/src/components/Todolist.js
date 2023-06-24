import React, { useEffect } from "react";
import { useState } from "react";
import AddTodolist from "./AddTodoList";
import ViewTodoList from "./ViewTodoList";

//import closeIcon from "./../assets/close.svg";
//import delIcon from "./../assets/delete.svg";
//import editIcon from "./../assets/edit.svg";

const Todolist = () => {

    const [searchText,setSearchText] = useState("");
    const [itemsList,setItemsList] = useState([]);

    /*
    useEffect(()=>{
        console.log(itemsList);
    },[itemsList])
    */

    return (
        <>
            <form className="todolist">
                <h3>To do List</h3>
                <AddTodolist searchText={searchText} setSearchText={(val)=>setSearchText(val)}/>
                <ViewTodoList itemsList={itemsList} setItemsList={(val)=>setItemsList(val)}/>
            </form>
        </>
    )
}

export default Todolist;