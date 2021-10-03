import { ADD_CART_ITEM, EMPTY_CART_ITEM, REMOVE_CART_ITEM } from "../Constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            const item = action.payload
            // const existItem = state.cartItems.find((x) => x.id === item.id)
            // if (existItem) {
            //     return {
            //         ...state,
            //         cartItems: state.cartItems.map((x) =>
            //             x.id === existItem.id ? item : x
            //         )
            //     }
            // } else {
            // }
            return {
                ...state,
                cartItems: [...state.cartItems, item]
            }
        case REMOVE_CART_ITEM:
            return { ...state, cartItems: state.cartItems.filter((x) => x.id !== action.payload) }
        case EMPTY_CART_ITEM:
            return { ...state, cartItems: [] }

        default:
            return state
    }
}