import React, { useState } from 'react';

interface FormData {
  username:string;
  password:string;
}
interface ErrorMsg {
  username:string;
  password:string;
}


const Body = () => {

  const [isLogged,setIsLogged]=useState(false);

  const [formData,setFormData] = useState<FormData>({
    username:'',
    password:''
  })

  const [errorMsg,setErrorMsg] = useState<ErrorMsg>({
    username:'',
    password:''
  })

  const handleInput = (ev:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = ev.target;
    setFormData({
      ...formData,
      [name]:value
    })

    setErrorMsg({
      ...errorMsg,
      [name]:''
    })
  }

  const handleValidation = ():boolean => {
    if(!formData.username){
      setErrorMsg({
        ...errorMsg,
        username:'Username is empty'
      })
      return false;
    }

    if(!formData.password){
      setErrorMsg({
        ...errorMsg,
        password:'Password is empty'
      })
      return false;
    }

    return true;
  }

  const sendDataToServer = async (data:FormData) => {
    const apiURL = "https://jsonplaceholder.typicode.com/posts";

    const response = await fetch(apiURL,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    });

    if(!response.ok)
      throw new Error("Failed to send data to server")

    return response.json();
  }

  const handleSubmit = async (ev:React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const isValidate = await handleValidation();

    if(isValidate){
      try{
        const response:boolean = await sendDataToServer(formData);
        if(response)
          setIsLogged(true);
      }
      catch(error){
        console.log("Error");
      }
    }
  }

  if(isLogged){
    window.location.href = "/dashbaord";
  }

  return (
    <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <h3 className='text-2xl mb-4'>Powerloom</h3>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' value={formData.username} onChange={handleInput} className='block w-full rounded-[4px] border border-neutral-300 bg-transparent py-3 pl-4 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5'/>
          <p className='error'>{errorMsg.username}</p>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' value={formData.password} onChange={handleInput} className='block w-full rounded-[4px] border border-neutral-300 bg-transparent py-3 pl-4 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5'/>
          <p className='error'>{errorMsg.password}</p>
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='pointer-events-auto rounded-md bg-indigo-600 px-5 py-3 text-[0.85rem] font-semibold leading-4 text-white hover:bg-indigo-500'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Body