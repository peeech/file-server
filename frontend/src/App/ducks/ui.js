// That's where all the Types definitions and their reducers live

// Types
export const INIT_UI = '[UI] Init UI';
export const CHANGE_MODAL = '[UI] Toggle modal state';

// Initial state of store.ui (see reducers.js)
let INIT_UI_STATE = {
    loading: false,
    modal: {
        isShowing: false,
        text: ""
    }
};

const uiReducer = (state = INIT_UI_STATE, action) => {
    switch (action.type) {
        case INIT_UI:
            // Do nothing as an api middleware already consumed this message
            return {...state};

        case CHANGE_MODAL:
            return {...state, modal: action.payload};

        default:
            return state;
    }
}

export default uiReducer;