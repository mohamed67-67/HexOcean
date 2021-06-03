

const initial = {
    INOrder : []
}


export const Reducer = (state = initial, action) => {
    switch(action.type){
        case 'ADDING' : 
            return {INOrder : action.payload}
        case 'REMOVING' :
            return {INOrder : action.payload}
        default : return state
    }
}