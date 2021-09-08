
import { SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNOUT } from "../types/signinTypes";

export const signinReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return { loading: true };
        case SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case SIGNOUT:
            return {};
        default:
            return state;
    }
};
