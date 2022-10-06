import './index.scss'
import React, {useState,useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddAnimeModal from '../AddAnimeModal';
import {useDispatch,useSelector} from 'react-redux'
import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'

const TableTopAnime=(props)=>{
    const {anime} = props
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const {user} =useSelector((state)=>state.auth)
    const [modalAnime,setModalAnime]=useState()
    const [open, setOpen] = useState(false);

    const handleOpen = (item) => {
        setModalAnime(item)
        setOpen(true);
    }
    const handleClose = () =>setOpen(false);

    useEffect(()=>{
        if(user){
            dispatch(fetchAnimeByAccountAsync(user.accounts_id))
        }
    },[user])
    const myAnimeList = useSelector(state => state.accountAnimeList)
    const nameOfMyAnimeList=myAnimeList.map((item)=>item.animes_name)
    return(
        <div className='container-table'>
            <table className='table-topanime'>
                <thead className='table-topanime-header'>
                   <tr>
                        <th className='table-header-10'>Rank</th>
                        <th className='table-header-20'>Anime</th>
                        <th>Detail</th>
                        <th className='table-header-10'>Studio</th>
                        <th className='table-header-10'>Score</th>
                        <th className='table-header-10'>Add to List</th>
                    </tr> 
                </thead>
                <tbody>
                {anime.map((anime,index)=>{
                   return <tr key={index} className='table-content-row'>
                    <td className='table-rank'>{index+1}</td>
                    <td>
                        <div className='card-anime-image' 
                            style={{backgroundImage:`url(${anime.animes_image})`}}
                            onClick={()=>navigate(`/anime/${anime.animes_id}`)}
                            >
                            {nameOfMyAnimeList.includes(anime.animes_name)?<h5>Watched</h5>:<></>}
                        </div>
                    </td>
                    <td className='card-anime-detail'>
                        <h2>{anime.animes_name}</h2> <br/>
                        Episodes: {anime.animes_episodes} <br/>
                        Season: {anime.animes_seasonal} <br/>
                        Year: {anime.animes_year}</td>
                    <td><h3>{anime.Studio}</h3></td>
                    <td><h3>{anime.animes_score}</h3></td>
                    <td><button className='table-content-button' onClick={()=>handleOpen(anime)}>Add to List</button></td>
                </tr> 
                })}
                </tbody>
            </table>
            <AddAnimeModal open={open} onClose={handleClose} anime={modalAnime}/>   
        </div>
    )
}
export default TableTopAnime;