import React, {useState, useEffect} from 'react';
import SearchType from './SearchType';
import RestroCard from './RestroCard';
import Shimmer from './Shimmer';
//import resData from './../utilis/data';

const Main = () => {

  const [listOfRes,setListOfRes] = useState([]);
  const [searchTxt,setSearchTxt] = useState("");
  const [filterRes,setFilterRes]=useState([]);

  /*
  useEffect(()=>{
    setFilterRes(listOfRes);
  },[])
  */

  const apiURL = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0411068&lng=77.6622027&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
  
  const fetchData = async() => {
    let response = await fetch(apiURL);
    let jsondata;
    if(response.ok)
      jsondata = await response.json();
    console.log(jsondata);
    let resDataObj = jsondata?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setListOfRes(resDataObj);
    setFilterRes(resDataObj);
  }

  useEffect(()=>{
    fetchData();
  },[]);

  if(listOfRes.length===0){
    return <Shimmer/>
  }

  return (
    <div className='mx-auto flex flex-col max-w-screen-xl items-left gap-8 px-4 sm:px-6 lg:px-8 clear-both'>
      <SearchType listOfRes={listOfRes} searchTxt={searchTxt} setSearchTxt={setSearchTxt} filterRes={filterRes} setFilterRes={setFilterRes}/>
      <RestroCard filterRes={filterRes}/>
    </div>
  )
}

export default Main