import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './Reducers/cartReducers';
import { servicesDetailsReducer, servicesListReducer } from './Reducers/serviceReducers';
import { userSigninReducer, userSignupReducer } from './Reducers/userReducers';

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    savedAddress: localStorage.getItem('savedAddress') ? JSON.parse(localStorage.getItem('savedAddress'))
      : [],
    // cartItems: [],
    selectedAddress: {},
    paymentMethod: 'PayPal',
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
  }
};
const reducer = combineReducers({
  serviceList: servicesListReducer,
  serviceDetails: servicesDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
