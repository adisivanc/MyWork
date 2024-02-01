import React, {useContext} from "react";
import TodoPopup from "./TodoPopup";
import UserContext from "./UserContext";

const AddTodolist = ({searchText,setSearchText,showPopup,setShowPopup,itemsList,setItemsList,editIdDesp,setEditIdDesp}) => {

    const handleSearch = (ev) => {
        setSearchText(ev.target.value);
    }

    const handleAddPopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <>
            <section className="addSection">
                <div>
                    <input type="text" className="inputFull" onChange={handleSearch} value={searchText} placeholder="Search" />
                </div>
                <div>
                    <span onClick={handleAddPopup} className="pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px">
                            <polygon points="54 22 46 22 46 46 22 46 22 54 46 54 46 78 54 78 54 54 78 54 78 46 54 46 54 22"/>
                        </svg>
                    </span>
                </div>
            </section>

            <TodoPopup showPopup={showPopup} setShowPopup={(valu)=>setShowPopup()} itemsList={itemsList} setItemsList={(item)=>setItemsList(item)} editIdDesp={editIdDesp} setEditIdDesp={(editVl)=>setEditIdDesp(editVl)}/>
        </>
    )
}

export default AddTodolist;