const clipObjectsJSONReducer = (state = null, action) => {
  switch(action.type){
    case 'STORE JSON':
      return action.payload
    default: 
      return state
  }
}

export default clipObjectsJSONReducer