import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/main';

const Stack = createStackNavigator();
  
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen initialRouteName="Products"
          name="Products" 
          component={Main} 
          options={
            { 
              title: 'API Produtos', 
              headerStyle: {
                backgroundColor: '#DA552F',
              },
              headerTintColor: "#FFF"
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  
export default App;