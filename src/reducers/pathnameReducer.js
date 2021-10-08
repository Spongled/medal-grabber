const pathnameReducer = (state = '/', action) => {
  switch(action.type){
    case 'STORE PATHNAME':
      return action.payload
    default: 
      return state
  }
}

export default pathnameReducer