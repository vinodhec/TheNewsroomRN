import {StatusBar, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {NavigationContainer} from '@react-navigation/native';
import SplashNavigator from './components/Navigators/SplashNavigator';
import {COLORS} from './constants';

let persistor = persistStore(store);
const App = () => {
  
 
  
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SplashNavigator></SplashNavigator>
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
