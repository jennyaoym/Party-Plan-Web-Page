import { createAction } from 'redux-actions';

export namespace SearchActions {
    /*
    export enum Type {
        SEARCH = 'SEARCH'
    }*/
    export const SEARCH = 'SEARCH';

    export const search = createAction(SEARCH);
}