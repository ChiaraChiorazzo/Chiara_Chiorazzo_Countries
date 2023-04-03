import axios from 'axios'
import { GET_DETAIL, GET_COUNTRYBYNAME, GET_ACTIVITIES, GET_ALLCOUNTRIES } from './action-types'


export const getCountrieDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch({ type: GET_DETAIL, payload: response.data })
        }
        catch (error) {
            alert(error.response.data)
        }
    }
}

export const getCountriesByQuery = (name, continent, activity, sort, page) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/countries?activity=${activity || ""}&continent=${continent || ""}&name=${name || ""}&sort=${sort || ""}&page=${page || ""}`)

            return dispatch({ type: GET_COUNTRYBYNAME, payload: response.data })

        } catch (error) {
            alert(error.response.data)
        }
    }
}
//action used when showing all the list of countries in the form 
export const getTotalityOfCountries = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/countries/allcountries/all")
            return dispatch({ type: GET_ALLCOUNTRIES, payload: response.data })

        } catch (error) {
            alert(error.response.data)
        }
    }
}

export const getActivities = () => {

    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/activities")
            return dispatch({ type: GET_ACTIVITIES, payload: response.data })

        } catch (error) {
            console.log(error)
        }
    }
}

export const postActivity = (payload) => {

    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/activities', payload)
            console.log(response, "soy response")
            return response
        
        } catch (error) {
            alert(error.response.data)
        }
    }
}

