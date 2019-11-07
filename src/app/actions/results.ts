import { createAction } from 'redux-actions';
//import { SearchResultModel } from 'app/models';

export namespace SearchResultActions {
    
    const DISPLAY_DETAILS = 'DISPLAY_DETAILS'

    export const display = createAction(DISPLAY_DETAILS);
}