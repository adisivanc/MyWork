import { useEffect, useState } from "react"

const Filter = ({listOfResturants,filterlistOfResturants,setFilterListOfResturants}) => {

    const [searchText,setSearchText] = useState("");

    const [ratedRes,setRatedRes] = useState("Top Rated Resturants")

    useEffect(()=>{
        deBouncingFunc();
    },[searchText])

    let debounceTimer;

    const deBouncingFunc = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
        let searchFilterList = listOfResturants.filter((item) => {
            console.log(searchText);
            return item.info.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilterListOfResturants(searchFilterList);
        }, 300); // Debounce time: 300 milliseconds
    };

    const handleSearch = (ev) => {
        setSearchText(ev.target.value);
    }

    const handleTopResturant = (ev) => {
        if(ratedRes==="Top Rated Resturants"){
            let topRatedResturantList = filterlistOfResturants.filter(item=>{
                return item.info.avgRating > 4.4
            })
            console.log(topRatedResturantList);
            setFilterListOfResturants(topRatedResturantList);
            setRatedRes("Show All Resturants");
        }else{
            setFilterListOfResturants(listOfResturants);
            setRatedRes("Top Rated Resturants");
        }
    }

    return (
        <section className="filter-container">
            <input type="text" value={searchText} placeholder="Search" onChange={handleSearch}/>
            <button type="button" onClick={handleTopResturant}>{ratedRes}</button>
        </section>
    )
}

export default Filter;