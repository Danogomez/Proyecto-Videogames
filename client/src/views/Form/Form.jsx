import { useEffect, useState } from 'react';
import style from './Form.module.css';
// import ValidationForm from './ValidationForm' 
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGenres } from '../../redux/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Form = ()=> {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getGenres());
    }, [dispatch]) 

    let platforms = [
        "PC",
        "PlayStation",
        "Xbox",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo",
        "PS Vita",
        "PSP",
        "Wii",
        "GameCube",
        "Game Boy",
        "SNES",
        "NES",
        "Commodore",
        "Atari",
        "Genesis",
        "SEGA",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
        "PS5",
        "PS4",
        "PS3",
        "PS2",
        "PS1",
      ];

      const genres = useSelector((state)=> state.genres)
      const videogames = useSelector((state)=> state.videogames); 



    const [dataGame, setDataGame] = useState({
        name: '',
        background_image: '',
        description: '',
        platforms: [],
        released: '',
        rating: 0,
        genre: [] ,
    })

    // estado local de selects.. genres y platform
    const [valueSelect, setValueSelect] = useState("0");

    // estado local validador
    const [validate, setValidate] = useState("");

    // HANDLES

    const handleSubmit = async(event)=>{
        event.preventDefault();

        if(dataGame.name.trim === "" || dataGame.name.length < 2) setValidate("Minimun 2 characters are required");
        if(dataGame.released === "") setValidate('Release date required');
        if(dataGame.description.trim() === "") setValidate("Description required");
        if(dataGame.rating === 0) setValidate("Rating must be grather than 0");
        if(dataGame.background_image === "") setValidate("Insert URL image");
        if(dataGame.platforms.length === 0) setValidate ("One or more platforms are required");
        if(dataGame.genre.length === 0) {
            setValidate("One or more genres are required")
        } else {   

    const postGame = await axios.post("http://localhost:3001/videogames", dataGame)

        setValidate("");
        setDataGame({
            name: '',
            background_image: '',
            description: '',
            released: '',
            rating: 0,
            platforms: [],
            genre: [] ,
        })
        dispatch(getAllGames());
        alert(postGame.data.message);
        }        
    };
        
    const handleChange = (e) => {
        e.preventDefault()
        setDataGame({
            ...dataGame,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckGenres = (e) => {
        e.preventDefault();
        if (e.target.value) {
          setDataGame({ ...dataGame, genre: [...dataGame.genre, e.target.value] });
        }
      };

      const handleClickGenres = (e) => {
        e.preventDefault();
        setDataGame({
          ...dataGame,
          genre: dataGame.genre.filter((plant) => plant !== e.target.value),
        });
      };

    const handleClickPlatforms = (e) => {
        e.preventDefault()
        setDataGame({
            ...dataGame,
            platforms: dataGame.platforms.filter((p)=> p !== e.target.value)
        });
    };
    const handleCheckPlatforms = (e) => {
        e.preventDefault();
        if (e.target.value) {
          setDataGame({ ...dataGame, platforms: [...dataGame.platforms, e.target.value] });
        }
        setValueSelect("0");
      };


    // HANDLES


    return (
    <div>
        <Link to="/home">
            <a  className={style.a} href="#"><span >BACK HOME</span><i></i></a>
          </Link>
        {validate && <div>{validate}</div>}
        <form onSubmit={handleSubmit}  className={style.container}>
            <div>
                {/* <label>Name: </label> */}
                <input 
                type="text" 
                placeholder="NAME VIDEOGAME"
                name="name"
                value={dataGame.name} 
                onChange={(e)=> handleChange(e)}
            />
            </div>
            <div>
                <label>RELEASED DATE: </label>
                <input 
                type="date" 
                onChange={(e) => handleChange(e)}
                name="released"
                value={dataGame.released}
            />
            </div>

            <div>
                <textarea
                value={dataGame.description}
                // className={style.input}
                type="text"
                name="description"
                id=""
                cols="30"
                rows="5"
                placeholder="VIDEOGAME DESCRIPTION" 
                onChange={(e) => handleChange(e)}
                ></textarea>
            </div>
            
            <div>
                <select
                    onChange={handleCheckPlatforms}
                    // className={style.option}
                    value={valueSelect}
                    id="1"
                >                 
                <option disabled value = "0">
                        PLATFORMS
                 </option>
                {platforms.map((e,index) => {
                    return (
                        <option key={index} value={e}>
                            {e}
                        </option>
                    );
                    })}
                </select>
                <div>
                    {dataGame.platforms.map((e, index) => {
                    return (
                        <button
                        // className={style.buttonSelect}
                        onClick={handleClickPlatforms}
                        key={index}
                        value={e}
                        >
                        {e}
                        </button>
                    );
                    })}
                </div>
            </div>

            <div>
                <label for="rating">RATING: </label>
                <input 
                type="range"
                min="0"
                max="5"
                name="rating"
                value={dataGame.rating}
                step="0.1"
                onChange={(e) => setDataGame({...dataGame, rating: e.target.value})}
                />
                <output id="rangevalue">
                    {dataGame.rating}
                </output>
            </div>
            
            <div>
                <input
                value={dataGame.background_image}
                type="text"
                placeholder='VIDEOGAME IMAGE'
                name="background_image"
                onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <select
                name="genre"
                value={valueSelect}
                onChange={handleCheckGenres}
                >                 
                    <option disabled value = "0">
                        GENRES
                    </option>
                    {genres.map((e,index) => {
                        return (
                            <option key={index} value={e}>
                                {e}
                            </option>
                        );
                    })}
                </select>

            <div>
                {dataGame.genre.map((e, index) => {
                return (
                    <button
                    // className={style.buttonSelect}
                    onClick={handleClickGenres}
                    key={index}
                    value={e}
                    >
                    {e}
                    </button>
                    );
                })}
            </div>
            </div>
            <button type="submit" >CREATE</button>
        </form>
    </div>  
    );
};

export default Form;