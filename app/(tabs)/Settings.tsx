import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';

interface User {
  name: string;
  email: string;
  role: string;
}

const Settings: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleCameraAccess = () => {
    const cameraAccess = false; // Simulating camera access denied
    if (!cameraAccess) {
      Alert.alert(
        'Camera Access Denied',
        'Unable to access your camera. Please check your device settings and grant camera permissions.',
        [{ text: 'OK' }]
      );
    } else {
      navigation.navigate('ScanQRCode');
    }
  };

  const navigateToGenerateQRCode = () => {
    navigation.navigate('GenerateQRCode');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.userInfo}>
        <Text style={styles.userTitle}>User Information</Text>
        {user ? (
          <>
            <Text style={styles.userDetail}>Name: {user.name}</Text>
            <Text style={styles.userDetail}>Email: {user.email}</Text>
            <Text style={styles.userDetail}>Role: {user.role}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading user data...</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCameraAccess}>
        <Text style={styles.buttonText}>Scan QR/Barcode</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={navigateToGenerateQRCode}>
        <Text style={styles.buttonText}>Generate QR/Barcode</Text>
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
  logoutButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default Settings;
