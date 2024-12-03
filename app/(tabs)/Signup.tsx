// File: app/(tabs)/Signup.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation'; 
import { StackNavigationProp } from '@react-navigation/stack';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Staff');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleSignup = async () => {
    try {
      const response = await fetch('http://192.168.8.152:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      // Log the response as text to check what is being returned
      const textResponse = await response.text();  // Read the response as text
      console.log('Response Text:', textResponse); // Log the raw response
  
      // Check if response is ok (status code 2xx)
      if (!response.ok) {
        // If it's not okay, display an error message
        Alert.alert('Error', 'Signup failed: ' + textResponse || 'Unknown error');
        return;
      }
  
      // Now, try to parse it as JSON if it's valid
      const data = JSON.parse(textResponse);  // Explicitly parse the text response
      Alert.alert('Success', 'Signup successful!');
      navigation.navigate('Login');
    } catch (error) {
      // Log detailed error and show a generic network error
      console.error('Network or parsing error:', error);
      Alert.alert('Error', 'Network error, please try again.');
    }
  };
  
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Signup</Text>
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
    <TextInput
  placeholder="Role"
  value={role}
  onChangeText={setRole} 
  style={{ borderBottomWidth: 1, marginBottom: 16 }}
/>

      <TouchableOpacity onPress={handleSignup} style={{ backgroundColor: 'green', padding: 12, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
