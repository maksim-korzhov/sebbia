import {
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_NEWS_SUCCESS,
    FETCH_NEWS_DETAILS_SUCCESS
} from "actions/types";

const initialState = {
    categories: {},
    news: {}
};

const newsReducer = (state = initialState, action) => {
    switch( action.type ) {
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.categories.data.list
            };

        case FETCH_CATEGORY_NEWS_SUCCESS:
            const newsObj = {};

            action.newsList.data.list.forEach(item => {
                item.categoryId = action.categoryId;

                newsObj[item.id] = item;
            });

            return {
                ...state,
                news: {
                    ...state.news,
                    newsList: {
                        ...state.news.newsList,
                        ...newsObj
                    },
                    currentPage: 0
                }
            };

        case FETCH_NEWS_DETAILS_SUCCESS:
            const { news } = action.newsDetail.data;

            const newsDetailObj = {
                [news.id]: news
            };

            return {
                ...state,
                news: {
                    ...state.news,
                    newsList: {
                        ...state.news.newsList,
                        ...newsDetailObj
                    },
                    currentPage: 0
                }
            };
    }

    return state;
};

export default newsReducer;