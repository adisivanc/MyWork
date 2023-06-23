import React from "react";
import { useState } from "react";
import AddTodolist from "./AddTodoList";

//import closeIcon from "./../assets/close.svg";
//import delIcon from "./../assets/delete.svg";
//import editIcon from "./../assets/edit.svg";

const Todolist = () => {

    const [searchText,setSearchText] = useState("");

    return (
        <>
            <form className="todolist">
                <AddTodolist searchText={searchText} setSearchText={(val)=>setSearchText(val)}/>
                <p>{searchText}</p>
            </form>
        </>
    )
}

export default Todolist;