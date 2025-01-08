import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation'; 
// Define types for the product
interface Product {
  id: number;
  name: string;
  stock: number;
}

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockItems, setLowStockItems] = useState<Product[]>([]);
  const navigation = useNavigation<StackNavigationProp <RootStackParamList>>();
  // Fetch products from the server
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://172.16.0.107:5000/api/products/get');
      
      // Check if response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: Product[] = await response.json();
      setProducts(data);
  
      // Check for low stock items
      const lowStock = data.filter((product) => product.stock < 5);
      setLowStockItems(lowStock);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://172.16.0.107:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      Alert.alert('Success', 'Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  const handleAddProduct = () => {

    navigation.navigate('AddProduct');
  };

  const handleUpdate = (product: Product) => {
    Alert.alert('Action', `Edit product functionality for ${product.name} triggered.`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productRow}>
      <Text>{item.name}</Text>
      <Text>{item.stock}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleUpdate(item)}>
          <MaterialIcons name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Stock Alerts */}
      {lowStockItems.length > 0 && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Low Stock Alerts:</Text>
          {lowStockItems.map((item) => (
            <Text key={item.id} style={styles.alertText}>
              {item.name} - {item.stock} left
            </Text>
          ))}
        </View>
      )}

      {/* Add Product Button */}
      <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>

      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Product</Text>
            <Text style={styles.headerText}>Stock</Text>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  alertContainer: {
    backgroundColor: '#ffcccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  alertTitle: {
    fontWeight: 'bold',
    color: 'red',
  },
  alertText: {
    color: 'red',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  deleteButton: {
    marginLeft: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default Inventory;
