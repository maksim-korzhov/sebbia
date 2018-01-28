import { fetchData } from "utils/ApiRequest";

import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILED,
    FETCH_CATEGORY_NEWS,
    FETCH_CATEGORY_NEWS_SUCCESS,
    FETCH_CATEGORY_NEWS_FAILED
} from "actions/types";

import {
    CATEGORIES_LIST_URL,
    CATEGORY_NEWS_LIST_URL
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
 * Action creator, triggers on success while fetching new from category.
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
