// That's where all the action creators and their reducers live

export const UPLOAD_FILE = '[Data] Upload file to DHT';
export const ADD_NEW_FILES = '[Data] Add new files to store.data.files';
export const UPDATE_FILE_STATUS = '[Data] Update file upload status';

// Initial state of store.data (see reducers.js)
let INIT_DATA_STATE = {
    files: {}
};

const dataReducer = (state = INIT_DATA_STATE, action) => {
    switch (action.type) {

        case UPLOAD_FILE:
            return {...state, files: {...state.files, ...action.payload}};

        case ADD_NEW_FILES:
            return {...state, files: action.payload};

        case UPDATE_FILE_STATUS:
            return {
                ...state, files: {
                    ...state.files, ...action.payload
                    }
                };

        default:
            return state;
    }
}

export default dataReducer;