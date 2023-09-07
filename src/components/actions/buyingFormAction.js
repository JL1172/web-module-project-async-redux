import axios from "axios";
import { API_KEY } from "../../@key/key";
export const FLIP_PAGE = "FLIP_PAGE";
export const CHANGE_SHARE_FORM_VALUE = "CHANGE_SHARE_FORM_VALUE";
export const SUBMIT_PURCHASE = "SUBMIT_PURCHASE";
export const CONFIRMATION_MESSAGE = "CONFIRMATION_MESSAGE";
export const RECTIFY_POSITIONS= "RECTIFY_POSITIONS";  
export const FETCHING_INFORMATION = "FETCHING_INFORMATION";   

export const flipPage = () => {
    return{type : FLIP_PAGE}
}

export const changeShareFormValue = (value,pps) => {
    return{type : CHANGE_SHARE_FORM_VALUE, payload : [value,pps]}
}

export const submitPurchase = (stockPurchaseInformation) => {
    return{type : SUBMIT_PURCHASE, payload : [stockPurchaseInformation]}
}

export const confirmationMessage = (title) => {
    return {type : CONFIRMATION_MESSAGE, payload : title}
}

export const compareDifference = (symbol,oldPriceData,overflow, shares) => dispatch => {
    dispatch(fetchingInformation(true))
    axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
    .then(res=> {
        dispatch(rectifyPositions(oldPriceData,res.data,overflow, shares))
        dispatch(fetchingInformation(false))
    })
}

const fetchingInformation = (bool) => {
    return{type  :FETCHING_INFORMATION, payload : bool};
}

const rectifyPositions = (oldData,newData,overflow, shares) => {
    return{type : RECTIFY_POSITIONS, payload : [oldData,newData,overflow, shares]}; 
}

