import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_EMPTY } from "../types/cartTypes";


export const cartReducers = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const stt = action.payload.stt;
            if (state.cartItems) {
                const existItem = state.cartItems.find((x) => (x.product === item.product && x.size === item.size));
                if (existItem) {
                    if (stt === 'yes') {
                        existItem.qty = existItem.qty + item.qty;
                    }
                    return {
                        ...state,
                        cartItems: state.cartItems.map((x) =>
                            (x.product === existItem.product && x.size === item.size) ? existItem : x
                        ),
                    };
                }
                return { ...state, cartItems: [...state.cartItems, item] };

            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => (x.product !== action.payload.productId || x.size !== action.payload.size)),
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_EMPTY:
            return {};
        default:
            return state;
    }
};