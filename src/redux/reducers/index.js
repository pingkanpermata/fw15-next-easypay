import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth'
import profile from './profile';
import transfer from './transfer'

const authConfig = {
    key: 'auth',
    storage
}

const profileConfig = {
    key: 'profile',
    storage
}

const transferConfig = {
    key: 'transfer',
    storage
}

const reducer = combineReducers({
    auth: persistReducer(authConfig, auth),
    profile: persistReducer(profileConfig, profile),
    transfer: persistReducer(transferConfig, transfer)
})

export default reducer