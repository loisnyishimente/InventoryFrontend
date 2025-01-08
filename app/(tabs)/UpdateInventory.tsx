import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { updateInventoryItem } from '../api/Api';
import { InventoryItem } from '../types/InventoryItem';
import { RouteProp } from '@react-navigation/native';

interface UpdateInventoryScreenProps {
  route: RouteProp<{ params: { item: InventoryItem } }, 'params'>;
}

const UpdateInventoryScreen: React.FC<UpdateInventoryScreenProps> = ({ route }) => {
  const { item } = route.params;

  const [name, setName] = useState(item.name);
  const [sku, setSku] = useState(item.sku);
  const [category, setCategory] = useState(item.category);
  const [supplier, setSupplier] = useState(item.supplier);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [price, setPrice] = useState(item.price.toString());

  const handleUpdate = async () => {
    try {
      // Convert quantity and price to numbers
      const updatedItem = {
        name,
        sku,
        category,
        supplier,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
      };

      await updateInventoryItem(item.id, updatedItem);
      Alert.alert('Success', 'Inventory item updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update inventory item.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="SKU" value={sku} onChangeText={setSku} style={styles.input} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
      <TextInput placeholder="Supplier" value={supplier} onChangeText={setSupplier} style={styles.input} />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Update Inventory" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { marginBottom: 10, borderColor: 'gray', borderWidth: 1, padding: 10 },
});

export default UpdateInventoryScreen;
