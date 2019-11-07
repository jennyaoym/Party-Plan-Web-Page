import { createAction } from 'redux-actions';
import { EventModel, OrderModel} from 'app/models';

export namespace EventActions {
  export enum Type {
    LOAD_ORDERS = 'LOAD_ORDERS',
    LOAD_EVENT = 'LOAD_EVENT',
    VIEW_EVENT_DETAILS = 'VIEW_EVENT_DETAILS',
    SHOW_HIDE_DETAILS = 'SHOE_HIDE_DETAILS'
  }

  export const viewEvent = createAction<EventModel['EventID']>(Type.VIEW_EVENT_DETAILS);
  export const loadEvent = createAction<EventModel[]>(Type.LOAD_EVENT);
  export const loadOrders = createAction<OrderModel[]>(Type.LOAD_ORDERS);
  export const showhideDetails = createAction<boolean>(Type.SHOW_HIDE_DETAILS);
}

export type EventActions = Omit<typeof EventActions, 'Type'>;