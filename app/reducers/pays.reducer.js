import {GET_ALL_PAYS, ADD_PAY, DELETE_PAY, UPDATE_PAY, FILTER_PAY} from '../constants/actions';

const initialState = {
    isUpdate: false,
    data: [],
    sum: {
        sum1:0,
        sum2: 0,
        sum3: 0
    }
};

const pays = (state= initialState, action)=>{
    switch(action.type){
        case GET_ALL_PAYS:
            return {
                isUpdate: true,
                data: action.payload,
                sum: {
                    sum1: [...action.payload].reduce((a,b)=>{
                        return {money: a.money + b.money}
                    },{money: 0}).money,
                    sum2: [...action.payload].filter(item=>item.status==true).reduce((a,b)=>{
                        return {money: a.money + b.money}
                    },{money: 0}).money,
                    sum3: [...action.payload].filter(item=>item.status==false).reduce((a,b)=>{
                        return {money: a.money + b.money}
                    },{money: 0}).money,
                }
            }
        case DELETE_PAY:
            return {
                isUpdate: true,
                data: state.data.filter(pay => pay._id !== action.payload._id),
                sum: {
                    sum1: state.sum.sum1 - action.payload.money,
                    sum2: action.payload.status ? state.sum.sum2 - action.payload.money : state.sum.sum2,
                    sum3: !action.payload.status ? state.sum.sum3 - action.payload.money : state.sum.sum3,
                }
            }
        case ADD_PAY:
            return {
                isUpdate: true,
                data: [
                    ...state.data,
                    action.payload
                ],
                sum: {
                    sum1: state.sum.sum1 + action.payload.money,
                    sum2: action.payload.status ? state.sum.sum2 + action.payload.money : state.sum.sum2,
                    sum3: !action.payload.status ? state.sum.sum3 + action.payload.money : state.sum.sum3,
                }
            };
        case UPDATE_PAY:
            const newState = state.data.map(pay=>{
                if(pay._id === action.payload._id){
                    return action.payload
                }else{
                    return pay
                }
            });
            console.log(newState)
            return {
                    isUpdate: true,
                    data: [...newState],
                    sum: {
                        sum1: newState.reduce((a,b)=>{
                            return {money: a.money + b.money}
                        },{money: 0}).money,
                        sum2: newState.filter(item=>item.status==true).reduce((a,b)=>{
                            return {money: a.money + b.money}
                        },{money: 0}).money,
                        sum3: newState.filter(item=>item.status==false).reduce((a,b)=>{
                            return {money: a.money + b.money}
                        },{money: 0}).money
                    }
                }
            case FILTER_PAY:
                return {
                    isUpdate: true,
                    data: action.payload,
                    sum: {
                        sum1: [...action.payload].reduce((a,b)=>{
                            return {money: a.money + b.money}
                        },{money: 0}).money,
                        sum2: [...action.payload].filter(item=>item.status==true).reduce((a,b)=>{
                            return {money: a.money + b.money}
                        },{money: 0}).money,
                        sum3: [...action.payload].filter(item=>item.status==false).reduce((a,b)=>{
                            return {money: a.money + b.money}
                        },{money: 0}).money,
                    }
                }
        default:
            return state
    }
}
export default pays