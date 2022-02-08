import Axios from "axios"
import { ADD_CART_ITEM_FAIL, ADD_CART_ITEM_REQUEST, ADD_CART_ITEM_SUCCESS, EMPTY_CART_FAIL, EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS, REMOVE_CART_ITEM_FAIL, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS } from "../Constants/cartConstants"


export const addToCart = (group, subgroup, service, timeSlot, comment) => async (dispatch, getState) => {
    dispatch({ type: ADD_CART_ITEM_REQUEST, payload: { group, subgroup, service, timeSlot, comment } });
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const serviceData = await Axios.get(`/api/services/${group}/${subgroup}/${service}`)
        const { data } = await Axios.put('/api/users/addToCart', {
            serviceId: serviceData.data._id,
            group,
            subgroup,
            // name: service,
            name: serviceData.data.name,
            price: serviceData.data.price,
            image: serviceData.data.image,
            timeSlot,
            comment,

        }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        // dispatch({ type: USER_REFRESH, payload: data })
        dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: data });
        // localStorage.setItem('savedAddress', JSON.stringify(getState().userSignin.userInfo));
    } catch (error) {
        dispatch({
            type: ADD_CART_ITEM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
// export const requestCart = () => async (dispatch, getState) => {
//     dispatch({ type: CART_ITEMS_REQUEST })
//     try {
//         const { userDetails: { currentUser } } = getState()
//         const cartItems = await currentUser.cartItems
//         dispatch({ type: CART_ITEMS_SUCCESS, payload: cartItems })
//     } catch (error) {
//         dispatch({
//             type: CART_ITEMS_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// }
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST, payload: id })
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.delete(`/api/users/removeFromCart/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: REMOVE_CART_ITEM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}
export const emptyCart = () => async (dispatch, getState) => {
    dispatch({ type: EMPTY_CART_REQUEST })
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.delete('/api/users/emptyCart', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: EMPTY_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EMPTY_CART_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}