// That's where all the Types definitions and their reducers live

// Types
export const INIT_UI = '[UI] Init UI';
export const CHANGE_MODAL = '[UI] Toggle modal state';
export const UPDATE_SELECTED = '[UI] Update selected entry';

// Initial state of store.ui (see reducers.js)
let INIT_UI_STATE = {
    loading: false,
    selected: null,
    location: "",
    modal: {
        isShowing: false,
        text: ""
    }
};

const uiReducer = (state = INIT_UI_STATE, action) => {
    switch (action.type) {
        case INIT_UI:
            // Make sure location is properly set
            return {...state, location: action.payload.location};

        case CHANGE_MODAL:
            return {...state, modal: action.payload};

        case UPDATE_SELECTED:
            // Unselect when selected
            if (state.selected === action.payload) 
                action.payload = null;
            return {...state, selected: action.payload};

        default:
            return state;
    }
}

export default uiReducer;