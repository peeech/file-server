import { UPLOAD_FILE, UPDATE_FILE_STATUS, ADD_NEW_FILES, POLL_SERVER } from '../ducks/data';
import { INIT_UI, CHANGE_MODAL } from '../ducks/ui';
import { uploadFile, getAllFiles } from '../hc_api/hc_api';
import { createMeta, getBase64, formatFileForUI } from '../hc_api/file_handler';

const apiMiddleware = ( {dispatch, getState } ) => next => action => {
    switch (action.type) {
        case INIT_UI:
        case POLL_SERVER:
            action.payload = {
                location: getState().ui.location || localStorage.getItem('location') || "/"
            }
            localStorage.setItem('location', action.payload.location);

            getAllFiles(action.payload.location)
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

            // There are two parts that need to be considered:
            // - preparing file for saving in DHT
            // - preparing file for temporary preview in the UI

            let currentLocation = getState().ui.location;

            // Create metadata from js File object
            let meta = action.payload.meta = createMeta(action.payload, currentLocation);

            // UPLOAD_FILE can be triggered only by file uploader, so is file.isFolder can be only false
            action.payload.isFolder = false;

            // Unleash getBase64
            // and uploadFile promise chain
            getBase64(action.payload)
                .then((r) => uploadFile({meta: meta, content: r}))
                // Once upload is succesful update its status as saved
                .then(r => {
                    // This timeout is here to simulate network delay :-)
                    setTimeout(() => {
                        dispatch({
                            type: UPDATE_FILE_STATUS, 
                            payload: r
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
                                path: action.payload.path,
                                status: 0
                            }
                        })
                    },500);
                });

            // Decide wether file in payload should be displayed in UI
            // and format data for saving in state
            action.payload = formatFileForUI(action.payload, currentLocation);

            // Explicitly pass action down the redux flow
            return next(action);

        default:
            return next(action);
    }
}

export default apiMiddleware;