import React, {useContext} from "react";
import TodoPopup from "./TodoPopup";
import UserContext from "./UserContext";

interface AddTodolistProps {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    showPopup: boolean;
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    itemsList: any; 
    setItemsList: React.Dispatch<React.SetStateAction<any>>; 
    editIdDesp: any; 
    setEditIdDesp: React.Dispatch<React.SetStateAction<any>>; 
}



const AddTodolist:React.FC<AddTodolistProps> = ({searchText,setSearchText,showPopup,setShowPopup,itemsList,setItemsList,editIdDesp,setEditIdDesp}) => {

    const handleSearch = (ev:React.ChangeEvent<HTMLInputElement>) => {
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



            <TodoPopup showPopupp={showPopup} setShowPopup={(valu: any) => setShowPopup(valu)} itemsList={itemsList} setItemsList={(item: any) => setItemsList(item)} editIdDesp={editIdDesp} setEditIdDesp={(editVl: any) => setEditIdDesp(editVl)} searchText={""} setSearchText={function (value: React.SetStateAction<string>): void {
                throw new Error("Function not implemented.");
            } }/>


        </>
    )
}

export default AddTodolist;