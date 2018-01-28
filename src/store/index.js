import { applyMiddleware, createStore } from "redux";
import reducers from "reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk))(createStore);
export const store = createStoreWithMiddleware(reducers);