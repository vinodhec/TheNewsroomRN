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




    // echo "export PATH=\$PATH:/Users/${USER}/Library/Android/sdk/platform-tools/" >> ~/.bash_profile && source ~/.bash_profile
