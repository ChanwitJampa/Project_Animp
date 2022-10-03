import './index.scss'
import AddAnimeModal from '../AddAnimeModal';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {fetchAnimeAsync} from '../../actions/animeListAction'
import {useDispatch,useSelector} from 'react-redux'
const ListSeasonAnime=(props)=>{
    const navigate= useNavigate();
    const dispatch=useDispatch()
    const {year,season}=props;
    const Dataanime =useSelector(state=>state.animeList)
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
    
    useEffect(()=>{
        dispatch(fetchAnimeAsync())
    })
    const myAnimeList = useSelector(state => state.myAnimeList)
    const nameOfMyAnimeList=myAnimeList.map((item)=>item.name)
    return(
        <div className="season-year-list">
            <h2>{season} {year}</h2>
            <div className="season-year-container">
                {animeInSeasonYear.map((anime,index)=>
                    <div key={index} className="season-year-card">
                        <div 
                            className='season-year-card-image' 
                            style={{backgroundImage:`url(${anime.image})`}}
                            onClick={()=>navigate(`/anime/${anime.id}`)}>
                                {nameOfMyAnimeList.includes(anime.name)?<h5>Watched</h5>:<></>}
                        </div>
                        <button onClick={()=>handleOpen(anime)}>Add to List</button>
                    </div>
                )}
            </div>
            <AddAnimeModal open={open} onClose={handleClose} anime={modalAnime}/>
        </div>
    )
}
export default ListSeasonAnime;