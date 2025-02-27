import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../app/(tabs)/Dashboard';
import { MaterialIcons } from '@expo/vector-icons';
import Inventory from '../app/(tabs)/Inventory';
import PurchaseHistory from '../app/(tabs)/PurchaseHistory';
import SalesReports from '../app/(tabs)/SaleReport';
import Settings from '../app/(tabs)/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSIONS } from '../app/types/permissions'; // Ensure this file exists

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const storedUserRole = await AsyncStorage.getItem('userRole');  // Ensure correct key
        console.log("Retrieved userRole from AsyncStorage:", storedUserRole);

        if (storedUserRole) {
          setUserRole(storedUserRole);
        }
      } catch (error) {
        console.error("Error retrieving user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const hasAccess = (tabName: string) => {
    console.log(`Checking access for: ${tabName}, userRole: ${userRole}`);

    if (userRole && userRole in PERMISSIONS) {
      const allowed = PERMISSIONS[userRole as keyof typeof PERMISSIONS]?.includes(tabName);
      console.log(`Access for ${tabName}:`, allowed);
      return allowed;
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

      {/* Ensure at least one tab is always available */}
      {!hasAccess('Dashboard') &&
        !hasAccess('Inventory') &&
        !hasAccess('PurchaseHistory') &&
        !hasAccess('SalesReports') &&
        !hasAccess('Settings') && (
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
    </Tab.Navigator>
  );
};

export default TabNavigator;
