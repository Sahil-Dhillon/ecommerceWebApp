import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { servicesDetailsReducer, servicesListReducer } from './Reducers/serviceReducers';

const initialState = {};
const reducer = combineReducers({
  serviceList: servicesListReducer,
  serviceDetails: servicesDetailsReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
