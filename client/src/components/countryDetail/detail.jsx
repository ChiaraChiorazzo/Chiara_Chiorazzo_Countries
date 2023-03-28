import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getCountrieDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from './detail.module.css'
import arrow from '../../img/arrow.png'

const CountryDetail = (props) => {

    const dispatch = useDispatch()
    const countryDetail = useSelector((state) => state.detail)
    const id = useParams()

    //Each time the component mount and/or the id received by params changes i dispatch the action 
    useEffect(() => {
        dispatch(getCountrieDetail(id.id))
    }, [dispatch, id])
    
    return (
    <div className={style.container} >
        <Link className={style.buttonLink} to="/home"><input type="image" src={arrow} className={style.button}></input></Link>
        <div className={style.card}>
            <img className={style.img}src={countryDetail.flag} alt={countryDetail.name} />
            <hr />
            <h4 className={style.text}>name: {countryDetail.name?.toUpperCase()}</h4>
            <h4 className={style.text}>id: {countryDetail.id?.toUpperCase()}</h4>
            <h4 className={style.text}>continent: {countryDetail.continent?.toUpperCase()}</h4>
            <h4 className={style.text}>capital: {countryDetail.capital?.toUpperCase()}</h4>
            <h4 className={style.text}>subregion: {countryDetail.subregion ? countryDetail.subregion?.toUpperCase() : "N/A"}</h4>
            <h4 className={style.text}>area: {countryDetail.area ? countryDetail.area?.toLocaleString('es-ES') : "N/A"} km²</h4>
            <h4 className={style.text}>population: {countryDetail.population?.toLocaleString('es-ES')} habs</h4>
    
        </div>
        <h4  className={style.titleActiv}>ACTIVITIES: </h4>
        <div className={style.containerActivities}>
            {
                    countryDetail.activities?.map((act) => {
                        return <div className={style.activityContainer}>
                        
                            <h3>{act.name?.toUpperCase()}</h3>
                            <h6>difficulty: {act.dificulty}</h6>
                            <h6>duration: {act.duration} HOURS</h6>
                            <h6>season: {act.season?.toUpperCase()}</h6>
                        
                        </div>
                    })
            }
           
            
        </div>
        </div>
    )
}
export default CountryDetail 