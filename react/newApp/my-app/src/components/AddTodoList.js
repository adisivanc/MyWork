import React from "react";

const AddTodolist = ({searchText,setSearchText}) => {

    const handleSearch = (ev) => {
        setSearchText(ev.target.value);
    }

    return (
        <>
            <section className="addSection">
                <div>
                    <input type="text" className="inputFull" onChange={handleSearch} value={searchText} placeholder="Search" />
                </div>
                <div>
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px">
                        <polygon points="54 22 46 22 46 46 22 46 22 54 46 54 46 78 54 78 54 54 78 54 78 46 54 46 54 22"/>
                    </svg>
                    </span>
                </div>
            </section>
        </>
    )
}

export default AddTodolist;