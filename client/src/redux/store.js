import Reducer from './reducer' 
import {createStore} from 'redux'
import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'

const store = createStore( Reducer, applyMiddleware(thunk))

export default store