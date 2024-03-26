import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {

    const errorMsg = useRouteError();
    console.log(errorMsg);
    
  return (
    <div>
        <h4>Error Details</h4>
        <p>{errorMsg.data}</p>
    </div>
  )
}

export default ErrorPage