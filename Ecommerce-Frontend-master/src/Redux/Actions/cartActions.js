import Axios from "axios"
import { ADD_CART_ITEM, CART_SAVE_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_SELECT_ADDRESS, EMPTY_CART_ITEM, REMOVE_CART_ITEM, REMOVE_SAVED_ADDRESS } from "../Constants/cartConstants"
function randomString() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    const Length = Math.floor(Math.random() * chars.length);
    var str = '';
    for (var i = 0; i < Length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

export const addToCart = (group, subgroup, service, timeSlot, comment) => async (dispatch, getState) => {
    const date = new Date().toLocaleString()
    const id = date + `${subgroup}/${service}/${timeSlot}/${comment}` + randomString()
    const { data } = await Axios.get(`/api/services/${group}/${subgroup}/${service}`)
    dispatch({
        type: ADD_CART_ITEM,
        payload: {
            serviceId: data._id,
            group,
            subgroup,
            name: data.name,
            price: data.price,
            datails: data.details,
            timeSlot,
            comment,
            id
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeAllFromCart = () => (dispatch, getState) => {
    dispatch({ type: EMPTY_CART_ITEM })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveAddress = (data) => (dispatch, getState) => {
    const { fullName, phone, address, address2, city, state } = data
    const id = randomString()
    dispatch({
        type: CART_SAVE_ADDRESS,
        payload: {
            id, fullName, phone, address, address2, city, state
        }
    });
    localStorage.setItem('savedAddress', JSON.stringify(getState().cart.serviceAddress));
};
export const removeSavedAddress = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_SAVED_ADDRESS,
        payload: id
    })
    localStorage.setItem('serviceAddress', JSON.stringify(getState().cart.serviceAddress))
}
export const selectAddress = (id) => (dispatch) => {
    dispatch({
        type: CART_SELECT_ADDRESS,
        payload: id
    })
}
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};