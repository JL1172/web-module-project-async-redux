import { CHANGE_SHARE_FORM_VALUE, CONFIRMATION_MESSAGE, FETCHING_INFORMATION, FLIP_PAGE, RECTIFY_POSITIONS, SUBMIT_PURCHASE, confirmationMessage } from "../actions/buyingFormAction"


const initialState = {
    amountOfShares : "",
    stockInformation : [],
    flipPage : false,
    accountBalance : 100000,
    totalEquity : 0,
    total : 0,
    confirmationMessage : {message : "", confirmationMessageDeployed : false},
    confirmed : false,

    stockReconciliation : {},
    isFetching : false,
    totalLossOrGain : 0,
}

export const buyingFormReducer = (state= initialState, action) => {
    switch(action.type) {
        case(FLIP_PAGE) :
            return({...state, flipPage : !state.flipPage});
        case(CHANGE_SHARE_FORM_VALUE) :
            return({...state, amountOfShares : action.payload[0], total : action.payload[1] * action.payload[0]});
        case(SUBMIT_PURCHASE) :
            return({...state, totalEquity : action.payload[0].total, stockInformation : [...state.stockInformation, action.payload[0]],
            accountBalance : state.accountBalance - action.payload[0].total, total : 0, amountOfShares : 0,
            confirmationMessage : {message : "", confirmationMessageDeployed : false}, flipPage : !state.flipPage}
            )
        case(CONFIRMATION_MESSAGE) :
            return({...state, confirmationMessage: 
                {message : `Here is your purchase of ${state.amountOfShares} shares for $${state.total} from ${action.payload}, click to confirm`,
                confirmationMessageDeployed : true,
            }    
            })
        case(FETCHING_INFORMATION) :
            return({...state, isFetching : action.payload })
        case(RECTIFY_POSITIONS) : 
        const insertObj = {
            currentPrice : action.payload[1].c,
            priceWhenBought : action.payload[0],
            name : action.payload[2].description,
            symbol : action.payload[2].displaySymbol,
            shares : parseInt(action.payload[3]),
    
            computations : {
                difference : (action.payload[0] - action.payload[1].c).toFixed(2),
                percentageDifference : action.payload[0] / action.payload[1].c.toFixed(2),
            }
        }
  
            return({...state, stockReconciliation : [insertObj], totalLossOrGain : state.totalLossOrGain + insertObj.computations.difference });
        default : 
            return(state); 
    }
}