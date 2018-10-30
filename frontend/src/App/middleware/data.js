import {  } from '../ducks/data';
import {  } from '../ducks/ui';

const dataMiddleware = ( { dispatch, getState } ) => next => action => {
    switch (action.type) {
        case 'example':
            return next(action);

        default:
            return next(action);
    }
}

export default dataMiddleware;