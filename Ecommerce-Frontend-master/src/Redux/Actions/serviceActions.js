import Axios from "axios";
import { SERVICES_LIST_FAIL, SERVICES_LIST_REQUEST, SERVICES_LIST_SUCCESS } from "../Constants/servicesConstants"

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