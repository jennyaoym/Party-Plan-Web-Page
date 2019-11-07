import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { EventActions } from 'app/actions/Event';
//import { EventModel } from 'app/models';
const defaultevent = {
    EventID: 0,
    Date : "",
    InviteeNum: 0,
    Budget: 0,
    VenueID: 0,
    VenueName: "",
    ClientID: 0,
    ClientName: "",
    EventType: "",
    EmpID: 0,
    ManagerName: "",
    OrderValue: 0,
    Orders: []
}

const initialState: RootState.EventState = {events: [], selectedevent: defaultevent, showhidedetails: false};

export const eventReducer = handleActions<RootState.EventState, any>(
  {
    [EventActions.Type.LOAD_ORDERS]: (state, action) => {
        const newState = Object.assign({},state);
        newState.selectedevent.Orders = action.payload
        return newState;
    },
    [EventActions.Type.VIEW_EVENT_DETAILS]: (state, action) => {
      const newState = Object.assign({},state);
      const event = newState.events.find((e)=>(
          e.EventID === action.payload
      ));
      newState.selectedevent = event? event:defaultevent
      return newState;
    },
    [EventActions.Type.LOAD_EVENT]: (state, action) => {
        const newState = Object.assign({},state)
        newState.events = action.payload;
        //console.log(state);
       return newState;
    },
    [EventActions.Type.SHOW_HIDE_DETAILS]: (state, action) => {
      const newState = Object.assign({},state)
      newState.showhidedetails = action.payload;
      return newState;
    }
  },
  initialState
);