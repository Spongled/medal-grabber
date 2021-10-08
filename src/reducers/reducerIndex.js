import {combineReducers} from 'redux'
import clipObjectsJSONReducer from './clipObjectsJSONReducer'
import pathnameReducer from './pathnameReducer'

const allReducers = combineReducers({
  clipObjectsJSONReducer,
  pathnameReducer
})

export default allReducers