import {StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {NavigationContainer} from '@react-navigation/native';
import SplashNavigator from './components/Navigators/SplashNavigator';
import { useAppDispatch } from './app/hooks';
import { update } from './features/global/globalSlice';
import FirestoreService from './firebase/firestoreService';
import { COLLECTIONS } from './constants/collections';
let persistor = persistStore(store);
const App = () => {
  
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <SplashNavigator ></SplashNavigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexGrow: 1,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
