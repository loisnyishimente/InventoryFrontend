import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';

interface SaleFormState {
  customerName: string;
  product: string;
  quantity: string;
  price: string;
}

const SaleRecording: React.FC = () => {
  const [formData, setFormData] = useState<SaleFormState>({
    customerName: '',
    product: '',
    quantity: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof SaleFormState, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveSale = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://172.16.0.111:5000/api/sales/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Server error:', error);
        throw new Error('Failed to record the sale.');
      }

      const result = await response.json();
      Alert.alert('Success', 'Sale recorded successfully!');
      console.log('Sale recorded:', result);

      setFormData({
        customerName: '',
        product: '',
        quantity: '',
        price: '',
      });
    } catch (error) {
      console.error('Error recording sale:', error);
      Alert.alert('Error', 'Could not connect to the server or invalid response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sales Recording</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          value={formData.customerName}
          onChangeText={(text) => handleInputChange('customerName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Product"
          value={formData.product}
          onChangeText={(text) => handleInputChange('product', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          keyboardType="numeric"
          value={formData.quantity}
          onChangeText={(text) => handleInputChange('quantity', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={formData.price}
          onChangeText={(text) => handleInputChange('price', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveSale} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save Sale</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SaleRecording;
