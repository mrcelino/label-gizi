import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Feather name="camera" size={80} color="white" />
      <Text style={styles.title}>Label Gizi</Text>
      <Text style={styles.subtitle}>Pindai dan pahami label nutrisi makanan dalam sekejap.</Text>
      <TouchableOpacity  onPress={() => router.push("/(camera)/camera")} style={styles.button}>
        <Feather name="maximize" size={24} color="black" />
        <Text style={styles.buttonText}>Mulai Memindai</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3b82f6', padding: 32 },
  title: { fontSize: 40, fontWeight: 'bold', color: 'white', marginTop: 16 },
  subtitle: { fontSize: 18, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 8, marginBottom: 64 },
  button: { backgroundColor: 'white', padding: 16, borderRadius: 999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '80%' },
  buttonText: { color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
});
