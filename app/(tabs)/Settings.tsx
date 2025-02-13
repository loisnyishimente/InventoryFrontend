import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';
import { PERMISSIONS } from '../types/permissions';

interface User {
  name: string;
  email: string;
  role: keyof typeof PERMISSIONS; 
}

const Settings: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userRole');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userRole');
    navigation.replace('Login');
  };

  const hasAccess = (feature: string) => {
    return user && PERMISSIONS[user.role]?.includes(feature);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Profile Information</Text>
        {user ? (
          <>
            <Text style={styles.profileDetail}>👤 Name: {user.name}</Text>
            <Text style={styles.profileDetail}>📧 Email: {user.email}</Text>
            <Text style={styles.profileDetail}>🔖 Role: {user.role}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>No user data found.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  profileDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {  // Add the missing style here
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});


export default Settings;
