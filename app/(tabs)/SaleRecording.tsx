import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

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

  const handleInputChange = (field: keyof SaleFormState, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveSale = async () => {
    try {
      const response = await fetch('http:///172.16.0.111:5000/api/sales/', {
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
      console.log(error)
      console.error('Error recording sale:', error);
      Alert.alert('Error', 'Could not connect to the server or invalid response.');
    }
  };
  

  return (
    <View style={styles.container}>
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

      <Button title="Save Sale" onPress={handleSaveSale} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
});

export default SaleRecording;
