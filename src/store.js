import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { fromJS } from 'immutable';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import rootReducer from "./reducers";

const debug = true;

function isPlainEnoughObject(o) {
  return o !== null && !Array.isArray(o) && typeof o === 'object';
}

function customAutoMergeLevel2(inboundState, originalState, reducedState) {
  const newState = {...reducedState};
  // only rehydrate if inboundState exists and is an object
  if (inboundState && typeof inboundState === 'object') {
    Object.keys(inboundState).forEach(key => {
      // ignore _persist data
      if (key === '_persist') {
        return;
      }
      // if reducer modifies substate, skip auto rehydration
      if (originalState[key] !== reducedState[key]) {
        if (process.env.NODE_ENV !== 'production' && debug) {
          console.log(
            // eslint-disable-line no-console
            'redux-persist/stateReconciler: sub state for key `%s` modified, skipping.',
            key,
          );
        }
        return;
      }

      if (isPlainEnoughObject(reducedState[key])) {
        // if object is plain enough shallow merge the new values (hence "Level2")
        newState[key] = fromJS({
          ...newState[key].toJS(),
          ...inboundState[key].toJS(),
        });
        return;
      }

      // otherwise hard set
      newState[key] = inboundState[key];
    });
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    debug &&
    inboundState &&
    typeof inboundState === 'object'
  ) {
    console.log(
      `redux-persist/stateReconciler: rehydrated keys '${Object.keys(
        inboundState,
      ).join(', ')}'`,
    ); // eslint-disable-line no-console
  }

  return newState;
}

const persistConfig = {
  key: 'root',
  storage,
  transforms: [immutableTransform()],
  whitelist: ['auth'],
  timeout: 10000,
  stateReconciler: customAutoMergeLevel2,
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(store);

export default store;
