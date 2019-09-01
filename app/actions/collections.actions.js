import {GET_ALL_COLLECTIONS, DELETE_COLLECTION, ADD_COLLECTION, UPDATE_COLLECTION, FILTER_COLLECTION } from '../constants/actions';
import callApi from '../utils/callApi';

export const getAllCollections = () => async dispatch => {
    try{
        const collections = await callApi("get", '/collections/getAll', null );
        await dispatch({
            type: GET_ALL_COLLECTIONS,
            payload: collections.data
        })
    }catch(err){
        console.log(err)
    }
};
export const deleteCollection = (id) => async dispatch => {
    try{
        const collection = await callApi("post", `/collections/delete/${id}`, null );
        await dispatch({
            type: DELETE_COLLECTION,
            payload: collection.data
        })
    }catch(err){
        console.log(err)
    }
};
export const addCollection = (data) => async dispatch => {
    try{
        const collection = await callApi("post", `/collections/add`, data );
        await dispatch({
            type: ADD_COLLECTION,
            payload: collection.data
        })
    }catch(err){
        console.log(err)
    }
};
export const updateCollection = (id, data) => async dispatch => {
    try{
        const collection = await callApi("post", `/collections/update/${id}`, data );
        await dispatch({
            type: UPDATE_COLLECTION,
            payload: collection.data
        })
    }catch(err){
        console.log(err)
    }
};
export const filterCollectionByMonth = (month) => async dispatch => {
    try{
        const collections = await callApi("post", `/collections/filter/${month}`, null );
        await dispatch({
            type: FILTER_COLLECTION,
            payload: collections.data
        })
    }catch(err){
        console.log(err)
    }
};
export const filterCollectionKey = (key) => async dispatch => {
    try{
        const collections = await callApi("post", `/collections/filterByKey/${key}`, null );
        await dispatch({
            type: FILTER_COLLECTION,
            payload: collections.data
        })
    }catch(err){
        console.log(err)
    }
};