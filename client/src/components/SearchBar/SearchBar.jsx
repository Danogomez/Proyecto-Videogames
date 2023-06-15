import style from './SearchBar.module.css';
import { useDispatch } from "react-redux";
import { useState, } from "react";
import { getAllGames, searchBar } from "../../redux/actions";



const SearchBar = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    


    const handleSearch = (event) => {
        // event.preventDefault();
        setName(event.target.value)
    };

    const dispatchName = (e) => {
        e.preventDefault()
    dispatch(searchBar(name))
        setName("");   
        // setCurrentPage(1)  
    };

    const showAll = e => {
        dispatch(getAllGames())
    }

    return (
        <div>
            <form >
                <input 
                type="text" 
                placeholder="Find by name"
                onChange={handleSearch}
                value ={name}
                />
                <button onClick={(e)=> dispatchName(e)}>SEARCH</button>
                <button onClick={e=>showAll(e)}>RESET FILTERS</button>
            </form>

        </div>
    )
}

export default SearchBar;