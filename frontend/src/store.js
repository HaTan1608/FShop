
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from "redux-thunk";
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import { signinReducer } from "./reducers/signinReducer";
import { registerReducer } from './reducers/registerReducer';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
    },

};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userSignin: signinReducer,
    userRegister: registerReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)));
export default store;