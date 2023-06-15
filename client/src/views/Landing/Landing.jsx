// solo un boton para ir a /home...
import style from './Landing.module.css';
import { Link } from "react-router-dom";


const Landing = ()=> {

    return(
      <div className={style.landing}>

      <div className={style.containerButton}>
             
      <Link to="/home">            
            <button>START GAME</button>
      </Link>
      
      </div>
     
      
      </div>)
};

export default Landing;