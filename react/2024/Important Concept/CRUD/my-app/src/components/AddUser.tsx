import React, { useState } from 'react';
import Header from './Header';
import axiosInstance from '../axios/Axios';
import { useNavigate } from 'react-router-dom';

interface UserData {
  firstName: string;
  lastName: string;
  dob: string;
  tandc: boolean;
  gender: string;
  country: string;
}

const AddUser = () => {
  const initialData: UserData = {
    firstName: "",
    lastName: "",
    dob: "",
    tandc: false,
    gender: "",
    country: ""
  };

  const [userdata, setUserdata] = useState(initialData);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setUserdata(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      await axiosInstance({
        method: "post",
        url: "/users",
        data: userdata
      }).then(response => {
        console.log(response.data); // Handle response if needed
      }).catch(error => {
        console.error('Error:', error);
      });
      await setUserdata(initialData);
      await navigate("/user")
    }catch(err){
      console.log(err);
    }
  };

  const countryList: string[] = ["Denmark", "Liechtenstein", "Suriname", "Slovakia"];

  return (
    <div className='addUser'>
      <Header />
      <form onSubmit={handleSubmit}>
        <h5>Add User</h5>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' name='firstName' value={userdata.firstName} placeholder='First Name' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' name='lastName' value={userdata.lastName} placeholder='Last Name' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='dob'>Date of Birth</label>
          <input type='date' id='dob' name='dob' value={userdata.dob} onChange={handleInputChange} />
        </div>
        <div>
          <label>Gender</label>
          <span>
            <input type='radio' id='male' value="male" name='gender' checked={userdata.gender === "male"} onChange={handleInputChange} />
            <label htmlFor='male'>Male</label>
          </span>
          <span>
            <input type='radio' id='female' value="female" name='gender' checked={userdata.gender === "female"} onChange={handleInputChange} />
            <label htmlFor='female'>Female</label>
          </span>
          <span>
            <input type='radio' id='others' value="others" name='gender' checked={userdata.gender === "others"} onChange={handleInputChange} />
            <label htmlFor='others'>Others</label>
          </span>
        </div>
        <div>
          <label htmlFor='country'>Country</label>
          <select id='country' name='country' value={userdata.country} onChange={handleInputChange}>
            {countryList.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='tandc'>Terms and Conditions</label>
          <input type='checkbox' id='tandc' name='tandc' checked={userdata.tandc} onChange={handleInputChange} />
        </div>
        <div>
          <button type='submit'>Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
