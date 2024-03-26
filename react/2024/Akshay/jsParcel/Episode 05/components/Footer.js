import React, { useCallback, useMemo, useState } from 'react'
import { Copyrights } from './Copyrights'
import { DateComp } from './DateComp'

const Footer = () => {

  const [count,setCount]= useState(0);
  const [radomNum,setRadomNum]= useState(0);

  const handleCount = useCallback(() => {
    setCount(count+1)
  },[]);

  const handleRandom = useCallback(() => {
    setRadomNum(Math.floor(Math.random() * 100));
  },[]);

  return (
    <div className='mx-auto mt-[40px] mb-[100px] flex flex-col max-w-screen-xl items-left text-left gap-3 px-4 sm:px-6 lg:px-8 clear-both'>
      <Copyrights count={count}/>
      <button type='button' className='bg-orange-300 p-2' onClick={handleCount}>Add Count</button>
      <DateComp radomNum={radomNum}/>
      <button type='button' className='bg-purple-300 p-2' onClick={handleRandom}>Generate Random</button>
    </div>
  )
}

export default Footer