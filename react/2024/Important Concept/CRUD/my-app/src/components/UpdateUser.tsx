import React, { useEffect, useState } from 'react';
import Header from './Header';
import axiosInstance from '../axios/Axios';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id:string;
  firstName: string;
  lastName: string;
  dob:string;
  country: string;
  gender: string;
  tandc: boolean;
}

const UpdateUser = () => {

  const initialUpdatedData:UserData = {
    id:"",
    firstName: "",
    lastName: "",
    dob:"",
    country:"",
    gender:"",
    tandc:false
  }

  const navigate = useNavigate();

  const [editData,setEditData] = useState<UserData>(initialUpdatedData);
  const countryList: string[] = ["Denmark", "Liechtenstein", "Suriname", "Slovakia"];

  useEffect(() => {
      const data = localStorage.getItem("user");
      if (data) {
          const { id, firstName, lastName, dob, country, gender, tandc } = JSON.parse(data);
          setEditData(JSON.parse(data));
          console.log(editData);
      }else{
          console.log("User data not found in localStorage");
      }
  }, []);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {type,name,value} = e.target;
    if(type==="checkbox"){
      const isChecked = (e.target as HTMLInputElement).checked;
      setEditData((prevData)=> ({
        ...prevData,
        [name]:isChecked
      }))
    }else{
      setEditData((prevData)=> ({
        ...prevData,
        [name]:value
      }))
    }
    console.log("IP",editData);
  }

  const handleSubmit = async (ev:React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(editData);
    try{
      await axiosInstance({
        method:"put",
        url:`/users/${editData.id}`,
        data:{
          ...editData
        }
      })
      await navigate("/user/");
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div>
      <Header/>

      <h5>List of Operations</h5>
      <form onSubmit={handleSubmit}>
        <h5>Add User</h5>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' name='firstName' value={editData.firstName} placeholder='First Name' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' name='lastName' value={editData.lastName} placeholder='Last Name' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='dob'>Date of Birth</label>
          <input type='date' id='dob' name='dob' value={editData.dob} onChange={handleInputChange} />
        </div>
        <div>
          <label>Gender</label>
          <span>
            <input type='radio' id='male' value="male" name='gender' checked={editData.gender === "male"} onChange={handleInputChange} />
            <label htmlFor='male'>Male</label>
          </span>
          <span>
            <input type='radio' id='female' value="female" name='gender' checked={editData.gender === "female"} onChange={handleInputChange} />
            <label htmlFor='female'>Female</label>
          </span>
          <span>
            <input type='radio' id='others' value="others" name='gender' checked={editData.gender === "others"} onChange={handleInputChange} />
            <label htmlFor='others'>Others</label>
          </span>
        </div>
        <div>
          <label htmlFor='country'>Country</label>
          <select id='country' name='country' value={editData.country} onChange={handleInputChange}>
            {countryList.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='tandc'>Terms and Conditions</label>
          <input type='checkbox' id='tandc' name='tandc' checked={editData.tandc} onChange={handleInputChange} />
        </div>
        <div>
          <button type='submit'>Update User</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUser