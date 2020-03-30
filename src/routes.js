import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/main';

const Stack = createStackNavigator();
  
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Início" 
          component={Main} 
          options={{ title: 'API Produtos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  
export default App;