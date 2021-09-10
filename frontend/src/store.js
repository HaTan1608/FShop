
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from "redux-thunk";
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productUpdateReducer } from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import { signinReducer } from "./reducers/signinReducer";
import { registerReducer } from './reducers/registerReducer';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer } from './reducers/orderReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
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
    orderMineList: orderMineListReducer,

    productUpdate: productUpdateReducer,
    productCreate: productCreateReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDetails: userDetailsReducer,

    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userList: userListReducer,
    orderDeliver: orderDeliverReducer,
    orderDelete: orderDeleteReducer,
    orderList: orderListReducer,
    productDelete: productDeleteReducer,

    productReviewCreate: productReviewCreateReducer,

})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)));
export default store;