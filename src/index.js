import React from 'react';
import ReactDOM from 'react-dom';
import './sass/App.scss';
import App from "./App";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
    <React.StrictMode>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </React.StrictMode>,
    document.getElementById('root')
);
