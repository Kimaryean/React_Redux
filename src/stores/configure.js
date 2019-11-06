import { createStore, applyMiddleware, compose } from 'redux';
import reducers from "./reducers";
import { routerMiddleware } from "connected-react-router";

//개발 서버인지 운영서버인지 확인

const isDev = process.env.NODE_ENV === "development" || true;

//redux devtools를 사용하려면 dev모드로 풀려야함
const devtools = isDev && window.devToolsExtension ? window.devToolsExtension : () => fn => fn;

const configure = (initialState, history) => {

    const enhancer = [

        applyMiddleware(routerMiddleware(history)),
        devtools({
            actionsBlacklist: ["trade/UPDATE_TICKER0"],
            maxAge:1000
        })
    ];

    const store = createStore(
        reducers(history),
        initialState,
        compose(...enhancer)
    );

    if (module.hot) {
        module.hot.accept("./reducers", () => {
            const nextReducer = require("./reducers").default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};

export default configureStore;