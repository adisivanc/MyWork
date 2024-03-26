import React, { useRef, useState } from "react";

const UseRef = () => {
    let i=0;

    const [j,setJ] = useState(0);
    const r = useRef(0)
    //console.log(r);

    return <>
        <div>
            <h4>Normal Variable</h4>
            <p>{`Normal Variable ${i}`}</p>
            <button aria-label="" onClick={()=> { console.log(i); return i+=1;}}>Increment i</button>
        </div>
        <div>
            <h4>State Variable</h4>
            <p>{`State Variable ${j}`}</p>
            <button aria-label="" onClick={()=>setJ(j+1)}>Increment j</button>
        </div>
        <div>
            <h4>Ref Variable</h4>
            <p>{`Ref Variable ${r.current}`}</p>
            <button aria-label="" onClick={()=>r.current+=1}>Increment r</button>
        </div>
    </>
}

export default UseRef;