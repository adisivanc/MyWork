import React from 'react';
import SearchType from './SearchType';
import RestroCard from './RestroCard';
import resData from './utilis/data';

const Main = () => {


  let resDataObj = resData.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;

  console.log(resDataObj);

  return (
    <div className='mx-auto flex flex-col max-w-screen-xl items-left gap-8 px-4 sm:px-6 lg:px-8 clear-both'>
      <SearchType/>
      <RestroCard resDataObj={resDataObj}/>
    </div>
  )
}

export default Main