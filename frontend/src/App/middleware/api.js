import { UPLOAD_FILE, UPDATE_FILE_STATUS, ADD_NEW_FILES, POLL_SERVER } from '../ducks/data';
import { INIT_UI, CHANGE_MODAL } from '../ducks/ui';
import { uploadFile, getAllFiles } from '../hc_api/hc_api';
import { createMeta, getBase64 } from '../hc_api/file_handler';

const apiMiddleware = ( {dispatch} ) => next => action => {
    switch (action.type) {
        case INIT_UI:
        case POLL_SERVER:
            getAllFiles()
                // on receive emit ADD_NEW_FILES 
                .then(r => {
                    dispatch({
                        type: ADD_NEW_FILES, 
                        payload: r 
                    })
                })
                // Catch any errors 
                .catch(e => {
                    dispatch({type: CHANGE_MODAL, payload: {
                        isShowing: true,
                        error: true,
                        text: "Can't connect to the server"
                    }});
                    console.log(e);
                });       
            return next(action);

        case UPLOAD_FILE:
            // Reject empty upload
            if (!action.payload.path) return;

            // Create metadata from js File object
            let meta = createMeta(action.payload);

            // Unleash getBase64
            // and uploadFile chain
            getBase64(action.payload)
                .then((r) => uploadFile({meta: meta, content: r}))
                // Once upload is succesful update its status as saved
                .then(r => {
                    // This timeout is here to simulate network delay :-)
                    setTimeout(() => {
                        dispatch({
                            type: UPDATE_FILE_STATUS, 
                            payload: {
                                [r.filePath]: {
                                    status: r.status,
                                    meta: r.meta,
                                    content: r.content // TODO: remove this line
                                }
                            }
                        })
                    },500);
                })       
                // Catch any errors   
                .catch(e => {
                    console.log(e);
                    // This timeout is here to simulate network delay :-)
                    setTimeout(() => {
                        dispatch({
                            type: UPDATE_FILE_STATUS, 
                            payload: {
                                [action.payload.path]: {status: 0} 
                            }
                        })
                    },500);
                });

            // file.path is our key, because it is unique in given location
            action.payload = {
                [action.payload.path]: {
                    status: 1,
                    meta: meta
                }
            }

            // Explicitly pass action down the redux flow
            return next(action);

        default:
            return next(action);
    }
}

export default apiMiddleware;