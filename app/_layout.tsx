
import { createStackNavigator } from '@react-navigation/stack';
import Login from './(tabs)/Login';
import Signup from './(tabs)/Signup';
import AddProduct from './(tabs)/AddProduct';
import TabNavigator from './TabNavigator';
import SaleRecording from './(tabs)/SaleRecording';
const Stack = createStackNavigator();

const LayoutScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="SaleRecording" component={SaleRecording} />
     
    </Stack.Navigator>
    
  );
};

export default LayoutScreen;
