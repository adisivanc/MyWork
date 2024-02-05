import React, {useState} from 'react'

const App = () => {

  const [count,setCount] = useState(0);

  const increaseCount = () =>{
    setCount(count+1)
  }

  return (
    <div>
      Count: {count}
      <Increment increment={increaseCount}/>
    </div>
  )
}

const Increment = (props:any) =>{
  console.log(props);
  return (
    <button type='button' onClick={props.increment}>Increment</button>
  )
}



export default App