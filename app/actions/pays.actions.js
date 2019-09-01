import {GET_ALL_PAYS, ADD_PAY, DELETE_PAY, UPDATE_PAY, FILTER_PAY} from '../constants/actions';
import callApi from '../utils/callApi';

export const getAllPays = () => async dispatch => {
    try{
        const pays = await callApi("get", '/pays/getAll', null );
        await dispatch({
            type: GET_ALL_PAYS,
            payload: pays.data
        })
    }catch(err){
        console.log(err)
    }
};
export const addPay = (data) => async dispatch => {
    try{
        const collection = await callApi("post", `/pays/add`, data );
        await dispatch({
            type: ADD_PAY,
            payload: collection.data
        })
    }catch(err){
        console.log(err)
    }
};
export const deletePay = (id) => async dispatch => {
    try{
        const collection = await callApi("post", `/pays/delete/${id}`, null );
        await dispatch({
            type: DELETE_PAY,
            payload: collection.data
        })
    }catch(err){
        console.log(err)
    }
};
export const updatePay = (id, data) => async dispatch => {
    try{
        const pay = await callApi("post", `/pays/update/${id}`, data );
        console.log(pay)
        await dispatch({
            type: UPDATE_PAY,
            payload: pay.data
        })
    }catch(err){
        console.log(err)
    }
};
export const filterPayByMonth = (month) => async dispatch => {
    try{
        const pays = await callApi("post", `/pays/filter/${month}`, null );
        await dispatch({
            type: FILTER_PAY,
            payload: pays.data
        })
    }catch(err){
        console.log(err)
    }
};
export const filterPayKey = (key) => async dispatch => {
    try{
        const pays = await callApi("post", `/pays/filterByKey/${key}`, null );
        await dispatch({
            type: FILTER_PAY,
            payload: pays.data
        })
    }catch(err){
        console.log(err)
    }
};