import React, { useContext,useState,useEffect } from "react";
import UserContext from "./UserContext";

interface TodoPopupProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  showPopupp: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  itemsList: any; 
  setItemsList: React.Dispatch<React.SetStateAction<any>>; 
  editIdDesp: any; 
  setEditIdDesp: React.Dispatch<React.SetStateAction<any>>; 
}

const TodoPopup:React.FC<TodoPopupProps> = ({showPopupp,setShowPopup,itemsList,setItemsList,editIdDesp,setEditIdDesp}) => {

  const showPopupCont = useContext(UserContext);
  const [textDesp,setTextDesp] = useState("");

  const handlePopAdd = () => {
    let count = itemsList.length+1;
    let newListItem = [...itemsList,{"id":count,"task":textDesp,"checked":false}];
    count++;
    setItemsList(newListItem);
    setTextDesp("");
    setShowPopup(!showPopupCont);
  }
  
  useEffect(()=>{
    //console.log(editIdDesp.task);
    let rrr = editIdDesp?setTextDesp(editIdDesp.task):"";
  },[showPopupCont])
  

  const handlePopCancel = () => {
    setTextDesp("");
    setShowPopup(!showPopupCont);
  }

  return (
    <section className={`${showPopupCont ? "dFlex" : "dHide"} todoPop`}>
        <div>
            <div className="todoPop-Cont">
                <div className="pop-Header">
                    <h5>Add Task</h5>
                </div>
                <div className="pop-Main">
                    <textarea rows={6} placeholder="Enter Task..." value={textDesp} onChange={(e)=>setTextDesp(e.target.value)}></textarea>
                </div>
                <div className="pop-Footer">
                    <button type="button" className="btn btn-primary-outline pointer" onClick={handlePopCancel}>CANCEL</button>
                    <button type="button" className="btn btn-primary pointer" onClick={handlePopAdd}>ADD</button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default TodoPopup;
