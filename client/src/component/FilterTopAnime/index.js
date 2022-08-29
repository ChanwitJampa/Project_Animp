import './index.scss'
import React, { Component, Fragment,useState,useEffect } from 'react';
import Select from 'react-select'
import Datastudio from '../../assets/studio.json'
const seasonOptions = [
  { value: 'Winter', label: 'Winter' },
  { value: 'Spring', label: 'Spring' },
  { value: 'Summer', label: 'Summer' },
  { value: 'Fall', label: 'Fall' }
]
const yearOption =[
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' }
]
const studioOptions=[]
const FilterTopAnime=(props)=>{
    const [state,setState]=useState({
        studio: "",
        season: "",
        year: "",
    })
    const [studio,setStudio]=useState("")
    const [season,setSeason]=useState("")
    const [year,setYear]=useState("")
    const onChangItem=name=>event=>{
        //setState({...state,[name]:event})
        //console.log(name+"="+event.value)
        if(name=="studio"){
            setStudio(event)
            props.studio(name,event.value)
        }else if(name=="season"){   
            setSeason(event)
            props.season(name,event.value)
        }else if(name=="year"){
            setYear(event)
            props.year(name,event.value)
        }
    }
    const clearValue=()=>{
        setStudio("")
        setSeason("")
        setYear("")
        props.isClear(true)
    }
    useEffect(()=>{
        Datastudio.forEach(e=>studioOptions.push({value:e.studio_name,label:e.studio_name}))
    })
    return(
        <div className="card-filter">
            <div className='card-filter-search'><h5>studio</h5>
                <Select
                    className="card-filter-search-select"
                    classNamePrefix="select"
                    name="studio"
                    value={studio}
                    options={studioOptions}
                    onChange={onChangItem("studio")}
                    />
            </div>
            <div className='card-filter-search'><h5>season</h5>
                <Select 
                    className="card-filter-search-select"
                    classNamePrefix="select"
                    name="season"
                    value={season}
                    options={seasonOptions}
                    onChange={onChangItem("season")}
                    />
            </div>
            <div className='card-filter-search'><h5>year</h5>
                <Select
                    className="card-filter-search-select" 
                    classNamePrefix="select"
                    name="year"
                    value={year}
                    options={yearOption} 
                    onChange={onChangItem("year")}
                    />
            </div>
            <div className='card-filter-search'><button className='card-filter-button-clear' onClick={clearValue}>Clear</button></div>
        </div>
    )
}
export default FilterTopAnime