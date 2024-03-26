import React from 'react'

const SearchType = ({listOfRes, setListOfRes}) => {

  const handleTopRatedRes = () => {
    const filterRopRatedRes = listOfRes.filter(res => res.info.avgRating > 4.2);
    console.log(filterRopRatedRes);
    setListOfRes(filterRopRatedRes);
  }

  return (
    <div className='w-full clear-both mt-[50px]'>
      <input type='button' value="Top Rated Resturants" onClick={handleTopRatedRes} className='bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-md cursor-pointer'/>
    </div>
  )
}

export default SearchType