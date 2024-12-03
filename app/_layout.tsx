import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AdminDashboard from '../app/(tabs)/AdminDashboard';
import ManagerDashboard from '../app/(tabs)/ManagerDashboard';
import StaffDashboard from '../app/(tabs)/StaffDasboard';
import Login from '../app/(tabs)/Login';
import Signup from './(tabs)/Signup';


const Tab = createBottomTabNavigator();

const LayoutScreen = () => {



  return (
    <Tab.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
     
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Signup" component={Signup} />
          <Tab.Screen name="StaffDashboard" component={StaffDashboard} />
    </Tab.Navigator>
  );
};

export default LayoutScreen;
