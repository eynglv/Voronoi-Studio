import React, { useEffect, useState } from "react";
import axios from "axios";

export default ()=>{
    const [artPieces, setArtPieces]=useState([])
    useEffect(()=>{
        const getArt=async ()=>{
            const art=(await axios.get('/api/paintings/')).data
            console.log(art)
            setArtPieces(art)
        }
        getArt()
    },[])
    return(
        <div className='gallery-container'>
            {artPieces.map(painting=>(
                <img src={painting.primaryImageSmall} key={painting.id} className="gallery-image" />
            ))}
        </div>
    )
}