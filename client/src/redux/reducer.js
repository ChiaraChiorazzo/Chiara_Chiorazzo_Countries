import {  GET_DETAIL, GET_COUNTRYBYNAME, GET_BYCONTINENT, GET_ACTIVITIES, GET_ALLCOUNTRIES } from './action-types'
const initialState = {
    countries: {},
    detail: {},
    activities:[],
    allCountries:[],
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
       
        case GET_DETAIL: {
            return {
                ...state,
                detail: action.payload
            }
        }
            
        case GET_COUNTRYBYNAME: {
            return {
                ...state,
                countries: action.payload,
            }
        }
        case GET_BYCONTINENT: {
            return {
                ...state,
                countries: action.payload
            }
        }
            case GET_ACTIVITIES: {
                return {
                    ...state,
                    activities: action.payload
                }
        }
        case GET_ALLCOUNTRIES: {
            return {
                ...state,
                allCountries: action.payload
            }
    }
        default:
            return { ...state }
                ;
    }
}