import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getActivities, getCountriesByQuery } from '../../redux/actions'
import Card from '../countryCard/Card'
import search from '../../img/search.png'
import style from './home.module.css'
import SouthAmerica from '../../img/SouthAmerica.png';
import europe from '../../img/europe.png';
import northAmerica from '../../img/northAmerica.png';
import antarctica from '../../img/antarctica.png';
import africa from '../../img/africa.png';
import asia from '../../img/asia.png';
import oceania from '../../img/oceania.png';
import all from '../../img/all.png';


const Home = (props) => {
    const dispatch = useDispatch()
    //I save the Global E. in allCountries which is an object that contains countries, currentpage and totalpages
    const allCountries = useSelector((state) => state.countries)
    //I bring the activities in order to use them in the filter (array of objects)
    const allActivities = useSelector((state) => state.activities)
    //array with just the name of the activities 
    const activities = allActivities.map((act) => act.name)


    //From the global state i save the total of pages 
    const totalPages = allCountries.totalPages
    const TotalPagesArray = []
    for (let i = 1; i <= totalPages; i++) {
        TotalPagesArray.push(i)
    }


    const [queries, setQueries] = useState({
        name: "",
        continent: "",
        activity: "",
        sort: "",
        page: 1
    })

    //I will dispatch the actions that get all countries each time that I mount the component and when my local state queries change
    //I also dispatch the action that gets all the activities.
    useEffect(() => {
        dispatch(getCountriesByQuery(queries.name, queries.continent, queries.activity, queries.sort, queries.page))
        dispatch(getActivities())
    }, [dispatch, queries.name, queries.continent, queries.activity, queries.sort, queries.page])

    //Handler of the filter by continent
    const handleOnClick = (event) => {
        setQueries({ ...queries, continent: event.target.value, page: 1 })

    }
    //Handler of the searchbar 
    const handleInputChange = (event) => {
        event.preventDefault()
        setQueries({ ...queries, name: event.target.value, page: 1 })
    }
    //Handler of the filter by activity
    const handleOnChangeAct = (event) => {
        setQueries({ ...queries, activity: event.target.value, page: 1 })
    }

    //Handler of the sorter
    const handleOnChangeSort = (event) => {
        setQueries({ ...queries, sort: event.target.value })
    }

    //Handler of the clear button
    const handleOnclickClear = (event) => {
        setQueries({ ...queries, activity: "", name: "", continent: "", sort: "", page: "" })
    }

    //Handler of pagination
    const handleonClickPages = (event) => {
        setQueries({ ...queries, page: event.target.value })
    }


    return (
        <div>
            <div className={style.containerFilters}>

                {/* SEARCHBAR */}
                <div className={style.searchBarContainer}>
                    <input className={style.filter} type="search" name="searchCountry " value={queries.name} onChange={(event) => { handleInputChange(event) }} placeholder="Search your next destiny" />
                    <img className={style.searchBarImg} src={search} alt="searchbar icon" />
                </div>

                {/* FILTER BY ACTIVITY */}
                <select value={queries.activity} className={style.filter} id="ActivitiesList" onChange={handleOnChangeAct}>
                    <option value="All" >All Activities</option>
                    {
                        activities.map(act => {
                            return <option value={act}>{act}</option>
                        })
                    }         
                </select>

                        {/*SORTER FILTER  */}
                <select value={queries.sort} className={style.filter} id="SortList" onChange={handleOnChangeSort}>
                    <option value="None">Sort</option>
                    <option value="A-Z">Sort by Name (A-Z)</option>
                    <option value="Z-A">Sort by Name (Z-A)</option>
                    <option value="PopLow-High">Sort by Population (Low-High)</option>
                    <option value="PopHigh-Low">Sort by Population (High-Low)</option>
                </select>

                    {/* CLEARING BUTTON */}
                <button className={style.clearButton} onClick={handleOnclickClear} value="">CLEAR FILTERS</button>

            </div>
            
                <hr className={style.filtersSeparation} />

            <div className={style.pagsContainer}>

                    {/* PAGINATION*/}
                {
                    TotalPagesArray.map(p => {
                        return <button value={p} onClick={handleonClickPages} className={style.pagsButton}> {p} </button>
                    })
                }
            </div>

            {/* FILTER BY CONTINENT */}
            <div className={style.containerContAndCards}>
                <div className={style.containerContinents}>

                    <input className={style.continent} name="all" type="image" src={all} alt="all countries" onClick={handleOnClick} value=""></input>
                    <label htmlFor="all">
                        ALL COUNTRIES
                    </label>


                    <input className={style.continent} name="africa" type="image" src={africa} alt="Africa" onClick={handleOnClick} value="AFRICA"></input>
                    <label htmlFor="africa">
                        AFRICA
                    </label>

                    <input className={style.continent} name="asia" type="image" src={asia} alt="Asia" onClick={handleOnClick} value="ASIA"></input>
                    <label htmlFor="asia">
                        ASIA
                    </label>


                    <input className={style.continent} name="antarctica" type="image" src={antarctica} alt = "Antarctica" onClick={handleOnClick} value="ANTARCTICA"></input>
                    <label htmlFor="antarctica">
                        ANTARCTICA
                    </label>


                    <input className={style.continent} name="europe" type="image" src={europe} alt="Europe" onClick={handleOnClick} value="EUROPE"></input>
                    <label htmlFor="europe">
                        EUROPE
                    </label>


                    <input className={style.continent} name="northAmerica" type="image" src={northAmerica} alt="North America" onClick={handleOnClick} value="NORTH AMERICA"></input>
                    <label htmlFor="northAmerica">
                        NORTH AMERICA
                    </label>

                    <input className={style.continent} name="oceania" type="image" src={oceania} alt="Oceania" onClick={handleOnClick} value="OCEANIA"></input>
                    <label htmlFor="oceania">
                        OCEANIA
                    </label>

                    <input className={style.continent} name="southAmerica" type="image" src={SouthAmerica} alt="South America" onClick={handleOnClick} value="SOUTH AMERICA"></input>
                    <label htmlFor="southAmerica">
                        SOUTH AMERICA
                    </label>

                </div>

                {/* CARDS WITH INFORMATION */}
                <div className={style.cardsContainer}>
                    {
                        allCountries ? allCountries.countries?.map(country =>
                        (
                            <div key={country.id}>
                                <Card img={country.flag} name={country.name} continent={country.continent} id={country.id} />
                            </div>
                        )
                        )
                            : <h1>No countries to show</h1>
                    }

                </div>
            </div>


                {/* PAGINATION */}
        <div className={style.pagsContainer}>

                {
                    TotalPagesArray.map(p => {
                        return <button value={p} onClick={handleonClickPages} className={style.pagsButton}> {p} </button>
                    })
                }
        </div>
    </div>
    )
}

export default Home