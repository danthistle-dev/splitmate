import React from 'react';

import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import NewTrip from './components/NewTrip';
import Trip from './components/Trip';
import NewExpense from './components/NewExpense';
import EditTrip from './components/EditTrip';
import EditExpense from './components/EditExpense';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1
};

// AsyncStorage.clear();

const pReducer = persistReducer(persistConfig, rootReducer);

const Stack = createStackNavigator();
const store = createStore(pReducer);
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen 
                name="Home"
                component={Home}
              />
              <Stack.Screen 
                name="New Trip"
                component={NewTrip}
              />
              <Stack.Screen 
                name="Trip"
                component={Trip}
              />
              <Stack.Screen 
                name="Edit Trip"
                component={EditTrip}
              />
              <Stack.Screen 
                name="New Expense"
                component={NewExpense}
              />
              <Stack.Screen 
                name="Edit Expense"
                component={EditExpense}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fe9798',
    background: 'white'
  }
};

export default App;