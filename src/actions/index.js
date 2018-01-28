import { fetchData } from "utils/ApiRequest";

import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILED,
    FETCH_CATEGORY_NEWS,
    FETCH_CATEGORY_NEWS_SUCCESS,
    FETCH_CATEGORY_NEWS_FAILED,
    FETCH_NEWS_DETAILS,
    FETCH_NEWS_DETAILS_SUCCESS,
    FETCH_NEWS_DETAILS_FAILED
} from "actions/types";

import {
    CATEGORIES_LIST_URL,
    CATEGORY_NEWS_LIST_URL,
    NEWS_INFO_URL
} from "../const";

import { store } from "store";

/**
 * Action creator, triggers on success while fetching categories.
 * @param data - result of request to the server, it's a promise
 * @returns {{ type: String, categories: Promise<Array> }}
 */
const getCategoriesSuccess = (data) => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        categories: data
    }
};

/**
 * Action creator, triggers on error while fetching categories.
 * @param error
 * @returns {{ type: String, error: String }}
 */
const getCategoriesFailed = (error) => {
    return {
        type: FETCH_CATEGORIES_FAILED,
        error: error
    }
};

/**
 * Send request to server for categories list.
 * @returns {Function}
 */
const getCategoriesAsync = () => {
    return () => {
        store.dispatch({ type: FETCH_CATEGORIES });

        fetchData(CATEGORIES_LIST_URL).then((response) => {
            store.dispatch(getCategoriesSuccess(response));
        }).catch((error) => {
            store.dispatch(getCategoriesFailed(error));
        });
    }
};

/**
 * Dispatch async request to server for categories list.
 * @returns {Function}
 */
export function getCategories() {
    return () => store.dispatch(getCategoriesAsync());
}


/**
 * Action creator, triggers on success while fetching news from category.
 * @param data - result of request to the server, it's a promise
 * @returns {{ type: String, newsList: Promise<Array>, categoryId: Number }}
 */
const getCategoryNewsSuccess = (data, categoryId) => {
    return {
        type: FETCH_CATEGORY_NEWS_SUCCESS,
        newsList: data,
        categoryId
    }
};

/**
 * Action creator, triggers on error while fetching news from category.
 * @param error
 * @returns {{ type: String, newsError: String }}
 */
const getCategoryNewsFailed = (error) => {
    return {
        type: FETCH_CATEGORY_NEWS_FAILED,
        newsError: error
    }
};

/**
 * Send request to server for category news.
 * @params categoryId
 * @returns {Function}
 */
const getCategoryNewsAsync = (categoryId) => {
    return () => {
        store.dispatch({ type: FETCH_CATEGORY_NEWS });

        const url = CATEGORY_NEWS_LIST_URL.replace(/{id}/, categoryId);

        fetchData(url).then((response) => {
            store.dispatch(getCategoryNewsSuccess(response, categoryId));
        }).catch((error) => {
            store.dispatch(getCategoryNewsFailed(error));
        });
    }
};

/**
 * Dispatch async request to server for category news.
 * @params categoryId
 * @returns {Function}
 */
export function getCategoryNews(categoryId) {
    return () => store.dispatch(getCategoryNewsAsync(categoryId));
}


/**
 * Action creator, triggers on success while fetching news details.
 * @param data - result of request to the server, it's a promise
 * @returns {{ type: String, newsDetail: Promise<Array> }}
 */
const getNewsInfoSuccess = (data) => {
    return {
        type: FETCH_NEWS_DETAILS_SUCCESS,
        newsDetail: data
    }
};

/**
 * Action creator, triggers on error while fetching news details.
 * @param error
 * @returns {{ type: String, newsError: String }}
 */
const getNewsInfoFailed = (error) => {
    return {
        type: FETCH_NEWS_DETAILS_FAILED,
        newsDetailError: error
    }
};

/**
 * Send request to server for news details.
 * @params categoryId
 * @returns {Function}
 */
const getNewsInfoAsync = (newsId) => {
    return () => {
        store.dispatch({ type: FETCH_NEWS_DETAILS });

        const url = NEWS_INFO_URL.replace(/{id}/, newsId);

        fetchData(url).then((response) => {
            store.dispatch(getNewsInfoSuccess(response));
        }).catch((error) => {
            store.dispatch(getNewsInfoFailed(error));
        });
    }
};

/**
 * Dispatch async request to server for news details.
 * @params categoryId
 * @returns {Function}
 */
export function getNewsInfo(newsId) {
    return () => store.dispatch(getNewsInfoAsync(newsId));
}
