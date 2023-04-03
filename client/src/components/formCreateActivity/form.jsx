import { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalityOfCountries, postActivity } from '../../redux/actions'
import { validate } from './validation'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import style from './form.module.css'
import checklist from '../../img/checklist.gif'
import arrow from '../../img/arrow.png'
const Form = () => {
    const dispatch = useDispatch()
    //saving all the countries name in an array
    const countries = useSelector((state) => state.allCountries)
    const filtered = countries?.map((e) => e.name)
    //Used for save the input when choosing a country from the list
    const inputRef = useRef(null)
   

    //Used to go back to home once the activity is created
    const history = useHistory()
    //Local States: 
    const [newActivity, setNewActivity] = useState({
        name: "",
        dificulty: 0,
        duration: 0,
        season: "",
        country: [],
    })
    const [selectedCountries, setSelectedCountries] = useState([])
    const [errors, setErrors] = useState({})

    //Bringing the info of the countries that the user selected in order to show their flags
    const countriesSelectedInfo = countries?.filter(c => selectedCountries?.includes(c.name));


    //Dispatching the request for getting all the countries for the options list
    useEffect(() => {
        dispatch(getTotalityOfCountries())
        setNewActivity({ ...newActivity, country: selectedCountries })

    }, [dispatch, selectedCountries]
    )

    //handler for Adding countries when creating an activity
    const handleOnclick = (event) => {
        event.preventDefault()
        const selectedCountry = inputRef.current.value;
        if (!filtered.includes(selectedCountry)) { return alert("Please choose a valid country !"+ " " + '\ud83e\udd28') }
        if (selectedCountry && !selectedCountries.includes(selectedCountry)) {
            setSelectedCountries([...selectedCountries, selectedCountry])
            //I use country:selectedCountry instead of sending the array because in order to validate the error with one country is enought and otherwise if i send selectedcountries the state is "old" so nothing is recived and an error is throw although i have a country
            setErrors(validate({ ...newActivity, country: selectedCountry }))
        }
        inputRef.current.value = ""
    }

    //handler that saves the info in my local state when creating activity
    const handleInputChange = (event) => {
        const value = event.target.value
        const property = event.target.name
        setErrors(validate({ ...newActivity, [property]: value }))
        setNewActivity({ ...newActivity, [property]: value })
    }

    //handler that delete the country chosen when creating activity
    const handleOnClickFlag = (event) => {

        event.preventDefault()
        //if i delete all the countries that i've selected, i set my local state as an empty array so i dont have the value:undefined and i also do the validations again so i can show again the error countries must be selected.
        if (selectedCountries.length - 1 < 1) {
            setSelectedCountries([])

            setErrors(validate({ ...newActivity, country: [] }))
        }
        const updatedCountries = selectedCountries.filter((c) => c !== event.target.value)
        setSelectedCountries(updatedCountries)
    }

    const handlesubmit = (event) => {
        event.preventDefault()
        setErrors(validate({ ...newActivity, [event.target.name]: event.target.value }))
        const arrayErrors = Object.keys(errors)
        // check also if name exist so if you do no put anything at all in the inputs the error is also showed
        if (arrayErrors.length || !newActivity.name) {
            alert("Activity not created, check errors in the form"+ " " + '\ud83e\uddd0')
        } else {
            dispatch(postActivity(newActivity))
            alert("Congratulations, your activity has benn created !!" + " "+ '\ud83c\udf0d')
            setNewActivity({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                countries: []
            })
            history.push("/home")
        }
    }

    return (
        <div>
            <Link className={style.buttonLink} to="/home"><input type="image" src={arrow} alt="arrow to go back" className={style.button}></input></Link>
            <div className={style.titleContainer}>
                <h2 className={style.title}> CREATE YOUR ACTIVITY</h2>
                <img className={style.titleImg} src={checklist} alt="checklistGif" />

            </div>
            <form className={style.container} onSubmit={handlesubmit}>
                <div className={style.formContainer}>
                    <label className={style.label} htmlFor="name">Name: </label>
                    <input className={style.input} value={newActivity.name} type="text" name='name' onChange={handleInputChange} />
                    <p>{errors.name}</p>
                    <br />

                    <label className={style.label} htmlFor='dificulty'>Choose difficulty: </label>
                    <input className={style.input} value={newActivity.dificulty} type="range" min="0" max="5" step="1" name="dificulty" onChange={handleInputChange} />
                    <p>{errors.dificulty}</p>
                    <br />

                    <label className={style.label} htmlFor="duration">Duration: </label>
                    <input className={style.input} value={newActivity.duration} type="number" min='0' max="24" name='duration' placeholder='Horas' onChange={handleInputChange} />
                    <p>{errors.duration}</p>
                    <br />

                    <label className={style.label} htmlFor="season">Season: </label>
                    <select className={style.select} value={newActivity.season} name="season" id="" onChange={handleInputChange}>
                        <option value="" hidden></option>
                        <option value="verano">Summer</option>
                        <option value="otoño">Autumn</option>
                        <option value="invierno">Winter</option>
                        <option value="primavera">Spring</option>
                    </select>
                    <p>{errors.season}</p>
                    <br />

                    <label className={style.label} htmlFor='countries'>¿In which countries?</label>
                    <div className={style.countries}>
                        <input className={style.input} name="countries" id="countries" list="dataList" ref={inputRef} />
                        <datalist id="dataList">
                            {
                                filtered?.map((country) => {
                                    return <option value={country}></option>

                                }
                                )
                            }
                        </datalist>
                        <button className={style.buttonAdd} onClick={handleOnclick} >ADD</button>
                    </div>
                    <p>{errors.country}</p>

                    <div className={style.containerFlags}>
                        {
                            countriesSelectedInfo?.map(country => {
                                return <>
                                    <div className={style.containerNameFlag}>

                                        <img className={style.imgF} src={country.flag} alt={country.name} />
                                        <p className={style.flagName}>{country.id}</p>
                                        <button value={country.name} className={style.flagButton} onClick={handleOnClickFlag}>X</button>

                                    </div>
                                </>
                            })

                        }
                    </div>
                    <input className={style.buttonCreateAct} type="submit" value="Add Activity" />
                </div>
            </form>

        </div>
    )
}

export default Form