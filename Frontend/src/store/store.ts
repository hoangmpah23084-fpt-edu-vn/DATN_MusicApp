import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import songReducer from "./Reducer/Song";
import userReducer from "./Reducer/User";

import storage from 'redux-persist/lib/storage';
import artistReducer from './Reducer/artistReducer';
import genreReducer from './Reducer/genreReducer';
import currentSong from './Reducer/currentSong';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    Song : songReducer,
    user : userReducer,
    artist: artistReducer,
    genre : genreReducer,
    currentSong: currentSong
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default persistStore(store);
