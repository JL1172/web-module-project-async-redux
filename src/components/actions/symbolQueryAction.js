import axios from "axios";
import { API_KEY } from "../../@key/key";
export const CHANGE_SYMBOL = "CHANGE_SYMBOL";
export const SUBMIT_SEARCH = "SUBMIT_SEARCH";
export const IS_FETCHING_SECURITY = "IS_FETCHING_SECURITY";
export const IS_FETCHING_ERROR = "IS_FETCHING_ERROR";
export const FETCHING_SECURITY_SUCCESS = "FETCHING_SECURITY_SUCCESS"; 

console.log(API_KEY)
export const submitSearch = (symbolInQue) => dispatch => {
    dispatch(isFetchingSecurity(true))
    axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbolInQue}&token=${API_KEY}`)
    .then(res=> {
        console.log(res)
        dispatch(fetchingSecuritySuccess(res.data))
        dispatch(isFetchingSecurity(false))
    })
    .catch(err=> dispatch(isFetchingError(err.message)))
}

const changeSymbol = (value) => {
    return{type : CHANGE_SYMBOL, payload : value}
}
const isFetchingSecurity = (aBoolean) => {
    return{type : IS_FETCHING_SECURITY, payload : aBoolean}
}
const isFetchingError = (errorMessage) => {
    return{type : IS_FETCHING_SECURITY, payload : errorMessage};
}
const fetchingSecuritySuccess = (information) => {
    return{type : FETCHING_SECURITY_SUCCESS, payload : information}
}
