import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { SupplierActions } from 'app/actions/supplier';
//import { SupplierModel } from 'app/models';


const initialState: RootState.SupplierState = {editing: false, suppliers: [], temp: {
  SupplierID: 0,
  SupplierName: "",
  SupplierType: "",
  ContactNum: "",
  EmailAddr: ""
}};

export const supplierReducer = handleActions<RootState.SupplierState, any>(
  {
    [SupplierActions.Type.ADD_SUPPLIER]: (state, action) => {
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
    [SupplierActions.Type.DELETE_SUPPLIER]: (state, action) => {
      return state;//.filter((todo) => todo.id !== (action.payload as any));
    },
    [SupplierActions.Type.EDIT_SUPPLIER]: (state, action) => {
      const newState = Object.assign({},state);
      newState.editing = true;
      newState.temp = Object.assign({},action.payload);
      return newState;
    },
    [SupplierActions.Type.LOAD_SUPPLIER]: (state, action) => {
        const newState = Object.assign({},state)
        newState.suppliers = action.payload;
        newState.editing = false;
        //console.log(state);
       return newState;
    },
    [SupplierActions.Type.CANCEL_EDIT]: (state, action) => {
      state.editing = false;
      return state;
    }
  },
  initialState
);