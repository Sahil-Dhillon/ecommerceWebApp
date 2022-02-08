import { SERVICES_DETAILS_FAIL, SERVICES_DETAILS_REQUEST, SERVICES_DETAILS_SUCCESS, SERVICES_GROUP_CREATE_FAIL, SERVICES_GROUP_CREATE_REQUEST, SERVICES_GROUP_CREATE_RESET, SERVICES_GROUP_CREATE_SUCCESS, SERVICES_LIST_FAIL, SERVICES_LIST_REQUEST, SERVICES_LIST_SUCCESS } from "../Constants/servicesConstants";

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

export const servicesGroupCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SERVICES_GROUP_CREATE_REQUEST:
            return { loading: true };
        case SERVICES_GROUP_CREATE_SUCCESS:
            return { loading: false, success: true, serviceGroup: action.payload };
        case SERVICES_GROUP_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case SERVICES_GROUP_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
