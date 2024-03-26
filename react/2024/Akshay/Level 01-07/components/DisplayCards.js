import React from 'react';
import {resImgURL} from "../Utilis/constant";
import { Link } from "react-router-dom";

const DisplayCards = ({listOfResturants, filterlistOfResturants}) => {
    console.log(listOfResturants);

  return (
    <div className='resturant-cards'>
        <ul>
            {
                filterlistOfResturants.map(item => {
                    //let {name, avgRating, id, cuisines, sla} = item;
                    return <li key={item?.info?.id}>
                        <Link to={"/resturant/"+item?.info?.id}>
                            <img src={resImgURL + item?.info?.cloudinaryImageId} alt={item?.info?.id} title={item?.info?.name} />
                            <div className='resturant-cards-details'>
                                <h5>{item?.info?.name}</h5>
                                <p>{item?.info?.avgRating} . {item?.info?.sla?.slaString}</p>
                                <p>{item?.info?.cuisines.join(", ")}</p>
                                <p>{item?.info?.areaName}</p>
                            </div>
                        </Link>
                    </li>
                })
            }
        </ul>
    </div>
  )
}

export default DisplayCards