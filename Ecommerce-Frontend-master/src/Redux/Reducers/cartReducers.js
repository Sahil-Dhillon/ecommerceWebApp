// import { CART_ITEMS_FAIL, CART_ITEMS_REQUEST, CART_ITEMS_SUCCESS } from "../Constants/cartConstants"

// export const cartReducer = (state = {}, action) => {
//     switch (action.type) {
//         case CART_ITEMS_REQUEST:
//             return { loading: true }
//         case CART_ITEMS_SUCCESS:
//             return { loading: false, cartItems: action.payload }
//         case CART_ITEMS_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }