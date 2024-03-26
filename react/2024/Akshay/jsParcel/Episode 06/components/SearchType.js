import React, { useEffect, useState } from 'react'

const SearchType = ({listOfRes,searchTxt,setSearchTxt,filterRes,setFilterRes}) => {

  /*
  let initialArr = [...listOfRes];
  console.log(initialArr);
  */
 console.log("SR",filterRes);

  const handleTopRatedRes = () => {
    const filterRopRatedRes = filterRes.filter(res => res.info.avgRating > 4.2);
    //console.log(filterRopRatedRes);
    setFilterRes(filterRopRatedRes);
  }

  const handleSearch = (ev) => {
    const searchText = ev.target.value;
    setSearchTxt(searchText);

    if(searchText===""){
      setFilterRes(listOfRes);
    }else{
      const filteredRes = listOfRes.filter(searchRes=>{
        return searchRes.info.name.toLowerCase().includes(searchText.toLowerCase());
      })
      console.log("Filter Res",filteredRes);
      setFilterRes(filteredRes);
    }
  };

  return (
    <div className='w-full clear-both mt-[50px]'>
      <input type='text' name='search' id='searchResFood' className='border-2 border-emerald-500' value={searchTxt} onChange={handleSearch}/>
      
      <input type='button' value="Top Rated Resturants" onClick={handleTopRatedRes} className='bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-md cursor-pointer'/>
    </div>
  )
}

export default SearchType