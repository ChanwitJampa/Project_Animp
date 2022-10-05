import './index.scss'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import { fetchStduioAsync }  from '../../actions/studioAction'
import SliderAnime from '../../component/SliderAnime';
import {fetchAnimeAsync} from '../../actions/animeListAction'

const SingleStudioPage=()=>{
    let params = useParams();
    const dispatch=useDispatch()
    const [studio,setStudio]=useState([])
    const DateStudio = useSelector(state=>state.stduioList)
    const Dataanime =useSelector(state=>state.animeList)
    
    const idStduio = DateStudio.filter((item)=>{if(item.studioes_name==params.id) return item})
    const fetchStudio = async () => {
        await axios.get(`http://localhost:5000/studioes/${idStduio[0].studioes_id}`).
        then((response) => response.data)
        .then((stduio) => {    
            setStudio(stduio)
        }).catch(error=>{
            console.log(error); 
        })
    }
    useEffect(()=>{
        //window.scrollTo(0, 0);
        fetchStudio()
        dispatch(fetchStduioAsync())
        dispatch(fetchAnimeAsync())
    },[])
    const animeInStduio = Dataanime.filter((item)=>{if(item.Studio==studio.studioes_name) return item})
    return(
        <div className='singleStudio-wallpaper-text'>
            <h1>{studio.studioes_name}</h1>
            <div>
                <div className='singleStudio-wallpaper-imagebox'>
                <img src={`https://cdn.myanimelist.net/images/company/${studio.studioes_logo}`}></img>
            </div>
            <div>
                <SliderAnime tagAnime={studio.studioes_name} animeList={animeInStduio}/>
            </div>
            </div>
            
        </div>
    )
}
export default SingleStudioPage;