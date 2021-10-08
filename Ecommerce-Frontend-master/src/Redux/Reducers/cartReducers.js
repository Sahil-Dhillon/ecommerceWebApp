import { ADD_CART_ITEM, CART_SAVE_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_SELECT_ADDRESS, EMPTY_CART_ITEM, REMOVE_CART_ITEM, REMOVE_SAVED_ADDRESS } from "../Constants/cartConstants"

export const cartReducer = (state = { cartItems: [], savedAddress: [], selectedAddress: {} }, action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case REMOVE_CART_ITEM:
            return { ...state, cartItems: state.cartItems.filter((x) => x.id !== action.payload) }
        case EMPTY_CART_ITEM:
            return { ...state, cartItems: [] }
        case CART_SAVE_ADDRESS:
            return { ...state, savedAddress: [...state.savedAddress, action.payload] };
        case REMOVE_SAVED_ADDRESS:
            return { ...state, savedAddress: state.savedAddress.filter((x) => x.id !== action.payload) }
        case CART_SELECT_ADDRESS:
            return { ...state, selectedAddress: state.savedAddress.filter((x) => x.id === action.payload) };
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        default:
            return state
    }
}