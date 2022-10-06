import './index.scss'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import SliderAnime from '../../component/SliderAnime';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import {fetchAnimeAsync} from '../../actions/animeListAction'
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'

const SingleAnimePage=(props)=>{
    let params = useParams();
    const navigate =useNavigate()
    const dispatch=useDispatch()
    const Dataanime =useSelector(state=>state.animeList)
    const user =useSelector((state)=>state.auth)
    const fetchAnime = async () => {
        await axios.get(`http://localhost:5000/animes/${params.id}`).
        then((response) => response.data)
        .then((anime) => {
            console.log(anime);     
            setSingleAnime(anime)
        }).catch(error=>{
            console.log(error); 
        })
    }
    const fetchTagByAnime = async () => {
        await axios.get(`http://localhost:5000/tagDetails/tag/${params.id}`).
        then((response) => response.data)
        .then((anime) => {
            console.log(anime);     
            setTagAnime([...new Set(anime)])
        }).catch(error=>{
            console.log(error); 
        })
    }
    const [singleAnime,setSingleAnime] =useState("")
    const [tagAnime,setTagAnime]=useState([])
    //console.log(singleAnime)
    let dropzoneStyle = {
        width: `100%`,
        height: `660px`,
        backgroundImage: `url(${singleAnime.animes_wallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`
      };
    useEffect(()=>{
        window.scrollTo(0, 0);
        fetchAnime()
        fetchTagByAnime()
        dispatch(fetchAnimeAsync())
    },[])
    useEffect(()=>{
        dispatch(fetchAnimeByAccountAsync(user.accounts_id))
    },[])
    const animeList = Dataanime.filter((item)=>{if(item.Studio==singleAnime.Studio) return item})
    const myAnimeList = useSelector(state => state.accountAnimeList)
    return(
        <div>
            <div style={dropzoneStyle}>
                <div className='singleAnime-wallpaper'>
                    <div className='singleAnime-wallpaper-text'>
                        <h1>{singleAnime.animes_name}</h1>
                    </div>
                    <div className='singleAnime-wallpaper-detailbox'>
                        <div className='singleAnime-wallpaper-detailbox-imagebox'>
                            <img src={singleAnime.animes_image}></img>
                            <button>Add to list</button>
                        </div>
                        <div className='singleAnime-wallpaper-detailbox-tagAnime'>
                            <div className='detailbox-tagAnime-score'>
                                <h2>Score {singleAnime.animes_score}/10</h2>
                                <h2>My score /10</h2><br></br>
                            </div>
                            <div className='detailbox-tagAnime-score'>
                                {tagAnime.map((tag)=>(
                                    <button>{tag.tags_name}</button>
                                ))}
                            </div>
                        </div>
                        <div className='videoWrapper-container'>
                            <div className='videoWrapper'>
                                <iframe width="560" height="315" id="player" src={`${singleAnime.animes_trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='anime-detail-container'>
                <div className='anime-detail'>
                    <h2>Detail</h2><br/>
                    <p>Anime: {singleAnime.animes_name}</p><br/>
                    {singleAnime.animes_episodes!==1?<>
                        <p>Episodes: {singleAnime.animes_episodes}</p><br/>
                        <p>Seasonal: {singleAnime.animes_seasonal}</p></>:
                    <p>Type: Movie</p>}<br/>
                    <p>Year: {singleAnime.animes_year}</p><br/>
                    <p onClick={()=>navigate(`/studio/${singleAnime.Studio}`)}>Studio: {singleAnime.Studio}</p><br/>
                    <p>Duration: {singleAnime.animes_duration}</p>
                </div>
                <div className='anime-detail-content'>
                    <h2>เนื้อเรื่องย่อ</h2>
                    <p>{singleAnime.animes_content}</p>
                </div>
            </div>
            <SliderAnime tagAnime="From same studio" animeList={animeList} myAnimeList={myAnimeList}/>
        </div>
        )
}
export default SingleAnimePage;