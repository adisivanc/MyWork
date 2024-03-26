import React from 'react';
import {useEffect, useState } from 'react';

export function Testing() {

  let apiURL = "https://jsonplaceholder.typicode.com/todos";

  let [data,setData] = useState(null)

  useEffect(()=>{
      fetch(apiURL)
      .then(response=>response.json())
      .then(data=>setData(data))
  },[])
  


  return (
    <div className='App'>
      <select>
      {
        data && data.map(element=>(
          <option key={element.id}>{element.title}</option>
        ))
      }
      </select>
    </div>
  );
}

export default Testing;