//App.js 
import React from 'react';

import {Provider} from 'react-redux'
import STORE from './STORE/configstore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'


import Navi from './Navigation/Navi';



export default class App extends React.Component {
 
  render() {
    let persistor = persistStore(STORE)
    return (
      <Provider store = {STORE}>
        <PersistGate persistor={persistor}>
      
        <Navi />
        </PersistGate>
        
      </Provider>
      
      
    );
  }
}


    
  
