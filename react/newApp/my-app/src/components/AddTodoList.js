import React from "react";
import plusIcon from "./../assets/add.svg";

const AddTodolist = ({searchText,setSearchText}) => {

    const handleSearch = (ev) => {
        setSearchText(ev.target.value);
    }

    return (
        <>
            <section className="addSection">
                    <div>
                        <input type="text" onChange={handleSearch} value={searchText} placeholder="Search" className="" />
                    </div>
                    <div>
                        <img src={plusIcon} alt="Add Task" title="Add Task" />
                    </div>
            </section>
        </>
    )
}

export default AddTodolist;