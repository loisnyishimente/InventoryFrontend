import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';
import { DrawerActions, useNavigation } from '@react-navigation/native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

type DashboardNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC = () => {
  const navigation = useNavigation<DashboardNavigationProp>();

  return (
    <ScrollView style={styles.container}>
       {/* Back Button */}
       <TouchableOpacity 
          onPress={() => navigation.canGoBack() ? navigation.goBack() : null} 
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      <LinearGradient
        colors={['#007bff', '#0056b3']}
        style={styles.header}
      >
        
        <TouchableOpacity 
          onPress={() => navigation.canGoBack() ? navigation.goBack() : null} 
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Dashboard</Text>

        {/* Menu Icon */}
        <Text 
          style={styles.menuIcon}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
        >
          &#9776;
        </Text>
      </LinearGradient>

      <View style={[styles.card, styles.shadow]}>
        <Text style={styles.cardTitle}>Inventory Status</Text>
        <Text style={styles.cardText}>Total Items: <Text style={styles.boldText}>350</Text></Text>
        <Text style={styles.cardText}>Low Stock: <Text style={styles.boldTextRed}>5</Text></Text>
      </View>

      <View style={[styles.card, styles.shadow]}>
        <Text style={styles.cardTitle}>Sales Summary</Text>
        <Text style={styles.cardText}>Today: <Text style={styles.boldText}>$1,200</Text></Text>
        <Text style={styles.cardText}>This Week: <Text style={styles.boldText}>$8,450</Text></Text>
      </View>

      <View style={[styles.card, styles.shadow]}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <Text style={styles.cardText}>- 5 items need restocking.</Text>
        <Text style={styles.cardText}>- New order received for 10 units of Product A.</Text>
        <Text style={styles.cardText}>- Monthly sales report is ready.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 10,
    
    left: 15,
    top: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuIcon: {
    fontSize: 30,
    color: '#fff',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  boldTextRed: {
    fontWeight: 'bold',
    color: 'red',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default Dashboard;
