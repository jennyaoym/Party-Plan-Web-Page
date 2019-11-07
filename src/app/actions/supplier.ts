import { createAction } from 'redux-actions';
import { SupplierModel } from 'app/models';

export namespace SupplierActions {
  export enum Type {
    ADD_SUPPLIER = 'ADD_SUPPLIER',
    EDIT_SUPPLIER = 'EDIT_SUPPLIER',
    DELETE_SUPPLIER = 'DELETE_SUPPLIER',
    LOAD_SUPPLIER = 'LOAD_SUPPLIER',
    CANCEL_EDIT = 'CANCEL_EDIT'
  }

  export const addSupplier = createAction(Type.ADD_SUPPLIER);
  export const editSupplier = createAction<SupplierModel>(Type.EDIT_SUPPLIER);
  export const deleteSupplier = createAction<SupplierModel['SupplierID']>(Type.DELETE_SUPPLIER);
  export const loadSupplier = createAction<SupplierModel[]>(Type.LOAD_SUPPLIER);
  export const cancelEdit = createAction(Type.CANCEL_EDIT);
}

export type SupplierActions = Omit<typeof SupplierActions, 'Type'>;