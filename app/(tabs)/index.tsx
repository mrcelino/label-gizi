import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Data simulasi untuk riwayat pindaian
const recentScans = [
  { id: 1, name: 'Sereal Cokelat', score: 'C', color: '#f59e0b' },
  { id: 2, name: 'Yogurt Strawberry', score: 'A', color: '#22c55e' },
  { id: 3, name: 'Keripik Kentang', score: 'D', color: '#ef4444' },
  { id: 4, name: 'Jus Apel Kotak', score: 'B', color: '#84cc16' },
];

// Komponen kecil untuk kartu pindaian terakhir
type RecentScan = {
  id: number;
  name: string;
  score: string;
  color: string;
};

const RecentScanCard = ({ item }: { item: RecentScan }) => (
  <TouchableOpacity className="bg-white rounded-2xl p-4 w-[140px] items-center mr-4">
    <View style={{ backgroundColor: item.color }} className="w-10 h-10 rounded-full items-center justify-center mb-3">
      <Text className="text-white text-lg font-bold">{item.score}</Text>
    </View>
    <Text className="text-sm font-sans text-center text-slate-700">{item.name}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      className="flex-1 bg-slate-100 px-5"
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header untuk sambutan personal */}
      <View className="pt-[60px] pb-5 flex-row justify-between items-center">
        <View>
          <Text className="text-base text-slate-500">Selamat Pagi,</Text>
          <Text className="text-2xl font-bold text-slate-800">Pengguna!</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="person-circle-outline" size={40} color="#334155" />
        </TouchableOpacity>
      </View>

      {/* Kartu Aksi Utama */}
      <TouchableOpacity onPress={() => router.push("/(camera)/camera")}>
        <LinearGradient
          colors={['#38bdf8', '#3b82f6']}
          // Nativewind tidak bisa diterapkan di semua komponen, jadi style tetap di sini
          style={{
            padding: 24,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#3b82f6',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Feather name="maximize" size={32} color="white" />
          <View className="ml-4">
            <Text className="text-xl font-bold text-white">Pindai Label Gizi</Text>
            <Text className="text-sm text-white/80">Arahkan kamera untuk memulai</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Aksi Cepat Sekunder */}
      <View className="flex-row justify-between mt-6">
        <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center w-[48%] shadow-sm" onPress={() => router.push('/(tabs)/compare')}>
          <Ionicons name="scale-outline" size={24} color="#3b82f6" />
          <Text className="ml-3 text-base font-semibold text-slate-700">Bandingkan</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center w-[48%] shadow-sm" onPress={() => router.push('/(tabs)/chat')}>
          <Ionicons name="time-outline" size={24} color="#3b82f6" />
          <Text className="ml-3 text-base font-semibold text-slate-700">Riwayat</Text>
        </TouchableOpacity>
      </View>

      {/* Riwayat Pindaian Terakhir */}
      <View className="mt-8">
        <Text className="text-lg font-semibold text-slate-800 mb-3">Pindaian Terakhir</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentScans.map(item => <RecentScanCard key={item.id} item={item} />)}
        </ScrollView>
      </View>

      {/* Tips Sehat Hari Ini */}
      <View className="mt-8">
        <Text className="text-lg font-semibold text-slate-800 mb-3">Tips Sehat Hari Ini</Text>
        <View className="bg-green-100 rounded-2xl p-4 flex-row items-center">
          <Ionicons name="bulb-outline" size={24} color="#059669" />
          <Text className="flex-1 ml-3 text-green-800 text-sm">
            Perhatikan jumlah gula tambahan pada minuman kemasan. Seringkali lebih tinggi dari yang Anda kira!
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}
