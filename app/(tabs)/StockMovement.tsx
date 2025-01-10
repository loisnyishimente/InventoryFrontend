import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Corrected import


// Type definitions for stock movement data
interface StockMovementData {
  product: string;
  inflow: number;
  outflow: number;
}

const StockMovementReports: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<string>('daily'); // Default to daily report
  const [stockData, setStockData] = useState<StockMovementData[] | null>(null); // Stock data state

  // Function to fetch stock movement data based on selected time period
  const fetchStockData = (period: string): void => {
    // Simulating fetching data
    const data: Record<string, StockMovementData[]> = {
      daily: [
        { product: 'Laptop', inflow: 20, outflow: 15 },
        { product: 'Phone', inflow: 30, outflow: 25 },
      ],
      weekly: [
        { product: 'Laptop', inflow: 100, outflow: 75 },
        { product: 'Phone', inflow: 150, outflow: 125 },
      ],
      monthly: [
        { product: 'Laptop', inflow: 400, outflow: 300 },
        { product: 'Phone', inflow: 600, outflow: 500 },
      ],
    };

    setStockData(data[period]);
  };

  // Fetch stock movement data whenever the time period changes
  useEffect(() => {
    fetchStockData(timePeriod);
  }, [timePeriod]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Movement Reports</Text>

      <Picker
        selectedValue={timePeriod}
        onValueChange={(itemValue) => setTimePeriod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>

      {stockData ? (
        <View style={styles.stockData}>
          {stockData.map((item, index) => (
            <View key={index} style={styles.stockItem}>
              <Text>{item.product}</Text>
              <Text>Inflow: {item.inflow}</Text>
              <Text>Outflow: {item.outflow}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>No data available</Text>
      )}

      {/* Button to refresh stock movement data */}
      <Button title="View Report" onPress={() => fetchStockData(timePeriod)} />
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
  stockData: {
    marginBottom: 20,
  },
  stockItem: {
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
});

export default StockMovementReports;
