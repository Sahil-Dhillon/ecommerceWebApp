import { useSelector } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import { cartReducer } from './Reducers/cartReducers';
import { initiateTransactionReducer, orderCreateReducer, orderDetailsReducer, orderHistoryReducer, orderPayReducer } from './Reducers/orderReducers';
import { servicesDetailsReducer, servicesGroupCreateReducer, servicesListReducer } from './Reducers/serviceReducers';
import { userDetailsReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './Reducers/userReducers';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  },
};
const reducer = combineReducers({
  serviceList: servicesListReducer,
  serviceDetails: servicesDetailsReducer,
  servicesGroupCreate: servicesGroupCreateReducer,
  // cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderHistory: orderHistoryReducer,
  orderDetails: orderDetailsReducer,
  initiateTransaction: initiateTransactionReducer,
  orderPayment: orderPayReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
