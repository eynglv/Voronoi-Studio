import React, { useEffect, useState } from "react";
import axios from "axios";

export default ()=>{
    const [artPieces, setArtPieces]=useState([])
    useEffect(()=>{
        const getArt=async ()=>{
            const art=(await axios.get('/api/paintings/')).data
            setArtPieces(art)
        }
        getArt()
    },[])
    return(
        <div className="mx-auto" style={{width: '90%'}}>
        <h1 className="title display-2 mx-auto text-center mt-5">All Art Pieces</h1>
        <div className='row row-cols-4 mx-auto mt-5'>
            {artPieces.map(painting=>(
                <div className= "mb-5 mt-2 image-wrapper" key={painting.id} >
                <img  className ="w-100 h-100" src={painting.primaryImageSmall} /> 
                <div className='mt-1 text-center caption'>{painting.title} by {painting.artistDisplayName ? painting.artistDisplayName : 'Unknown'}</div>
                </div>
            ))}
        </div>
        </div>
    )
}