import React, { useState } from "react";
import { useEffect } from "react";
import DisplayItems from "./../components/DisplayItems"

const Todolist = () => {

    const API_URL = "http://localhost:3500/items";

    /*STATE*/
    const [itemsList,setItemsList] = useState([])
    /*STATE*/

    useEffect(()=>{
        console.log(itemsList);
    },[itemsList])

    useEffect(()=>{
        const fetchData = async () => {
            try{
                //debugger;
                const responseData = await fetch(API_URL,{method:"GET"})
                if(!responseData.ok) throw Error("Response Not received...");
                const fetchListItems = await responseData.json();
                setItemsList(fetchListItems);
            }catch(err){
                console.log(err.message);
            }
        }
        setTimeout(function(){
            (async () => await fetchData())()
        },500)
    },[])


    return (
        <>
            <DisplayItems itemsList={itemsList} setItemsList={setItemsList}/>
        </>
    )
}

export default Todolist;