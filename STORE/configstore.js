import {createStore} from 'redux'
import togglefavorite from './Reducer/favoriteReducer'
import { persistCombineReducers  } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}


export default createStore(persistCombineReducers(rootPersistConfig, {togglefavorite}))