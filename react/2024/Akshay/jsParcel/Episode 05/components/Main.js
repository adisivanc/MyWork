import React, {useState, useEffect} from 'react';
import SearchType from './SearchType';
import RestroCard from './RestroCard';
import resData from './../utilis/data';

const Main = () => {

  let resDataObj = resData.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;

  //console.log(typeof resDataObj, resDataObj);
  let [listOfRes,setListOfRes] = useState(resDataObj);
  //console.log(listOfRes);

  return (
    <div className='mx-auto flex flex-col max-w-screen-xl items-left gap-8 px-4 sm:px-6 lg:px-8 clear-both'>
      <SearchType listOfRes={listOfRes} setListOfRes={setListOfRes}/>
      <RestroCard listOfRes={listOfRes}/>
    </div>
  )
}

export default Main