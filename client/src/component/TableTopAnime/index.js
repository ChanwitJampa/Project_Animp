import './index.scss'
import Dataanime from '../../assets/anime.json'
import React, {useState,useEffect } from 'react';
const TableTopAnime=()=>{
    const [animeList,setAnimeList]=useState([]);
    useEffect(()=>{
        setAnimeList(Dataanime)
    })
    console.log(animeList)
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
                        <th className='table-header-10'>Watched</th>
                    </tr> 
                </thead>
                <tbody>
                {animeList.map((anime,index)=>{
                   return <tr key={index} className='table-content-row'>
                    <td>{index+1}</td>
                    <td>{anime.name}</td>
                    <td>Episodes: {anime.episodes} <br/>
                        Season: {anime.seasonal} <br/>
                        Year: {anime.year}</td>
                    <td>{anime.studios}</td>
                    <td>-</td>
                    <td><button className='table-content-button'>Add to List</button></td>
                </tr> 
                })}
                </tbody>
            </table>    
        </div>
    )
}
export default TableTopAnime;