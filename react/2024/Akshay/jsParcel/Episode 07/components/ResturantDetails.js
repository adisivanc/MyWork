import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ResturantDetails = () => {


    let {resId} = useParams();

    const apiURL = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0411068&lng=77.6622027&restaurantId="+resId;
    const imgURL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/"

    const [restMenu,setRestMenu]=useState([]);



    const [actualData,setActualData]=useState({})

    const fetchMenu = async() => {
        let response = await fetch(apiURL);
        let dataResp = await response.json();
        console.log(dataResp?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
        setRestMenu(dataResp?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);

        setActualData(dataResp);
    }

    useEffect(()=>{
        fetchMenu()
    },[])

    return (
    <div className='rest-details'>
        <h3>{actualData?.data?.cards[0]?.card?.card?.info?.name}</h3>
        <p>{actualData?.data?.cards[0]?.card?.card?.info?.avgRating} Rating</p>
        <p>{actualData?.data?.cards[0]?.card?.card?.info?.cuisines.join(", ")}</p>
        <p>{actualData?.data?.cards[0]?.card?.card?.info?.locality}</p>
        
        <div className='mt-10'>
            <h4 className='font-bold text-[24px]'>Menu</h4>
            <ul className='rest-menu'>
                {
                    restMenu.map(item => (
                        <li key={item?.card?.info?.id}>
                            <div>
                                <h5 className='text-[18px] font-semibold'>{item?.card?.info?.name}</h5>
                                <p>Rs.{item?.card?.info?.price/100}</p>
                                <p>{item?.card?.info?.description}</p>
                            </div>
                            <div>
                                <img src={imgURL+item?.card?.info?.imageId} alt='Food' title="Food"/>
                            </div>
                        </li>
                    ))                
                }
            </ul>
        </div>        
    </div>
    )
}

export default ResturantDetails