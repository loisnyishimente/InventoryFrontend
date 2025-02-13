import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../app/(tabs)/Dashboard';
import { MaterialIcons } from '@expo/vector-icons';
import Inventory from '../app/(tabs)/Inventory';
import PurchaseHistory from './(tabs)/PurchaseHistory';
import SalesReports from '../app/(tabs)/SaleReport';
import Settings from '../app/(tabs)/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSIONS } from '../app/types/permissions'; // assuming this contains the roles and permissions

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const storedUser = await AsyncStorage.getItem('UserRole');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser.role);
      }
    };

    fetchUserRole();
  }, []);

  const hasAccess = (tabName: string) => {
    if (userRole && userRole in PERMISSIONS) {
      return PERMISSIONS[userRole as keyof typeof PERMISSIONS]?.includes(tabName);
    }
    return false;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#555',
      }}
    >
      {hasAccess('Dashboard') && (
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="dashboard" size={size} color={color} />
            ),
          }}
        />
      )}

      {hasAccess('Inventory') && (
        <Tab.Screen
          name="Inventory"
          component={Inventory}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="inventory" size={size} color={color} />
            ),
          }}
        />
      )}

      {hasAccess('PurchaseHistory') && (
        <Tab.Screen
          name="PurchaseHistory"
          component={PurchaseHistory}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="history" size={size} color={color} />
            ),
          }}
        />
      )}

      {hasAccess('SalesReports') && (
        <Tab.Screen
          name="SalesReports"
          component={SalesReports}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="assessment" size={size} color={color} />
            ),
          }}
        />
      )}

      {hasAccess('Settings') && (
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
