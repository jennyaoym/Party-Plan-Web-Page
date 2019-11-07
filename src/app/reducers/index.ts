import { combineReducers } from 'redux';
import { RootState } from './state';
import { todoReducer } from './todos';
import {supplierReducer} from './supplier';
import {venueReducer} from './venue';
import {ClientReducer} from './client';
import { eventReducer } from './event';
import { itemReducer } from './item';
export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  todos: todoReducer as any,
  suppliers: supplierReducer as any,
  venuestate: venueReducer as any,
  clientstate: ClientReducer as any,
  eventstate: eventReducer as any,
  itemstate: itemReducer as any
});
