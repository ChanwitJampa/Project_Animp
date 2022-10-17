import './index.scss'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import { fetchStduioAsync }  from '../../actions/studioAction'
import SliderAnime from '../../component/SliderAnime';
import {fetchAnimeAsync} from '../../actions/animeListAction'
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'
const SingleStudioPage=()=>{
    let params = useParams();
    const dispatch=useDispatch()
    const [studio,setStudio]=useState([])
    const DateStudio = useSelector(state=>state.stduioList)
    const Dataanime =useSelector(state=>state.animeList)
    const {user} =useSelector((state)=>state.auth)
    const myAnimeList = useSelector(state => state.accountAnimeList)
    const fetchStudio = async () => {
        await axios.get(`http://localhost:5000/getStudioByStudioName/${params.id}`).
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
    useEffect(()=>{
        if(user){
            dispatch(fetchAnimeByAccountAsync(user.accounts_id))
        }
    },[user])
    const animeInStudio = Dataanime.filter((item)=>{if(item.Studio==studio.studioes_name) return item})
    return(
        <div className='singleStudio-wallpaper-text'>
            <h1>{studio.studioes_name}</h1>
            <div className='singleStudio-container'>
                <div className='singleStudio-wallpaper-imagebox'>
                    <img src={`https://cdn.myanimelist.net/images/company/${studio.studioes_logo}`}></img>
                </div>
                <div className='singleStudio-description'>
                    <p>{studio.studioes_description}</p>
                </div>
                <div className='singleStudio-donation'>
                    <div className='singleStudio-donation-child'>
                    <h2>ให้กำลังใจสตูดิโอผู้ผลิต<br></br>อนิเมะผ่านการโดเนท </h2>
                                        <button>Donate</button>
                    </div>
                    
                </div>
            </div>
            <SliderAnime tagAnime={studio.studioes_name} animeList={animeInStudio} myAnimeList={myAnimeList}/>
        </div>
    )
}
export default SingleStudioPage;