import './index.scss'
const SearchBar=()=>{

    return(
        <div className='searchBar'>
            <input 
                className='searchBar-input' 
                placeholder="ค้นหา"
                />
            <button 
                className='searchBar-button'
                >Go</button>
        </div>
    )
}
export default SearchBar