import { TodoModel } from 'app/models';
import { SearchResultModel } from 'app/models';
import {SupplierModel, EventModel, PrivateClientModel, CorporateClientModel, VenueModel,
        FoodItemModel, DrinkItemModel, DecorItemModel, EntertainmentItemModel} from 'app/models';

export interface RootState {
  todos: RootState.TodoState;
  suppliers: RootState.SupplierState;
  eventstate: RootState.EventState;
  clientstate: RootState.ClientState;
  itemstate: RootState.ItemState;
  venuestate: RootState.VenueState;
  router?: any;
}

export namespace RootState {
  export type TodoState = TodoModel[];
  export type SearchResultState = SearchResultModel[];
  export type SupplierState = {
    editing: boolean,
    temp: SupplierModel,
    suppliers: SupplierModel[]
  };
  export type EventState = {
    events: EventModel[],
    selectedevent: EventModel,
    showhidedetails: boolean
  };
  export type ItemState = {
    food: FoodItemModel[],
    editingfood: boolean,
    tempfood: FoodItemModel,
    drink: DrinkItemModel[],
    editingdrink: boolean,
    tempdrink: DrinkItemModel,
    decor: DecorItemModel[],
    editingdecor: boolean,
    tempdecor: DecorItemModel,
    entertainment: EntertainmentItemModel[],
    editingenter: boolean,
    tempenter: EntertainmentItemModel
  };
  export type VenueState = {
    editing: boolean,
    temp: VenueModel,
    venues: VenueModel[]
  };

  export type ClientState = {
    editingpclient: boolean,
    temppclient: PrivateClientModel,
    privateclients: PrivateClientModel[],
    editingcclient: boolean,
    tempcclient: CorporateClientModel,
    corporateclients: CorporateClientModel[]
    showclientdetails: boolean;
    selectedclient?: any;
    selectedclienttype: string
  };

}
