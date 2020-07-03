import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const configureStore = (initialState) => {
  const middleware = [thunk];

  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware),
  );
  const persistor = persistStore(store);

  return { store, persistor };
}

export { configureStore }