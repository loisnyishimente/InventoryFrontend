import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


interface SaleFormState {
  customerName: string;
  product: string;
  quantity: string;
  price: string;
}

const SalesRecording: React.FC = () => {
  const [formData, setFormData] = useState<SaleFormState>({
    customerName: '',
    product: '',
    quantity: '',
    price: '',
  });

  const handleInputChange = (field: keyof SaleFormState, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveSale = () => {
  
    console.log('Sale recorded:', formData);
  
    setFormData({
      customerName: '',
      product: '',
      quantity: '',
      price: '',
    });
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

export default SalesRecording;
