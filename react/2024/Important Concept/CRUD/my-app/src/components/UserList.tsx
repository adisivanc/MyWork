import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/Axios';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  dob:string;
  country: string;
  gender: string;
  tandc: boolean;
}

const UserList = () => {
  const [userData, setUserData] = useState<Array<UserData>>([]);
  const [loading,setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleUpdate = async(user:UserData) => {
    // const {id,firstName,lastName,dob,country,gender,tandc} = user;
    console.log(JSON.stringify(user));
    await localStorage.setItem("user",JSON.stringify(user));
    await navigate("/user/updateUser")
  } 

  const handleDelete = async (id:any) => {
    console.log(id);
    try{
      const response = await axiosInstance.delete(`users/${id}`);
      console.log("Response",response);
      if(response.status===200){
        setUserData((prevUserData)=>prevUserData.filter(data=>data.id!==id))
      }
      // await navigate("")
    }catch(err){
      console.log(err);
    } 

  }

  useEffect(() => {
    axiosInstance({
      method: "get",
      url: "/users/"
    }).then(response => {
      console.log(response.data);
      setUserData(response.data);
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      setLoading(false);
    })
  }, []);

  if(loading){
    return <Loading/>
  }   

  return (
    <div>
      <Header/>
      <h5>List of User</h5>
      <ul>
        {
          (userData)?
          (
            userData.map((user:UserData) => (
            <li key={user.id}>
              <span>{user.firstName} {user.lastName}</span><br/>
              DOB: <span>{user.dob}</span>
              <div>
                Country: <span>{user.country} </span> <br/>
                Gender: <span>{user.gender}</span> <br/>
                <span>{user.tandc}</span>
              </div>
              <div>
                <button type='button' onClick={()=>handleUpdate(user)}>Edit</button>
                <button type='button' onClick={()=>handleDelete(user.id)}>Delete</button>
              </div>
            </li>
            ))
          ):(
            <Loading/>
          )
        }
      </ul>
    </div>
  )
}

export default UserList
