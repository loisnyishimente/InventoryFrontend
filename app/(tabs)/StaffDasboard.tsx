import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getInventory, deleteInventoryItem, getStockAlerts } from '../api/Api';
import { InventoryItem } from '../types/InventoryItem';

const InventoryScreen = ({ navigation }: { navigation: any }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    fetchInventory();
    fetchAlerts();
  }, []);

  const fetchInventory = async () => {
    try {
      const data: InventoryItem[] = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const data: string[] = await getStockAlerts();
      setAlerts(data);
    } catch (error) {
      console.log(error)
      console.error('Failed to fetch stock alerts:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteInventoryItem(id);
      fetchInventory();
    } catch (error) {
      console.log(error)
      console.error('Failed to delete inventory item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: InventoryItem }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>SKU: {item.sku}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Supplier: {item.supplier}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ${item.price}</Text>
          
            <Button title="Edit" onPress={() => navigation.navigate('UpdateInventory', { item })} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        )}
      />
      <Text style={styles.alertTitle}>Stock Alerts:</Text>
      {alerts.map((alert, index) => (
        <Text key={index} style={styles.alert}>
          {alert}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { marginBottom: 15, padding: 10, borderWidth: 1,
    borderColor: 'gray',
  },
  alertTitle: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  alert: {
    color: 'red',
  },
});

export default InventoryScreen;