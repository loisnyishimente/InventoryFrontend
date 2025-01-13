import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SalesData {
  product: string;
  sales: number;
  total: string;
}

interface StockMovementData {
  product: string;
  inFlow: number;
  outFlow: number;
  total: string;
}

const SalesStockReports: React.FC = () => {
  const [reportType, setReportType] = useState<string>('sales');
  const [salesData, setSalesData] = useState<SalesData[] | null>(null);
  const [stockMovementData, setStockMovementData] = useState<StockMovementData[] | null>(null);

  const fetchSalesData = (period: string): void => {
    const data: Record<string, SalesData[]> = {
      daily: [
        { product: 'Laptop', sales: 30, total: '$24,000' },
        { product: 'Phone', sales: 50, total: '$15,000' },
      ],
      weekly: [
        { product: 'Laptop', sales: 150, total: '$120,000' },
        { product: 'Phone', sales: 250, total: '$75,000' },
      ],
      monthly: [
        { product: 'Laptop', sales: 600, total: '$480,000' },
        { product: 'Phone', sales: 1000, total: '$300,000' },
      ],
    };

    setSalesData(data[period]);
  };

  const fetchStockMovementData = (period: string): void => {
    const data: Record<string, StockMovementData[]> = {
      daily: [
        { product: 'Laptop', inFlow: 20, outFlow: 10, total: '10' },
        { product: 'Phone', inFlow: 50, outFlow: 30, total: '20' },
      ],
      weekly: [
        { product: 'Laptop', inFlow: 100, outFlow: 50, total: '50' },
        { product: 'Phone', inFlow: 200, outFlow: 120, total: '80' },
      ],
      monthly: [
        { product: 'Laptop', inFlow: 400, outFlow: 200, total: '200' },
        { product: 'Phone', inFlow: 1000, outFlow: 600, total: '400' },
      ],
    };

    setStockMovementData(data[period]);
  };

  const fetchData = (period: string): void => {
    if (reportType === 'sales') {
      fetchSalesData(period);
    } else {
      fetchStockMovementData(period);
    }
  };

  useEffect(() => {
    fetchData('daily');
  }, [reportType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales & Stock Movement Reports</Text>

      <Picker
        selectedValue={reportType}
        onValueChange={(itemValue) => setReportType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sales Report" value="sales" />
        <Picker.Item label="Stock Movement Report" value="stockMovement" />
      </Picker>

      {reportType === 'sales' ? (
        <View style={styles.dataContainer}>
          {salesData ? (
            salesData.map((item, index) => (
              <View key={index} style={styles.dataItem}>
                <Text>{item.product}</Text>
                <Text>Sales: {item.sales}</Text>
                <Text>Total Revenue: {item.total}</Text>
              </View>
            ))
          ) : (
            <Text>No sales data available</Text>
          )}
        </View>
      ) : (
        <View style={styles.dataContainer}>
          {stockMovementData ? (
            stockMovementData.map((item, index) => (
              <View key={index} style={styles.dataItem}>
                <Text>{item.product}</Text>
                <Text>Inflow: {item.inFlow}</Text>
                <Text>Outflow: {item.outFlow}</Text>
                <Text>Total Stock: {item.total}</Text>
              </View>
            ))
          ) : (
            <Text>No stock movement data available</Text>
          )}
        </View>
      )}

      <Picker
        selectedValue="daily"
        onValueChange={(itemValue) => fetchData(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setReportType(reportType === 'sales' ? 'stockMovement' : 'sales')}
      >
        <Text style={styles.buttonText}>
          Switch to {reportType === 'sales' ? 'Stock Movement' : 'Sales'} Report
        </Text>
      </TouchableOpacity>
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  dataContainer: {
    marginBottom: 20,
  },
  dataItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SalesStockReports;
