import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { storePathname } from '../actions/actionsIndex.js'
import Header from './Header.js'

function Help() {
  const dispatch = useDispatch()
  const clipObjectsJSON = useSelector(state => state.clipObjectsJSONReducer)

  useEffect(() => {
    // Update Redux store of current URL for use in dynamic footer.
    const pathname = window.location.pathname
    dispatch(storePathname(pathname))
  })

  function dummyError(){
    throw new Error
  }

  return (
    <>
      <Header/>
      <div onDoubleClick={() => dummyError()}>
        Help screen
      </div>
      <div>
        {clipObjectsJSON}
      </div>
    </>
  )
}

export default Help
