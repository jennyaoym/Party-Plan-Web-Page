import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ItemActions } from 'app/actions';
//import { PrivateClientModel } from 'app/models';
//import { CorporateClientModel } from 'app/models';


const initialState: RootState.ItemState = {editingfood: false, editingdrink: false, editingdecor: false, editingenter: false, food: [], drink: [], decor: [], entertainment: [], tempfood: {
    ItemID: 0,
    ItemName: "",
    UnitPrice: 0,
    SupplierID: 0, 
    ServingTemp: "", 
    IsVegetarian: 0,
    SpicyLevel: 0
}, tempdrink: {
    ItemID: 0,
    ItemName: "",
    UnitPrice: 0,
    SupplierID: 0, 
    ServingTemp: "", 
    AlcoholLevel: 0
}, tempdecor: {
    ItemID: 0, 
    ItemName: "", 
    UnitPrice: 0, 
    SupplierID: 0, 
    DecorType: ""
}, tempenter: {
    ItemID: 0, 
    ItemName: "", 
    UnitPrice: 0, 
    SupplierID: 0, 
    EntertainmentType: ""
}};

export const itemReducer = handleActions<RootState.ItemState, any>(
  {
    // Food
    [ItemActions.Type.ADD_FOOD]: (state, action) => {
      return state;
    },
    [ItemActions.Type.DELETE_FOOD]: (state, action) => {
      return state;//.filter((todo) => todo.id !== (action.payload as any));
    },
    [ItemActions.Type.EDIT_FOOD]: (state, action) => {
      const newState = Object.assign({},state);
      newState.editingfood = true;
      newState.tempfood = Object.assign({},action.payload);
      return newState;
    },
    [ItemActions.Type.LOAD_FOOD]: (state, action) => {
        const newState = Object.assign({},state)
        newState.food = action.payload;
        newState.editingfood = false;
        //console.log(state);
       return newState;
    },
    [ItemActions.Type.CANCEL_EDIT_FOOD]: (state, action) => {
      state.editingfood = false;
      return state;
    },

    // Drink
    [ItemActions.Type.ADD_DRINK]: (state, action) => {
        return state;
      },
      [ItemActions.Type.DELETE_DRINK]: (state, action) => {
        return state;//.filter((todo) => todo.id !== (action.payload as any));
      },
      [ItemActions.Type.EDIT_DRINK]: (state, action) => {
        const newState = Object.assign({},state);
        newState.editingdrink = true;
        newState.tempdrink = Object.assign({},action.payload);
        return newState;
      },
      [ItemActions.Type.LOAD_DRINK]: (state, action) => {
          const newState = Object.assign({},state)
          newState.drink = action.payload;
          newState.editingdrink = false;
          //console.log(state);
         return newState;
      },
      [ItemActions.Type.CANCEL_EDIT_DRINK]: (state, action) => {
        state.editingdrink = false;
        return state;
      },

      // Decor
      [ItemActions.Type.ADD_DECOR]: (state, action) => {
        return state;
      },
      [ItemActions.Type.DELETE_DECOR]: (state, action) => {
        return state;//.filter((todo) => todo.id !== (action.payload as any));
      },
      [ItemActions.Type.EDIT_DECOR]: (state, action) => {
        const newState = Object.assign({},state);
        newState.editingdecor = true;
        newState.tempdecor = Object.assign({},action.payload);
        return newState;
      },
      [ItemActions.Type.LOAD_DECOR]: (state, action) => {
          const newState = Object.assign({},state)
          newState.decor = action.payload;
          newState.editingdecor = false;
          //console.log(state);
         return newState;
      },
      [ItemActions.Type.CANCEL_EDIT_DECOR]: (state, action) => {
        state.editingdecor = false;
        return state;
      },

      // Entertainment
      [ItemActions.Type.ADD_ENTERTAINMENT]: (state, action) => {
        return state;
      },
      [ItemActions.Type.DELETE_ENTERTAINMENT]: (state, action) => {
        return state;//.filter((todo) => todo.id !== (action.payload as any));
      },
      [ItemActions.Type.EDIT_ENTERTAINMENT]: (state, action) => {
        const newState = Object.assign({},state);
        newState.editingenter = true;
        newState.tempenter = Object.assign({},action.payload);
        return newState;
      },
      [ItemActions.Type.LOAD_ENTERTAINMENT]: (state, action) => {
          const newState = Object.assign({},state)
          newState.entertainment = action.payload;
          newState.editingenter = false;
          //console.log(state);
         return newState;
      },
      [ItemActions.Type.CANCEL_EDIT_ENTERTAINMENT]: (state, action) => {
        state.editingenter = false;
        return state;
      }
  },
  initialState
);
