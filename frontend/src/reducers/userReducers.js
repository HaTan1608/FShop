import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET } from "../types/userTypes";

export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};