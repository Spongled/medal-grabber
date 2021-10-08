import {combineReducers} from 'redux'
import clipObjectsReducer from './clipObjectsJSON'
import pathnameReducer from './pathnameReducer'

const allReducers = combineReducers({
  clipObjectsReducer,
  pathnameReducer
})

export default allReducers