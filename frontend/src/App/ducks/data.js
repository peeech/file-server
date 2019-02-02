// That's where all the action creators and their reducers live

export const UPLOAD_FILE = '[Data] Upload file to DHT';
export const ADD_NEW_FILES = '[Data] Add new files to store';
export const UPDATE_FILE_STATUS = '[Data] Update file upload status';
export const POLL_SERVER = '[Data] Poll for new files from server';

// Initial state of store.data (see reducers.js)
let INIT_DATA_STATE = {
    files: {},
    folders: {},
    userHash: 'QM3a89cd739a04ef9f889f'
};

// Example of file object:
// '/full/file/path.ext': {
//     meta: {
//         lastModified: 183296,
//         name: 'Name',
//         path: 'path',
//         size: 8724682,
//         type: 'image/jpeg'
//     },
//     status: 2,
//     preview: 'byte64string',
//     hash: 'hash328792230i',
//     creator: 'hash328792843293230i',
//     isFolder: false }

const dataReducer = (state = INIT_DATA_STATE, action) => {
    switch (action.type) {

        case UPLOAD_FILE:
            return {...state, files: {...state.files, ...action.payload}};

        case ADD_NEW_FILES:
            return {...state, files: {...state.files, ...action.payload}};

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