import Filter from "./Filter";
import DisplayCards from "./DisplayCards";
import { useEffect, useState } from "react";
import { listRestApi } from "../Utilis/constant";
import Shimmer from "./Shimmer"

const Body = () => {

    const [listOfResturants,setListOfResturants] = useState([]);

    const [filterlistOfResturants,setFilterListOfResturants] = useState([]);

    const fetchData = async() => {
        const response =await fetch(listRestApi);
        const data = await response.json();
        console.log(data);
        
        //For Fresh List
        setListOfResturants(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

        //For Filter
        setFilterListOfResturants(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(listOfResturants.length===0)
        return <Shimmer/>

    return (
        <main>
            <Filter listOfResturants={listOfResturants} filterlistOfResturants={filterlistOfResturants} setFilterListOfResturants={setFilterListOfResturants}/>
            <DisplayCards listOfResturants={listOfResturants} filterlistOfResturants={filterlistOfResturants}/>
        </main>
    )
}

export default Body;