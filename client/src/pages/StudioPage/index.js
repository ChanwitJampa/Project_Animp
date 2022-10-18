import './index.scss'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import {fetchStduioAsync} from '../../actions/studioAction'

const StudioPage=()=>{
    const navigate =useNavigate()
    const dispatch=useDispatch()
    const DataStudio = useSelector(state => state.stduioList)
    useEffect(()=>{
        dispatch(fetchStduioAsync())
    },[])
    return(<div className="studiopage-container">
        <h1 className="studiopage-header">Studio</h1>
        <div className='studiopage-container-table'>
            <table className='studiopage-table'>
                <thead className='studiopage-table-header'>
                   <tr>
                        <th className='table-header-10'>Number</th>
                        <th className='table-header-20'>Studio</th>
                        <th>Name</th>
                        <th className='table-header-10'>Established</th>
                        <th className='table-header-10'>Donate</th>
                        <th className='table-header-10'>Detail</th>
                    </tr> 
                </thead>
                <tbody>
                    {DataStudio.map((studio,index)=>{
                        return (<tr key={index} className='table-content-row'>
                            <td className='table-rank'>{index+1}</td>
                            <td><div 
                            className='studiopage-table-image' 
                            style={{backgroundImage:`url(https://cdn.myanimelist.net/images/company/${studio.studioes_logo})`}}
                            onClick={()=>navigate(`/studio/${studio.studioes_name}`)}></div></td>
                            <td><h1>{studio.studioes_name}</h1></td>
                            <td>{studio.studioes_established}</td>
                            <td><button className='table-content-button'>Donate</button></td>
                            <td><button className='table-content-button' onClick={()=>navigate(`/studio/${studio.studioes_name}`)}>Detail</button></td>
                        </tr>)
                    })}
                </tbody>
                </table>
                </div>
    </div>)
}
export default StudioPage