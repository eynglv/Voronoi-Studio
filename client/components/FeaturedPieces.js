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
                <span className="image-wrapper" key={painting.id} >
                <img src={painting.primaryImageSmall} className="gallery-image" /> 
                <div className='caption'>{painting.title} by {painting.artistDisplayName}</div>
                </span>
            ))}
        </div>
    )
}