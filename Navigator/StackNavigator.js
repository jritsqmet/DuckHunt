import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Juego from '../Screens/Juego';
import Login from '../Screens/Login';
import Registro from '../Screens/Registro';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

      <Stack.Screen name="Juego" component={Juego} options={{ headerShown: false }} />

      <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}
