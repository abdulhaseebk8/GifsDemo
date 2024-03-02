import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowGifs from './screens/ShowGifs';
import Feedback from './screens/Feedback';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ShowGifs' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ShowGifs" component={ShowGifs} />
        <Stack.Screen name="Feedback" component={Feedback} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
