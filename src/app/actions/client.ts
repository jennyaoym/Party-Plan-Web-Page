import { createAction } from 'redux-actions';
import { PrivateClientModel } from 'app/models';
import { CorporateClientModel } from 'app/models';


export namespace ClientActions {
  export enum Type {
    ADD_PRIVATECLIENT = 'ADD_PRIVATECLIENT',
    EDIT_PRIVATECLIENT = 'EDIT_PRIVATECLIENT',
    DELETE_PRIVATECLIENT = 'DELETE_PRIVATECLIENT',
    LOAD_PRIVATECLIENT = 'LOAD_PRIVATECLIENT',
    CANCEL_EDIT_PRIVATECLIENT = 'CANCEL_EDIT_PRIVATECLIENT',
    ADD_CORPCLIENT = 'ADD_CORPCLIENT',
    EDIT_CORPCLIENT = 'EDIT_CORPCLIENT',
    DELETE_CORPCLIENT = 'DELETE_CORPCLIENT',
    LOAD_CORPCLIENT = 'LOAD_CORPCLIENT',
    CANCEL_EDIT_CORPCLIENT = 'CANCEL_EDIT_CORPCLIENT',
    SHOW_HIDE_CLIENT_DETAILS = 'SHOW_HIDE_CLIENT_DETAILS',
    SELECT_VIEW_CLIENT = 'SELECT_VIEW_CLIENT'
  }

  export const addPrivateClient = createAction(Type.ADD_PRIVATECLIENT);
  export const editPrivateClient = createAction<PrivateClientModel>(Type.EDIT_PRIVATECLIENT);
  export const deletePrivateClient = createAction<PrivateClientModel['ClientID']>(Type.DELETE_PRIVATECLIENT);
  export const loadPrivateClient = createAction<PrivateClientModel[]>(Type.LOAD_PRIVATECLIENT);
  export const cancelEditPrivateClient = createAction(Type.CANCEL_EDIT_PRIVATECLIENT);
  export const addCorporateClient = createAction(Type.ADD_CORPCLIENT);
  export const editCorporateClient = createAction<CorporateClientModel>(Type.EDIT_CORPCLIENT);
  export const deleteCorporateClient = createAction<CorporateClientModel['ClientID']>(Type.DELETE_CORPCLIENT);
  export const loadCorporateClient = createAction<CorporateClientModel[]>(Type.LOAD_CORPCLIENT);
  export const cancelEditCorporateClient = createAction(Type.CANCEL_EDIT_CORPCLIENT);
  export const showhideClientDetail = createAction<boolean>(Type.SHOW_HIDE_CLIENT_DETAILS);
  export const selectClient = createAction<any>(Type.SELECT_VIEW_CLIENT);

}

export type ClientActions = Omit<typeof ClientActions, 'Type'>;