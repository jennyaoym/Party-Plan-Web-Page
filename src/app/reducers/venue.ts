import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { VenueActions } from 'app/actions/venue';
//import { VenueModel } from 'app/models';


const initialState: RootState.VenueState = {editing: false, venues: [], temp: {
    VenueID: 0,
    LocationName: "",
    Address: "",
    Capacity: 0,
    VenueType: "",
    Price: 0
}};

export const venueReducer = handleActions<RootState.VenueState, any>(
  {
    [VenueActions.Type.ADD_VENUE]: (state, action) => {
      /*if (action.payload && action.payload.text) {
        return [
          {
            id: state.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
            completed: false,
            text: action.payload.text
          },
          ...state
        ];
      }*/
      return state;
    },
    [VenueActions.Type.DELETE_VENUE]: (state, action) => {
      return state;//.filter((todo) => todo.id !== (action.payload as any));
    },
    [VenueActions.Type.EDIT_VENUE]: (state, action) => {
      const newState = Object.assign({},state);
      newState.editing = true;
      newState.temp = Object.assign({},action.payload);
      return newState;
    },
    [VenueActions.Type.LOAD_VENUE]: (state, action) => {
        const newState = Object.assign({},state)
        newState.venues = action.payload;
        newState.editing = false;
        //console.log(state);
       return newState;
    },
    [VenueActions.Type.CANCEL_EDIT]: (state, action) => {
      state.editing = false;
      return state;
    }
  },
  initialState
);