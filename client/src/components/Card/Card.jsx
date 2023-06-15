import style from './Card.module.css'
import {Link} from 'react-router-dom';
// 
const Card = ({ id, background_image, name, genres, rating }) => {
    return (
        <div className={style.maincontainer}>
            <Link className={style.cardLink} to={`/detail/${id}`}>
                <img className={style.imagen}  src={background_image} alt="" />            
            
            <div className={style.textos}>
                    <h2>NAME: {name}</h2>
                    <h2>GENRES: {genres.join(", ")}</h2>
                    <h2>RATING: {rating}</h2>
            </div>
            </Link>
        </div>
       
    )
}

export default Card