import Axios from "axios"
import { ADD_CART_ITEM, EMPTY_CART_ITEM, REMOVE_CART_ITEM } from "../Constants/cartConstants"

export const addToCart = (group, subgroup, service, timeSlot, comment) => async (dispatch, getState) => {
    const date = new Date().toLocaleString()
    function randomString() {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        const Length = Math.floor(Math.random() * chars.length);
        var str = '';
        for (var i = 0; i < Length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
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
export const removeAllFromCart = () => (dispatch) => {
    dispatch({ type: EMPTY_CART_ITEM })
}