import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation'; 
import { DrawerActions } from '@react-navigation/native'; 


type DashboardNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
interface Props {
  navigation: DashboardNavigationProp;
}
const Dashboard: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
    
      <View style={styles.header}>
        <Text style={styles.headerText}>Inventory Dashboard</Text>
        <Text 
          style={styles.menuIcon}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
        >
          &#9776;
        </Text>
      </View>


      <View style={styles.card}>
        <Text style={styles.cardTitle}>Inventory Status</Text>
        <Text style={styles.cardText}>Total Items: <Text style={styles.boldText}>350</Text></Text>
        <Text style={styles.cardText}>Low Stock: <Text style={styles.boldTextRed}>5</Text></Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sales Summary</Text>
        <Text style={styles.cardText}>Today: <Text style={styles.boldText}>$1,200</Text></Text>
        <Text style={styles.cardText}>This Week: <Text style={styles.boldText}>$8,450</Text></Text>
      </View>


      <View style={styles.card}>
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
    backgroundColor: '#007bff',
    padding: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuIcon: {
    fontSize: 30,
    color: '#fff',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  boldTextRed: {
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Dashboard;
