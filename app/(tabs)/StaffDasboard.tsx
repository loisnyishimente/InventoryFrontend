
import { View, Text,TextInput,TouchableOpacity,FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import {useState} from 'react'
type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
};

const StaffDashboard = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState<number | string>('');
  const [price, setPrice] = useState<number | string>('');

  const handleAddProduct = () => {
    if (!name || !sku || !category || !quantity || !price) {
      alert('Please fill in all fields');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      sku,
      category,
      quantity: Number(quantity),
      price: Number(price),
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setName('');
    setSku('');
    setCategory('');
    setQuantity('');
    setPrice('');
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const handleUpdateProduct = (id: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, name, sku, category, quantity: Number(quantity), price: Number(price) } : product
    );
    setProducts(updatedProducts);
    setName('');
    setSku('');
    setCategory('');
    setQuantity('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Product Management</Text>

    <View style={styles.form}>
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="SKU"
        value={sku}
        onChangeText={setSku}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity.toString()}
        onChangeText={(text) => setQuantity(Number(text))}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Price"
        value={price.toString()}
        onChangeText={(text) => setPrice(Number(text))}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.productRow}>
          <Text style={styles.productText}>{item.name}</Text>
          <Text style={styles.productText}>{item.sku}</Text>
          <Text style={styles.productText}>{item.category}</Text>
          <Text style={styles.productText}>Qty: {item.quantity}</Text>
          <Text style={styles.productText}>$ {item.price}</Text>
          <TouchableOpacity
            onPress={() => handleDeleteProduct(item.id)}
            style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUpdateProduct(item.id)}
            style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  productText: {
    fontSize: 14,
    flex: 1,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  updateButtonText: {
    color: 'white',
  },
});


export default StaffDashboard;