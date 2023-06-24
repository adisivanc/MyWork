import React from "react";
import { useEffect } from "react";

const ViewTodoList = ({itemsList,setItemsList}) => {
    
    useEffect(()=>{
        let apiURL="http://localhost:3500/items";

        const fetchData = async () => {
            try{
                let responseData = await fetch(apiURL,{method:"GET"});
                if(!responseData.ok) throw Error("Data Not Received");
                let itemsList = await responseData.json();
                console.log(itemsList);
                setItemsList(itemsList);
            }catch(err){
                console.log(err.message)
            }finally{
                console.log("Finally")
            }
        }

        setTimeout(()=>{
            (async () => await fetchData())(); // Self Calling Function
        },300)
    },[])

    const handleCheck = (checkId) => {
        let updateCheck = itemsList.map((item)=>{
            return (item.id===checkId)?{...item,checked:!item.checked}:item;
        })
        setItemsList(updateCheck);
    }

    const handleEdit = (editId) => {
        console.log("Edit",editId);
    }

    const handleDelete = (deleteId) => {
        console.log("Delete",deleteId);
    }

    return (
        <>
            <ul className="todo">
                {itemsList.map((item)=> ( 
                    <li className="item" key={item.id}>
                        <div>
                            <div><input type="checkbox" onChange={()=>handleCheck(item.id)} checked={item.checked} /></div>
                            <div>{item.task}</div>
                            <div>
                                <svg onClick={()=>handleEdit(item.id)} className="editIcon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-name="Layer 1" viewBox="0 0 64 80" x="0px" y="0px">
                                    <path d="M53.79,17.37a1.78,1.78,0,0,0-.35-2.47l-6.26-4.69a1.77,1.77,0,0,0-2.47.36L39.91,17,49,23.77Z"/>
                                    <path d="M24.57,49.38c3-1.18,7.48-3,7.87-3.53L47.11,26.28,38,19.47,23.36,39c-.39.52-.89,5.34-1.19,8.54A1.76,1.76,0,0,0,24.57,49.38Z"/>
                                    <path d="M52.57,51.32H11.43a1.57,1.57,0,1,0,0,3.13H52.57a1.57,1.57,0,1,0,0-3.13Z"/>
                                </svg>
                            </div>
                            <div>
                                <svg onClick={()=>handleDelete(item.id)} className="delIcon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 125">
                                <g><g>
                                <path d="M68.8,92.3H31.2c-6.1,0-11-5-11-11V22.1h4.2v59.1c0,3.8,3.1,6.9,6.9,6.9h37.6c3.7,0,6.7-2.9,6.8-6.6V22.1h4.2v59.6    C79.6,87.7,74.7,92.3,68.8,92.3L68.8,92.3z"/>
                                <path d="M87.6,24.2H12.4c-1.2,0-2.1-0.9-2.1-2.1s0.9-2.1,2.1-2.1h75.2c1.2,0,2.1,0.9,2.1,2.1S88.7,24.2,87.6,24.2z"/>
                                <path d="M35.9,75.8c-1.2,0-2.1-0.9-2.1-2.1V40c0-1.2,0.9-2.1,2.1-2.1S38,38.8,38,40v33.7C38,74.8,37.1,75.8,35.9,75.8z"/>
                                <path d="M50,75.8c-1.2,0-2.1-0.9-2.1-2.1V40c0-1.2,0.9-2.1,2.1-2.1s2.1,0.9,2.1,2.1v33.7C52.1,74.8,51.2,75.8,50,75.8z"/>
                                <path d="M64.1,75.8c-1.2,0-2.1-0.9-2.1-2.1V40c0-1.2,0.9-2.1,2.1-2.1s2.1,0.9,2.1,2.1v33.7C66.2,74.8,65.2,75.8,64.1,75.8z"/>
                                <path d="M70.1,22.1H66v-4.2c0-3.8-3.1-6.9-6.9-6.9H40.9c-3.7,0-6.7,2.9-6.8,6.6v4.5h-4.2v-4.7c0.2-5.9,5-10.5,11-10.5h18.2    c6.1,0,11,5,11,11L70.1,22.1L70.1,22.1L70.1,22.1z"/></g>
                                <rect y="-0.4" className="st0" width="100" height="100"/></g>
                                </svg>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ViewTodoList;