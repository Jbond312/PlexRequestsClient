import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { setAuthHeader, tokenSelector } from '../apiClient';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  store.subscribe(() => {
    const token = tokenSelector(store.getState());
    setAuthHeader(token);
  });

  return store;
}
