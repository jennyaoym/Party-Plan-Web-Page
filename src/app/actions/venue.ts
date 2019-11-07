import { createAction } from 'redux-actions';
import { VenueModel } from 'app/models';

export namespace VenueActions {
  export enum Type {
    ADD_VENUE = 'ADD_VENUE',
    EDIT_VENUE = 'EDIT_VENUE',
    DELETE_VENUE = 'DELETE_VENUE',
    LOAD_VENUE = 'LOAD_VENUE',
    CANCEL_EDIT = 'CANCEL_EDIT'
  }

  export const addVenue = createAction(Type.ADD_VENUE);
  export const editVenue = createAction<VenueModel>(Type.EDIT_VENUE);
  export const deleteVenue = createAction<VenueModel['VenueID']>(Type.DELETE_VENUE);
  export const loadVenue = createAction<VenueModel[]>(Type.LOAD_VENUE);
  export const cancelEdit = createAction(Type.CANCEL_EDIT);
}

export type VenueActions = Omit<typeof VenueActions, 'Type'>;