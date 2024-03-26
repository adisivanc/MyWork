import React, { useState } from 'react'

const Login = () => {

    interface FormData {
        username:string;
        password:string;
        matchPassword:string;
        mobileNumber:string;
    }

    interface ErrorMsg {
        username:string;
        password:string;
        matchPassword:string;
        mobileNumber:string;
    }

    const initialFormData:FormData = {
        username:"",
        password:"",
        matchPassword:"",
        mobileNumber:""
    }

    const initialErrorMsg:ErrorMsg = {
        username:"",
        password:"",
        matchPassword:"",
        mobileNumber:""
    }

    const [formData,setFormData] = useState<FormData>(initialFormData);
    const [errorMsg,setErrorMsg] = useState<ErrorMsg>(initialErrorMsg);


    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
        console.log(formData);
        console.log(e.target.value);
    }

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const MOBILE_NUMBER_REGEX = /^[6-9]\d{9}$/;


    const validate = (name:string,value:string):boolean |void => {
      switch(name){
        case 'username':
          return USER_REGEX.test(value);
          break;
        case 'password':
          return PWD_REGEX.test(value);
          break;
        case 'matchPassword':
          return PWD_REGEX.test(value);
          break;
        case 'mobileNumber':
          return MOBILE_NUMBER_REGEX.test(value);
          break;
        default:
          console.log("END");
          break;
      }
    }

    const handleFocus = (e:React.FocusEvent<HTMLInputElement>) => {
        console.log(e.target.name+" Focused");
    }

    const handleBlur = (e:React.FocusEvent<HTMLInputElement>):void => {
        let isValid = validate(e.target.name,e.target.value);
        setErrorMsg({
          ...errorMsg,
          [e.target.name]: isValid ? "" : `${e.target.name} is invalid.`
      });
    }

    const handleSubmit = () => {

    }

  return (
    <div>
      <section>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p>{errorMsg.username}</p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p>{errorMsg.password}</p>
          </div>
          <div>
            <label htmlFor="matchPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="matchPassword"
              id="matchPassword"
              value={formData.matchPassword}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p>{errorMsg.matchPassword}</p>
          </div>
          <div>
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              placeholder="Mobile Number"
              name="mobileNumber"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p>{errorMsg.mobileNumber}</p>
          </div>
          <div>
            <button type='submit' onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login