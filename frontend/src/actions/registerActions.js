import axios from 'axios';
import { REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from '../types/registerTypes';
import { SIGNIN_SUCCESS } from '../types/signinTypes';


export const register = (email, password, name) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post('/api/users/register', {
            name,
            email,
            password,
        });
        dispatch({ type: REGISTER_SUCCESS, payload: data });
        dispatch({ type: SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};