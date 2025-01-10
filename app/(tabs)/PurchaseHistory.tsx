import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation'; 

interface PurchaseHistoryItem {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: string;
}

const PurchaseHistoryScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp <RootStackParamList>>();
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);

  useEffect(() => {
   
    const fetchedHistory: PurchaseHistoryItem[] = [
      { id: '1', customer: 'John Doe', product: 'Laptop', date: '2024-01-01', amount: '$1200' },
      { id: '2', customer: 'Jane Smith', product: 'Phone', date: '2024-01-02', amount: '$800' },
      { id: '3', customer: 'Samuel Jackson', product: 'Tablet', date: '2024-01-03', amount: '$600' },
    ];
    setPurchaseHistory(fetchedHistory);
  }, []);

  const renderItem = ({ item }: { item: PurchaseHistoryItem }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Customer: {item.customer}</Text>
      <Text style={styles.itemText}>Product: {item.product}</Text>
      <Text style={styles.itemText}>Date: {item.date}</Text>
      <Text style={styles.itemText}>Amount: {item.amount}</Text>
    </View>
  );

  const handleAddSale = () => {
    navigation.navigate('SaleRecording'); 
  };

  const handleDownloadPDF = async () => {
   
    const htmlContent = `
      <h1>Purchase History</h1>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr><th>Customer</th><th>Product</th><th>Date</th><th>Amount</th></tr>
        ${purchaseHistory.map(item => `
          <tr>
            <td>${item.customer}</td>
            <td>${item.product}</td>
            <td>${item.date}</td>
            <td>${item.amount}</td>
          </tr>`).join('')}
      </table>
    `;

    const options = {
      html: htmlContent,
      fileName: 'purchase_history',
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF generated at:', file.filePath);
    
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase History</Text>

      <FlatList
        data={purchaseHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Sale" onPress={handleAddSale} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Download PDF" onPress={handleDownloadPDF} />
      </View>
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
  list: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default PurchaseHistoryScreen;
