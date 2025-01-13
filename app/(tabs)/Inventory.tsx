import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';
import { Picker } from '@react-native-picker/picker';

interface Product {
  id: number;
  name: string;
  stock: number;
  sku: string;
  category: string;
  batches: { batchNo: string; expiryDate: string }[]; // batch tracking
}

const dummyData: Product[] = [
  {
    id: 1,
    name: 'Smartphone',
    stock: 3,
    sku: 'SP123',
    category: 'Electronics',
    batches: [
      { batchNo: 'B001', expiryDate: '2025-01-01' },
      { batchNo: 'B002', expiryDate: '2025-06-01' },
    ],
  },
  {
    id: 2,
    name: 'Sofa Set',
    stock: 10,
    sku: 'SF456',
    category: 'Furniture',
    batches: [{ batchNo: 'B003', expiryDate: '2025-12-01' }],
  },
  {
    id: 3,
    name: 'Jeans',
    stock: 1,
    sku: 'J789',
    category: 'Clothing',
    batches: [{ batchNo: 'B004', expiryDate: '2024-12-31' }],
  },
];

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockItems, setLowStockItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All', 'Electronics', 'Furniture', 'Clothing']);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://172.16.0.112:5000/api/products/get');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      setProducts(data);

      const lowStock = data.filter((product) => product.stock < 5);
      setLowStockItems(lowStock);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use dummy data if fetch fails
      setProducts(dummyData);

      const lowStock = dummyData.filter((product) => product.stock < 5);
      setLowStockItems(lowStock);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://172.16.0.112:5000/api/products/${id}`, { method: 'DELETE' });
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

  const handleStockUpdate = (product: Product) => {
    Alert.alert('Action', `Update stock functionality for ${product.name} triggered.`);
  };

  const handleViewBatchDetails = (product: Product) => {
    Alert.alert('Batch Details', JSON.stringify(product.batches, null, 2));
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter((product) =>
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === 'All' || product.category === categoryFilter)
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productRow}>
      <Text>{item.name}</Text>
      <Text>{item.sku}</Text>
      <Text>{item.category}</Text>
      <Text>{item.stock}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleUpdate(item)}>
          <MaterialIcons name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStockUpdate(item)} style={styles.updateButton}>
          <MaterialIcons name="arrow-upward" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleViewBatchDetails(item)} style={styles.viewMovementButton}>
          <MaterialIcons name="history" size={24} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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

      <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, SKU, or category"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />

      <View style={styles.categoryFilterContainer}>
        <Text>Filter by Category:</Text>
        <Picker
          selectedValue={categoryFilter}
          onValueChange={(itemValue) => setCategoryFilter(itemValue)}
          style={styles.picker}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Product</Text>
            <Text style={styles.headerText}>SKU</Text>
            <Text style={styles.headerText}>Category</Text>
            <Text style={styles.headerText}>Stock</Text>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  alertContainer: { backgroundColor: '#ffcccc', padding: 10, marginBottom: 16, borderRadius: 8 },
  alertTitle: { fontWeight: 'bold', color: 'red', marginBottom: 5 },
  alertText: { color: 'red', fontSize: 14 },
  addButton: { backgroundColor: 'blue', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 5, alignSelf: 'flex-start', marginBottom: 16 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, marginBottom: 16 },
  categoryFilterContainer: { marginBottom: 16 },
  picker: { height: 40, width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  actionButtons: { flexDirection: 'row', alignItems: 'center' },
  deleteButton: { marginLeft: 16 },
  updateButton: { marginLeft: 16 },
  viewMovementButton: { marginLeft: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#f4f4f4' },
  headerText: { fontWeight: 'bold', flex: 1, textAlign: 'center', fontSize: 14 },
});

export default Inventory;
