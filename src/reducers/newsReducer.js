import {
    FETCH_CATEGORIES_SUCCESS
} from "actions/types";

const initialState = {
    categories: {}
};

const newsReducer = (state = initialState, action) => {
    switch( action.type ) {
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: action.categories.data.list };
    }

    return state;
};

export default newsReducer;