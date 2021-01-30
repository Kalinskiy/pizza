import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import {filtersReducer} from "./filters-reducer";
import {pizzaReducer} from "./pizza-reducer";
import {appReducer} from "./app-reducer";
import {cartReducer} from "./cart-reducer";
import thunkMiddleWare from 'redux-thunk';


const reducers = combineReducers({
    filter: filtersReducer,
    pizza:pizzaReducer,
    app:appReducer,
    cart:cartReducer

})
export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));
