import axios from 'axios'
import { GET_DETAIL, GET_COUNTRYBYNAME, GET_ACTIVITIES, GET_ALLCOUNTRIES} from './action-types'


export const getCountrieDetail = (id) => {
    try {
        return async function (dispatch) {
            const response = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch({ type: GET_DETAIL, payload: response.data })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCountriesByQuery = (name, continent, activity, sort,page) => {
    try {
        return async function (dispatch) {
            const response = await axios.get(`http://localhost:3001/countries?activity=${activity || ""}&continent=${continent || ""}&name=${name || ""}&sort=${sort || ""}&page=${page || ""}`)

            return dispatch({ type: GET_COUNTRYBYNAME, payload: response.data })
        }
    } catch (error) {
       console.log(error)
    }

}
//action used when showing all the list of countries in the form 
export const getTotalityOfCountries = () => {
    try {
        return async function (dispatch) {
            const response = await axios.get("http://localhost:3001/countries/allcountries/all")
            return dispatch({ type: GET_ALLCOUNTRIES, payload: response.data })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getActivities = () => {
    try {
        return async function (dispatch) {
            const response = await axios.get("http://localhost:3001/activities")
            return dispatch({ type: GET_ACTIVITIES, payload: response.data })
        }
    } catch (error) {
        console.log(error)
    }
}

export const postActivity = (payload) => {
    try {
        return async function (dispatch) {
            const response = await axios.post('http://localhost:3001/activities', payload)
            return response
        }
    } catch (error) {
        console.log(error)
    }
}

