import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';

const AddProductScreen: React.FC = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [SKU, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = async () => {
    console.log('handleAddProduct called');
  
    if (!name || !SKU || !category || !supplier || !quantity || !price) {
      console.log('Error: Please fill all fields.');
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
  
    try {
      console.log('Sending request to add product...');
      const response = await fetch('http://172.16.0.112:5000/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          SKU,
          category,
          supplier,
          quantity,
          price,
        }),
      });
  
      console.log('Response received:', response);
  
      if (response.ok) {
        console.log('Product added successfully');
        Alert.alert('Success', 'Product added successfully');
        navigation.goBack();
      } else {
        console.log('Error: Failed to add product');
        Alert.alert('Error', 'Failed to add product');
      }
    } catch (error) {
      console.log('Error adding product:', error);
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Something went wrong while adding the product');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="SKU"
        value={SKU}
        onChangeText={setSku}
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Supplier"
        value={supplier}
        onChangeText={setSupplier}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddProductScreen;
