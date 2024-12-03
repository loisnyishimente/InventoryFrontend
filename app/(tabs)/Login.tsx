import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../navigation/navigation'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      // Make the POST request using fetch
      const response = await fetch('http://192.168.8.152:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        throw new Error(`Login failed with status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log('API Response:', data); // Log the entire response to debug

      const { token, role } = data;

      // Check if the token and role are valid before proceeding
      if (token && role) {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('StaffDashboard');
      } else {
        Alert.alert('Error', 'Invalid response from server. Token or role missing.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Login</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />
      
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'blue', padding: 12, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={{ marginTop: 16, alignItems: 'center' }}>
        <Text style={{ color: 'blue' }}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{ marginTop: 16, alignItems: 'center' }}>
        <Text style={{ color: 'blue' }}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
