// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import collections from './collections.reducer'
import pays from './pays.reducer';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    collections,
    pays
  });
}
