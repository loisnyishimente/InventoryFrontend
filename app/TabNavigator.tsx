
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../app/(tabs)/Dashboard';
import { MaterialIcons } from '@expo/vector-icons';
import Inventory from '../app/(tabs)/Inventory';
import PurchaseHistory from './(tabs)/PurchaseHistory';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#555',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" size={size} color={color} />
          ),
        }}
      />
        <Tab.Screen
        name="Purchase History"
        component={PurchaseHistory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
   
    </Tab.Navigator>
  );
};

export default TabNavigator;
