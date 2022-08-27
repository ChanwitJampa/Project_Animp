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
const FilterTopAnime=()=>{
    const [state,setState]=useState({
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
    })
    useEffect(()=>{
        Datastudio.forEach(e=>studioOptions.push({label:e.studio_name}))
    })
    return(
        <div className="card-filter">
            <div className='card-filter-search'><h5>search</h5>
                <input/>
            </div>
            <div className='card-filter-search'><h5>studio</h5>
                <Select
                    className="card-filter-search-select"
                    classNamePrefix="select"
                    defaultValue={studioOptions[0]}
                    isDisabled={state.isDisabled}
                    isLoading={state.isLoading}
                    isClearable={state.isClearable}
                    isRtl={state.isRtl}
                    isSearchable={state.isSearchable}
                    name="color"
                    options={studioOptions}
            />
            </div>
            <div className='card-filter-search'><h5>season</h5>
                <Select 
                    className="card-filter-search-select"
                    isClearable={true}
                    options={seasonOptions} />
            </div>
            <div className='card-filter-search'><h5>year</h5>
                <Select
                    className="card-filter-search-select" 
                    isClearable={true}
                    options={yearOption} />
            </div>
            <div className='card-filter-search'><button className='card-filter-button-search'>Search</button></div>
            <div className='card-filter-search'><button className='card-filter-button-clear'>Clear</button></div>
        </div>
    )
}
export default FilterTopAnime