import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RestroCard = ({filterRes}) => {

    return (
        <>
            <ul className='flex flex-wrap gap-10'>
                {
                    filterRes.map((food) => {
                        //const {name,cuisines,avgRating,deliveryTime}= food;
                        return (
                            <li key={food.info.id} className='w-60 bg-slate-200'>
                                <Link to={"/resturants/"+food.info.id}>
                                <img src='https://tse4.mm.bing.net/th?id=OIP.eD7MpRmuCp5oKFlcdoKmuwHaE8&pid=Api&P=0&h=180' alt='Food' title="Food"/>
                                <div className='p-4'>
                                    <h2 className='font-semibold'>{food.info.name}</h2>
                                    <h5 className='italic'>{food.info.cuisines.join(", ")}</h5>
                                    <p>{food.info.avgRating} Stars</p>
                                    <p>{food.info.sla.deliveryTime} minutes</p>
                                </div>
                                </Link>
                            </li>
                        );
                    })
                }  
            </ul>      
        </>
    );
}

export default RestroCard;
