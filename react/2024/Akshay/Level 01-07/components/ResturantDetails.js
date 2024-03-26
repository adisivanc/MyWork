import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'


const ResturantDetails = () => {

    const { resId } = useParams();
    const [resDetails,setResDetails] = useState([]);

    const apiURL = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0411068&lng=77.6622027&restaurantId="+resId;

    const fetchData = async () => {
        const response = await fetch(apiURL);
        const dataResp = await response.json();
        console.log(dataResp);

        setResDetails(dataResp?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
    }

    console.log(resDetails);

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div className='resMenu'>
            <ul>
                {
                   resDetails.map(item=>{
                    return <li>
                        {item.card.info.name}
                    </li>
                   }) 
                }
            </ul>
        </div>
    )
}

export default ResturantDetails