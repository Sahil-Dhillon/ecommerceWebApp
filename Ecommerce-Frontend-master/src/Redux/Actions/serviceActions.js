import Axios from "axios";
import { SERVICES_DETAILS_FAIL, SERVICES_DETAILS_REQUEST, SERVICES_DETAILS_SUCCESS, SERVICES_LIST_FAIL, SERVICES_LIST_REQUEST, SERVICES_LIST_SUCCESS } from "../Constants/servicesConstants"

export const listServices = () => async (dispatch) => {
    dispatch({
        type: SERVICES_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/services')
        dispatch({
            type: SERVICES_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SERVICES_LIST_FAIL,
            payload: error.message
        })
    }
}

export const detailsServices = (services_group_subgroup) => async (dispatch) => {
    dispatch({
        type: SERVICES_DETAILS_REQUEST,
        payload: services_group_subgroup
    })
    try {
        const { data } = await Axios.get(`/api/services/${services_group_subgroup}`);
        dispatch({ type: SERVICES_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SERVICES_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}