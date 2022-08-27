import './index.scss'
const FilterTopAnime=()=>{
    return(
        <div className="card-filter">
            <div className='card-filter-search'><h5>search</h5><input/></div>
            <div className='card-filter-search'><h5>studio</h5>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select></div>
            <div className='card-filter-search'><h5>season</h5><select name="cars" id="cars">
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                </select></div>
            <div className='card-filter-search'><h5>year</h5><select name="cars" id="cars">
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select></div>
            <div className='card-filter-search'><button className='card-filter-button-search'>Search</button></div>
            <div className='card-filter-search'><button className='card-filter-button-clear'>Clear</button></div>
        </div>
    )
}
export default FilterTopAnime