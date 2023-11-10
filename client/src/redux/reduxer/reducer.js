import { GET_BY_NAME, GET_DRIVERS, GET_TEAMS, CHANGE_ORDER} from "../actions/actions";
import { orderArrayAscending, orderArrayDescending } from "../utils/utils";

let initialState = {
    allDrivers: [],
    allDriversCopy: [],
    allTeams: [],
    // order: "--Order--"
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
        // case CHANGE_ORDER:
        //     //Default
        //     if (action.payload == "--Order"){
        //         return{
        //             ...state,
        //             allDrivers: state.allDriversCopy,
        //             order: action.payload
        //         }
        //     }
        //     //Ascending
        //     if(action.payload == "Ascending"){
        //        const newArray = orderArrayAscending(state.allDrivers);
        //         return{
        //             ...state,
        //             allDrivers: newArray,
        //             order: action.payload
        //         }
        //     }
        //     //Descending
        //     if(action.payload == "Descending"){
        //         const newArray = orderArrayDescending(state.allDrivers);
        //          return{
        //              ...state,
        //              allDrivers: newArray,
        //              order: action.payload
        //          }
        //      }
        default:
            return state
    }
}

export default rootReducer;