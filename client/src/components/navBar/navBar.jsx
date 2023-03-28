import style from './navBar.module.css'
import { Link } from 'react-router-dom'
import buttonHome from '../../img/buttonHome.png'

const navBar = (props) => {
    return (
        <div className={style.container}>
           <Link to="/"> <img src={buttonHome} alt="Home Button" className={style.homeButton}/></Link>

            <ul className={style.listContainer}>
            <Link to="/createActivity" className={style.listItem}>  <li className={style.listItem}>Create Activity</li></Link>
                <Link to="/home" className={style.listItem}>  <li className={style.listItem}>All Countries</li></Link>
            </ul>
        
        </div>
    )
}
export default navBar 