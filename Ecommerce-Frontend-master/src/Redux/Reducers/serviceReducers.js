import { SERVICES_DETAILS_FAIL, SERVICES_DETAILS_REQUEST, SERVICES_DETAILS_SUCCESS, SERVICES_LIST_FAIL, SERVICES_LIST_REQUEST, SERVICES_LIST_SUCCESS } from "../Constants/servicesConstants";

export const servicesListReducer = (state = { loading: true, services: [] }, action) => {
    switch (action.type) {
        case SERVICES_LIST_REQUEST:
            return { loading: true }
        case SERVICES_LIST_SUCCESS:
            return { loading: false, services: action.payload }
        case SERVICES_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const servicesDetailsReducer = (state = { loading: true, service: [] }, action) => {
    switch (action.type) {
        case SERVICES_DETAILS_REQUEST:
            return { loading: true };
        case SERVICES_DETAILS_SUCCESS:
            return { loading: false, service: action.payload };
        case SERVICES_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
