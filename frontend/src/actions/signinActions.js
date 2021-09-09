import axios from 'axios';
import { SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNOUT } from '../types/signinTypes';


export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post('/api/users/signin', { email, password });
        dispatch({ type: SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: SIGNOUT });


    document.location.href = '/signin';
};