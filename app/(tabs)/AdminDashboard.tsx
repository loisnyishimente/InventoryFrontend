
import { View, Text, Button } from 'react-native';

const AdminDashboard = ({ navigation }: any) => {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Admin Dashboard</Text>

      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default AdminDashboard;
