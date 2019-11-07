import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ClientActions } from 'app/actions';
//import { PrivateClientModel } from 'app/models';
//import { CorporateClientModel } from 'app/models';


const initialState: RootState.ClientState = {editingpclient: false, editingcclient: false, privateclients: [], corporateclients: [], temppclient: {
    ClientID: 0,
    ClientName: "",
    Phone: "",
    Email: "",
    ContactMethod: "",
    AccountNum: "", 
    AccountType: "", 
    AccountName: "", 
    BillingAddr: ""

}, tempcclient: {
    ClientID: 0,
    CompanyName: "",
    ContactPerson: "",
    Phone: "",
    Email: "",
    ContactMethod: "",
    AccountNum: "", 
    AccountType: "", 
    AccountName: "", 
    BillingAddr: ""
},
showclientdetails: false,
selectedclienttype: "",
selectedclient: {}};

export const ClientReducer = handleActions<RootState.ClientState, any>(
  {
    [ClientActions.Type.SHOW_HIDE_CLIENT_DETAILS]: (state, action) => {
      const newState = Object.assign({},state);
      newState.showclientdetails = action.payload;
      return newState;
    },
    [ClientActions.Type.SELECT_VIEW_CLIENT]: (state, action) => {
      console.log(action.payload);
      const newState = Object.assign({},state);
      newState.selectedclient = action.payload.client;
      newState.selectedclienttype = action.payload.type;
      return newState;
    },
    [ClientActions.Type.DELETE_PRIVATECLIENT]: (state, action) => {
      return state;//.filter((todo) => todo.id !== (action.payload as any));
    },
    [ClientActions.Type.EDIT_PRIVATECLIENT]: (state, action) => {
      const newState = Object.assign({},state);
      newState.editingpclient = true;
      newState.temppclient = Object.assign({},action.payload);
      return newState;
    },
    [ClientActions.Type.LOAD_PRIVATECLIENT]: (state, action) => {
        const newState = Object.assign({},state)
        newState.privateclients = action.payload;
        newState.editingpclient = false;
        //console.log(state);
       return newState;
    },
    [ClientActions.Type.CANCEL_EDIT_PRIVATECLIENT]: (state, action) => {
      state.editingpclient = false;
      return state;
    },
    [ClientActions.Type.ADD_CORPCLIENT]: (state, action) => {
        return state;
      },
      [ClientActions.Type.DELETE_CORPCLIENT]: (state, action) => {
        return state;//.filter((todo) => todo.id !== (action.payload as any));
      },
      [ClientActions.Type.EDIT_CORPCLIENT]: (state, action) => {
        const newState = Object.assign({},state);
        newState.editingcclient = true;
        newState.tempcclient = Object.assign({},action.payload);
        return newState;
      },
      [ClientActions.Type.LOAD_CORPCLIENT]: (state, action) => {
          const newState = Object.assign({},state)
          newState.corporateclients = action.payload;
          newState.editingcclient = false;
          //console.log(state);
         return newState;
      },
      [ClientActions.Type.CANCEL_EDIT_CORPCLIENT]: (state, action) => {
        state.editingcclient = false;
        return state;
      }
  },
  initialState
);
