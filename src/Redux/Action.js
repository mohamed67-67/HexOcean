import { Store } from "./Store";


export const Adding = (neworder) => (dispatch, getState) => {
     
    
    const {INOrder} = getState();
    let trial = new Set ([...INOrder,neworder])
    
    dispatch({
        type: 'ADDING',
        payload : [...trial]
    })
}



export const Removing = (chosen) => (dispatch, getState) => {
    
    const {INOrder} = getState();

    
    let newOne = INOrder.filter(one => one.id !== chosen.id)

    dispatch({
        type : 'REMOVING',
        payload : newOne
    })
}


