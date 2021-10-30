import Axios from "axios"
import { GET_USER, REMOVE_SAVED_ADDRESS_FAIL, REMOVE_SAVED_ADDRESS_REQUEST, REMOVE_SAVED_ADDRESS_SUCCESS, USER_REFRESH, USER_SAVE_ADDRESS_FAIL, USER_SAVE_ADDRESS_REQUEST, USER_SAVE_ADDRESS_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../Constants/userConstants"

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
    try {
        const { data } = await Axios.post('/api/users/signin', { email, password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const signup = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } })
    try {
        const { data } = await Axios.post('/api/users/signup', { name, email, password })
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    localStorage.removeItem('serviceAddress');
    dispatch({ type: USER_SIGNOUT })
}
export const getUser = () => async (dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/users/currentUser', {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    });
    dispatch({ type: GET_USER, payload: data })
}

export const saveAddress = (address) => async (dispatch, getState) => {
    dispatch({ type: USER_SAVE_ADDRESS_REQUEST, payload: address });
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.put('/api/users/saveAddress', address, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: USER_SAVE_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_SAVE_ADDRESS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const removeSavedAddress = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_SAVED_ADDRESS_REQUEST, payload: id })
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.delete(`/api/users/removeSavedAddress/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: REMOVE_SAVED_ADDRESS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: REMOVE_SAVED_ADDRESS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}