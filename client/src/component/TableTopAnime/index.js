import './index.scss'
import React, {useState,useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddAnimeModal from '../AddAnimeModal';
import {useDispatch,useSelector} from 'react-redux'
const TableTopAnime=(props)=>{
    const {anime} = props
    const navigate = useNavigate();

    const [modalAnime,setModalAnime]=useState()
    const [open, setOpen] = useState(false);

    const handleOpen = (item) => {
        setModalAnime(item)
        setOpen(true);
    }
    const handleClose = () =>setOpen(false);

    const myAnimeList = useSelector(state => state.myAnimeList)
    const nameOfMyAnimeList=myAnimeList.map((item)=>item.name)
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
                            style={{backgroundImage:`url(${anime.image})`}}
                            onClick={()=>navigate(`/anime/${anime.id}`)}
                            >
                            {nameOfMyAnimeList.includes(anime.name)?<h5>Watched</h5>:<></>}
                        </div>
                    </td>
                    <td className='card-anime-detail'>
                        <h2>{anime.name}</h2> <br/>
                        Episodes: {anime.episodes} <br/>
                        Season: {anime.seasonal} <br/>
                        Year: {anime.year}</td>
                    <td><h3>{anime.studios}</h3></td>
                    <td><h3>{anime.score}</h3></td>
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