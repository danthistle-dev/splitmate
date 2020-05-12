import React from 'react';

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

const Stack = createStackNavigator();
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
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
              name="New Expense"
              component={NewExpense}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
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