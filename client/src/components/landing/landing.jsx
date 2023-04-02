
import { Link } from "react-router-dom"
import style from './landing.module.css'

const Landing = (props) => {
    return (
        <div className={style.container}>
            <Link className={style.text} to="/home"> <button className={style.button}>  Start </button></Link>
            <h2 className={style.title1}>APP</h2>
            <h1 className={style.title2}>COUNTRIES</h1>
            
        </div>
    )
}

export default Landing 