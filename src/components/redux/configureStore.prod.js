import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { setAuthHeader } from '../apiClient';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  store.subscribe(() => {
    //TODO: Remove this and just setup request interceptor
    setAuthHeader();
  });

  return store;
}
