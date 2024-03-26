import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../axios';
import { Stack } from '@mui/material';
import {Button} from '@mui/material';

const AxiosTesting = () => {

    const [fetchedData,setFetchedData]=useState([]);
    const [formData,setFormData] = useState({username:'',password:''})

    const apiURL = "https://jsonplaceholder.typicode.com/posts";
    const token = "auth_token";

    useEffect(() => {
        const fetchPosts = async () => {
            let responsePromise = await axiosInstance({
                method:"get",
                url:apiURL,
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
            });
            setFetchedData(responsePromise.data);
        }
        fetchPosts();
    },[])

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        console.log("Form Submitted",formData);

        axiosInstance({
            method:"post",
            url:"products/addd",
            data:{title:formData.username}
        })
        .then(response=>console.log("Post",response))
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        console.log(e.target.value);
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction={'column'}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' id='username' value={formData.username} onChange={handleInputChange} placeholder='Username'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' value={formData.password} onChange={handleInputChange} placeholder='Password'/>
                    </div>
                    <div>
                        <Button variant='contained' color='primary' size='large' type='submit'>Login</Button>
                    </div>
                </Stack>
            </form>

            <br/>
            <hr/>
            <br/>

            <div>
                {
                    (fetchedData?(
                        <ul>
                        {
                            fetchedData.map((data:any)=>{
                                return <li key={data.id}>
                                    <h4>{data.title}</h4> 
                                    <p>{data.body}</p>  
                                </li>
                            })
                        }
                        </ul>
                    ):(
                        <h5>Loading....</h5>
                    ))
                }
            </div>
        </div>
    )
}

export default AxiosTesting