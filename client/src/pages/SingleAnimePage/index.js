import './index.scss'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Dataanime from "../../assets/anime.json"
import SliderAnime from '../../component/SliderAnime';
import { useNavigate } from "react-router-dom";
const SingleAnimePage=(props)=>{
    let params = useParams();
    const navigate =useNavigate()
    const singleAnime=Dataanime.filter((item)=>{if(item.id==params.id) return item})
    let dropzoneStyle = {
        width: `100%`,
        height: `660px`,
        backgroundImage: `url(${singleAnime[0].wallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`
      };
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAutoPlay, setIsAutoPlay]=useState(false)
    // const handleScroll = () => {
    //     const position = window.pageYOffset;
    //     setScrollPosition(position);
    //   };
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //       window.removeEventListener("scroll", handleScroll);
    //     };
    // },[]);
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        const myTimeout = setTimeout(setAutoPlay, 3000);
    },[])
    const setAutoPlay=()=>{
        setIsAutoPlay(true)
    }

    return(
        <div>
            <div style={dropzoneStyle}>
                <div className='singleAnime-wallpaper'>
                    <div className='singleAnime-wallpaper-text'>
                        <h1>{singleAnime[0].name}</h1>
                    </div>
                    <div className='singleAnime-wallpaper-detailbox'>
                        <div className='singleAnime-wallpaper-detailbox-imagebox'>
                            <img src={singleAnime[0].image}></img>
                            <button>Add to list</button>
                        </div>
                        <div className='singleAnime-wallpaper-detailbox-tagAnime'>
                            <div className='detailbox-tagAnime-score'>
                                <h2>Score {singleAnime[0].score}/10</h2>
                                <h2>My score /10</h2><br></br>
                            </div>
                            <div className='detailbox-tagAnime-score'>
                                <button>School</button>
                                <button>School</button>
                                <button>School</button>
                            </div>
                        </div>
                        <div className='videoWrapper-container'>
                            <div className='videoWrapper'>
                                <iframe width="560" height="315" id="player" src={`${singleAnime[0].trailer}?autoplay=${isAutoPlay}&mute=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='anime-detail-container'>
                <div className='anime-detail'>
                    <h2>Detail</h2><br/>
                    <p>Anime: {singleAnime[0].name}</p><br/>
                    {singleAnime[0].seasonal?<>
                        <p>Episodes: {singleAnime[0].episodes}</p><br/>
                        <p>Seasonal: {singleAnime[0].seasonal}</p></>:
                    <p>Type: Movie</p>}<br/>
                    <p>Year: {singleAnime[0].year}</p><br/>
                    <p onClick={()=>navigate(`/studio/${singleAnime[0].id}`)}>Studio: {singleAnime[0].studios}</p><br/>
                    <p>Duration: {singleAnime[0].duration}</p>
                </div>
            </div>
            <SliderAnime tagAnime="From same studio" mode="studio" valueOfMode={singleAnime[0].studios}/>
        </div>
        )
}
export default SingleAnimePage;