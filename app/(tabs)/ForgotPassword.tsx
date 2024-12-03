
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post('http://your-backend-url/forgot-password', { email });
      Alert.alert('Success', 'Password reset email sent!');
    } catch (error) {
    console.log(error)
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />
      <TouchableOpacity onPress={handlePasswordReset} style={{ backgroundColor: 'orange', padding: 12, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
