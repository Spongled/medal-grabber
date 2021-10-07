const clipObjectsReducer = (state = null, action) => {
    switch(action.type){
        case 'STORE OBJECTS':
            return action.payload
        default: 
            return state
    }
}

export default clipObjectsReducer