import {
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_NEWS_SUCCESS
} from "actions/types";

const initialState = {
    categories: {},
    news: {}
};

const newsReducer = (state = initialState, action) => {
    switch( action.type ) {
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: action.categories.data.list };

        case FETCH_CATEGORY_NEWS_SUCCESS:
            console.log("Reducer", action.categoryId);
            return {
                ...state,
                news: {
                    ...state.news,
                    newsList: {
                        ...state.news.newsList,
                        [action.categoryId]: action.newsList.data.list
                    },
                    currentPage: 0
                }
            }
    }

    return state;
};

export default newsReducer;