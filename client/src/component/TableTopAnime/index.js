import './index.scss'
import React, {useState,useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
const TableTopAnime=(props)=>{
    const {anime} = props
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
                {anime.map((anime,index)=>{
                   return <tr key={index} className='table-content-row'>
                    <td className='table-rank'>{index+1}</td>
                    <td><div className='card-anime'>
                    <Link to={`/anime/${anime.id}`}><img src={anime.image} alt="image"/></Link></div></td>
                    <td>Anime: {anime.name} <br/>
                        Episodes: {anime.episodes} <br/>
                        Season: {anime.seasonal} <br/>
                        Year: {anime.year}</td>
                    <td>{anime.studios}</td>
                    <td>{anime.score}</td>
                    <td><button className='table-content-button'>Add to List</button></td>
                </tr> 
                })}
                </tbody>
            </table>    
        </div>
    )
}
export default TableTopAnime;