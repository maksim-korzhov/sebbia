import axios from "axios";

/**
 * Async request to the server
 * @param url
 * @returns {Promise}
 */
export const fetchData = (url) => {
    return axios.get(url);
};