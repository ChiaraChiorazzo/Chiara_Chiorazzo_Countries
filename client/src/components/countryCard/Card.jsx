import React from "react";
import {Link} from 'react-router-dom'
import style from './card.module.css'

const Card = ({key, img, name, continent, id}) => {
return (
    <div className={style.container}>
        <img className={style.img} src={img} alt={name} />
        <hr />
        <h3 className={style.text}>name: {name.toUpperCase()}</h3>
        <h3 className={style.text}>continent: {continent.toUpperCase()}</h3>
        <Link to={`/countries/${id}`}><button className={style.button} >Show Me More</button></Link>
    </div>
)
}
export default Card