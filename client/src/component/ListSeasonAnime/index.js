import './index.scss'
import Dataanime from "../../assets/anime.json"
import AddAnimeModal from '../AddAnimeModal';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const ListSeasonAnime=(props)=>{
    const navigate= useNavigate();
    const {year,season}=props;
    const animeInSeasonYear=Dataanime.filter((item)=>{if(item.seasonal==season&&item.year==year) return item})
    const [open,setOpen]=useState(false);
    const [modalAnime,setModalAnime]=useState();
    const handleOpen=(item)=>{
        setOpen(true)
        setModalAnime(item)
    }
    const handleClose=()=>{
        setOpen(false)
    }
    return(
        <div className="season-year-list">
            <h2>{season} {year}</h2>
            <div className="season-year-container">
                {animeInSeasonYear.map((anime,index)=>
                    <div key={index} className="season-year-card">
                        <img src={anime.image} onClick={()=>navigate(`/anime/${anime.id}`)}/>
                        <button onClick={()=>handleOpen(anime)}>Add to List</button>
                    </div>
                )}
            </div>
            <AddAnimeModal open={open} onClose={handleClose} anime={modalAnime}/>
        </div>
    )
}
export default ListSeasonAnime;