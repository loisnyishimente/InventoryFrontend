import React, { useState, useEffect } from "react";
import { View, TextInput, Alert, ScrollView,Button } from "react-native";
import { addProduct, fetchCategories, fetchWarehouses } from "../api/products";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  AddProduct: undefined;
};

type AddProductScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddProduct'>;

interface AddProductScreenProps {
  navigation: AddProductScreenNavigationProp;
}

export default function AddProductScreen({ navigation }: AddProductScreenProps) {
  const [name, setName] = useState("");
  const [SKU, setSKU] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState("");
  const [warehouse, setWarehouse] = useState("");

  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
        const warehouseData = await fetchWarehouses();
        setWarehouses(warehouseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!name || !SKU || !stock || !price || !category || !warehouse) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addProduct({
        name,
        SKU,
        stock: parseInt(stock),
        price: parseFloat(price),
        barcode,
        category_id: Number(category), 
        warehouse_id: Number(warehouse),
      });
      Alert.alert("Success", "Product added successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to add product. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <TextInput placeholder="Product Name" value={name} onChangeText={setName} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="SKU" value={SKU} onChangeText={setSKU} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Barcode" value={barcode} onChangeText={setBarcode} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Warehouse" value={warehouse} onChangeText={setWarehouse} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <Button title="Save Product" onPress={handleSubmit} />
    </ScrollView>
  );
}
