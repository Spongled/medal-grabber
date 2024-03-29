import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './reducers/reducerIndex.js'

const store = createStore
  (
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
