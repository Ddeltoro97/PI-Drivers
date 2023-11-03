import { GET_BY_NAME, GET_DRIVERS, GET_TEAMS } from "../actions/actions";

let initialState = {
    allDrivers: [],
    allDriversCopy: [],
    allTeams: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DRIVERS:
            return{
                ...state,
                allDrivers: action.payload,
                allDriversCopy: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                allDrivers: action.payload
            }    
        case GET_TEAMS:
            return{
                ...state,
                allTeams: action.payload
            }    
        default:
            return state
    }
}

export default rootReducer;