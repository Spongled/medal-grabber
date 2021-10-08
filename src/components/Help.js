import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { storePathname } from '../actions/index.js'


function Help() {
  const dispatch = useDispatch()
  const clipObjectsJSON = useSelector(state => state.clipObjectsReducer)

  useEffect(() => {
    const pathname = window.location.pathname
    dispatch(storePathname(pathname))
  })

  function dummyError(){
    throw new Error
  }

  return (
    <>
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
