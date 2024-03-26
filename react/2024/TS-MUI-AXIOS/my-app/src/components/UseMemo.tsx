import React, { useState,useMemo, useEffect, useCallback } from 'react';
import { axiosInstance } from '../axios';
import { Button, Stack, TextField } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography } from '@mui/material';

const UseMemo = () => {

    const [count,setCount]=useState(0);
    const [number, setNumber] = useState(0);


    /*----------------UseCallback----------------------*/

    const fetchData = useCallback(()=>{
        axiosInstance({
            method:"get",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer + Token"
            },
            url:"/recipes"
        })
        .then(data=>console.log(data.data))
    },[])

    useEffect(()=>{
        fetchData();
    },[fetchData])
    
        
    /*Higher Order Function*/

    let calculate = (arr:number[],logic:Function) => {
        return arr.map(ele=>logic(ele))
    }

    const area = () => {
        return function(r:number){
            return Math.PI*r*r;
        }
    }
    
    console.log(calculate([1,2,3],area()))
    


    /*----------------UseMemo----------------------*/

    const factorialFunction = (num:number):number => {
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        return result;
    }

    const calculateFactorial = useMemo(()=>factorialFunction(number),[number]) 

    
    return (
        <Stack spacing={4} direction="column">
            <Stack spacing={1} direction={'column'}>
                <Typography variant='h6'>Count is {count}</Typography>
                <Button type='button' variant='contained' color='secondary' size='medium' startIcon={<AddTwoToneIcon/>} onClick={()=>setCount((prev)=>prev+1)}>Increase Count</Button>
            </Stack>
            <Stack spacing={1} direction={'column-reverse'}>
                <TextField label="Number" type='text' value={number} onChange={(e)=>setNumber(parseInt(e.target.value) | 0)} />
                <Typography>Factorial of {number} is {calculateFactorial}</Typography>
            </Stack>
        </Stack>
    )
}

export default UseMemo