import { createAction } from 'redux-actions';
import { FoodItemModel, DrinkItemModel, DecorItemModel, EntertainmentItemModel } from 'app/models';


export namespace ItemActions {
  export enum Type {
    ADD_FOOD = 'ADD_FOOD',
    EDIT_FOOD = 'EDIT_FOOD',
    DELETE_FOOD = 'DELETE_FOOD',
    LOAD_FOOD = 'LOAD_FOOD',
    CANCEL_EDIT_FOOD = 'CANCEL_EDIT_FOOD',

    ADD_DRINK = 'ADD_DRINK',
    EDIT_DRINK = 'EDIT_DRINK',
    DELETE_DRINK = 'DELETE_DRINK',
    LOAD_DRINK = 'LOAD_DRINK',
    CANCEL_EDIT_DRINK = 'CANCEL_EDIT_DRINK',

    ADD_DECOR = 'ADD_DECOR',
    EDIT_DECOR = 'EDIT_DECOR',
    DELETE_DECOR = 'DELETE_DECOR',
    LOAD_DECOR = 'LOAD_DECOR',
    CANCEL_EDIT_DECOR = 'CANCEL_EDIT_DECOR',

    ADD_ENTERTAINMENT = 'ADD_ENTERTAINMENT',
    EDIT_ENTERTAINMENT = 'EDIT_ENTERTAINMENT',
    DELETE_ENTERTAINMENT = 'DELETE_ENTERTAINMENT',
    LOAD_ENTERTAINMENT = 'LOAD_ENTERTAINMENT',
    CANCEL_EDIT_ENTERTAINMENT = 'CANCEL_EDIT_ENTERTAINMENT',
  }

  export const addFood = createAction(Type.ADD_FOOD);
  export const editFood = createAction<FoodItemModel>(Type.EDIT_FOOD);
  export const deleteFood = createAction<FoodItemModel['ItemID']>(Type.DELETE_FOOD);
  export const loadFood = createAction<FoodItemModel[]>(Type.LOAD_FOOD);
  export const cancelEditFood = createAction(Type.CANCEL_EDIT_FOOD);

  export const addDrink = createAction(Type.ADD_DRINK);
  export const editDrink = createAction<DrinkItemModel>(Type.EDIT_DRINK);
  export const deleteDrink = createAction<DrinkItemModel['ItemID']>(Type.DELETE_DRINK);
  export const loadDrink = createAction<DrinkItemModel[]>(Type.LOAD_DRINK);
  export const cancelEditDrink = createAction(Type.CANCEL_EDIT_DRINK);

  export const addDecor = createAction(Type.ADD_DECOR);
  export const editDecor = createAction<DecorItemModel>(Type.EDIT_DECOR);
  export const deleteDecor = createAction<DecorItemModel['ItemID']>(Type.DELETE_DECOR);
  export const loadDecor = createAction<DecorItemModel[]>(Type.LOAD_DECOR);
  export const cancelEditDecor = createAction(Type.CANCEL_EDIT_DECOR);

  export const addEntertainment = createAction(Type.ADD_ENTERTAINMENT);
  export const editEntertainment = createAction<EntertainmentItemModel>(Type.EDIT_ENTERTAINMENT);
  export const deleteEntertainment = createAction<EntertainmentItemModel['ItemID']>(Type.DELETE_ENTERTAINMENT);
  export const loadEntertainment = createAction<EntertainmentItemModel[]>(Type.LOAD_ENTERTAINMENT);
  export const cancelEditEntertainment = createAction(Type.CANCEL_EDIT_ENTERTAINMENT);
}

export type ItemActions = Omit<typeof ItemActions, 'Type'>;