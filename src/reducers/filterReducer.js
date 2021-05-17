// import C from '../config/constants'

export function filterReducer(state, action){
    switch (action.type) { 
      case "SET_FILTER_DATATYPE":
        return { ...state, dataType: action.dataType }
      case "RESET_FILTER_DATATYPE":
        return { ...state, dataType: [] }
      default:
      //   throw new Error('Unnexpected action')
        return state
    }
} 