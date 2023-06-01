import React, { useState } from 'react';

const TodoList = () => {

    const listOfTask = [{
        id:1,
        description:"Learning HTML",
        checked:false
    },{
        id:2,
        description:"Learning CSS",
        checked:true
    },{
        id:3,
        description:"Learning Tailwind",
        checked:false
    },{
        id:4,
        description:"Learning Javascript",
        checked:false
    },{
        id:5,
        description:"Learning jQuery",
        checked:true
    }]

    const [items,setItems] = useState(listOfTask)
    const [show,setShow] = useState(false)
    const [desp,setDesp] = useState("")
    const [todoID,setTodoID] = useState("")

    const handleCheck = (param) => {
        const newCheckedArray = items.map((item)=>(
            (item.id===param)?{...item,checked:!item.checked}:item
        ));
        setItems(newCheckedArray);
    }

    const handleDelete = (param) => {
        const newCheckedArray = items.filter(item => item.id!==param);
        setItems(newCheckedArray);
    }

    const togglePopup = () => {
        setDesp("");
        setShow(!show);
    }

    const handleAdd = () => {
        const sortMaxArray = items.sort((a,b)=> b.id-a.id);
        const maxId = sortMaxArray[0].id; 

        const newElement = {
            id: maxId + 1,
            description: desp,
            checked: false
        };
        
        const newItemsArray = [...items, newElement];
        setItems(newItemsArray);
        setDesp("");
        setShow(!show);
        
    }

    const handleEdit = (editID) => {
        setShow(!show);
        const filterArr = items.filter((item)=>{
            return item.id===editID
        })
        setDesp(filterArr[0].description);
        setTodoID(editID);
    }

    const handleUpdate = () => {
        let toVal = todoID;
        const updArr = items.map((item)=> (
            (item.id===toVal)?{...item,description:desp}:item
        ))
        setItems(updArr);
    }

    return (
        <section className='p-10 pb-5 w-96 relative mb-10 bg-zinc-800/90 border border-slate-500 rounded-xl'>
            <h4 className='uppercase text-xl'>
                TodoList
                <button className="float-right" onClick={()=>togglePopup()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </h4>
            <div className='mt-6'>
                <ul className='w-full'>
                    {
                        items.map(item => (
                            <li className="flex gap-x-7 mb-5" key={item.id}>
                                <input className='w-5 h-5' type='checkbox' checked={item.checked} onChange={()=>handleCheck(item.id)}/>
                                <p className='grow'>{item.description}</p>
                                <button onClick={()=>handleEdit(item.id)}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                        <path d="M3.99512 17.2072V19.5C3.99512 19.7761 4.21897 20 4.49512 20H6.79289C6.9255 20 7.05268 19.9473 7.14645 19.8536L16.5942 10.4058L13.5935 7.40518L4.14163 16.8535C4.04782 16.9473 3.99512 17.0745 3.99512 17.2072Z" fill="currentColor"></path> 
                                        <path d="M14.8322 6.16693L17.8327 9.16734L19.2929 7.7071C19.6834 7.31658 19.6834 6.68341 19.2929 6.29289L17.707 4.70697C17.3165 4.3165 16.6834 4.31644 16.2929 4.70684L14.8322 6.16693Z" fill="currentColor"></path> 
                                        </g>
                                    </svg>
                                </button>
                                <button onClick={()=>handleDelete(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className={`${show?"":'hidden'} absolute w-100 h-100 backdrop-blur-md bg-zinc-800/90 text-white top-0 left-0 right-0 bottom-0 border border-slate-500 rounded-xl p-10`}>
                <div>
                    <h4 className='text-lg mb-3'>Add Description</h4>
                    <textarea id="descpText" className='w-full h-24 bg-zinc-800 border focus:border-blue-500' value={desp} onChange={(e) => setDesp(e.target.value)}></textarea>
                    <div className='flex justify-end mt-5'>
                        <button className='bg-red-900 py-2 px-3 rounded-md text-sm mr-5' onClick={()=>togglePopup()}>Cancel</button>
                        <button className='bg-blue-900 py-2 px-3 rounded-md text-sm mr-5' onClick={()=>handleUpdate()}>Update</button>
                        <button className='bg-green-900 py-2 px-4 rounded-md text-sm' onClick={()=>handleAdd()}>Add</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TodoList