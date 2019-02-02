import { UPDATE_FILE_STATUS } from '../ducks/data';
import {  } from '../ducks/ui';
import { formatFileForUI } from '../hc_api/file_handler'

const dataMiddleware = ( { dispatch, getState } ) => next => action => {
    switch (action.type) {
        case UPDATE_FILE_STATUS:
            // Make sure file is in good shape for UI
            action.payload = formatFileForUI(action.payload, getState().ui.location);
            return next(action);

        default:
            return next(action);
    }
}

export default dataMiddleware;