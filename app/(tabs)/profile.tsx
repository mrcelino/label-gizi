import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Definisi Tipe untuk Props ---

// Tipe untuk data target nutrisi
type NutritionTarget = {
  label: string;
  value: number;
  total: number;
  unit: string;
};

// Tipe untuk props komponen TargetItem
interface TargetItemProps {
  item: NutritionTarget;
}

// Tipe untuk props komponen ProfileMenuItem
interface ProfileMenuItemProps {
  icon: keyof typeof Feather.glyphMap; // Menggunakan tipe ikon dari Feather
  text: string;
  onPress: () => void;
  isLast?: boolean;
  color?: string;
}

// Data simulasi untuk target nutrisi
const nutritionTargets: NutritionTarget[] = [
  { label: 'Kalori', value: 1200, total: 2000, unit: 'kcal' },
  { label: 'Gula', value: 30, total: 50, unit: 'g' },
  { label: 'Garam', value: 800, total: 2000, unit: 'mg' },
];

// Komponen reusable untuk setiap item menu di profil
const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, text, onPress, isLast = false, color = '#1e293b' }) => (
  <TouchableOpacity 
    onPress={onPress} 
    className={`flex-row items-center p-4 ${!isLast ? 'border-b border-slate-100' : ''}`}
  >
    <View className="w-8">
      <Feather name={icon} size={20} color={color} />
    </View>
    <Text className="flex-1 text-base font-sans" style={{ color: color }}>{text}</Text>
    {color === '#1e293b' && <Feather name="chevron-right" size={20} color="#94a3b8" />}
  </TouchableOpacity>
);

// Komponen reusable untuk setiap item target nutrisi
const TargetItem: React.FC<TargetItemProps> = ({ item }) => {
  const progress = (item.value / item.total) * 100;
  return (
    <View className="mb-3">
      <View className="flex-row justify-between items-end mb-1">
        <Text className="font-semibold text-slate-700">{item.label}</Text>
        <Text className="text-sm font-sans text-slate-500">
          <Text className="font-semibold text-slate-700">{item.value}</Text> / {item.total} {item.unit}
        </Text>
      </View>
      <View className="w-full bg-slate-200 rounded-full h-2">
        <View style={{ width: `${progress}%` }} className="bg-blue-500 h-2 rounded-full" />
      </View>
    </View>
  );
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      className="flex-1 bg-slate-100"
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
    >
      {/* Bagian Header Profil */}
      <View className="items-center pt-16 pb-8 bg-white">
        <View className="w-24 h-24 bg-slate-200 rounded-full items-center justify-center mb-4">
          <Ionicons name="person-outline" size={60} color="#94a3b8" />
        </View>
        <Text className="text-2xl font-semibold text-slate-800">Marcelino</Text>
        <Text className="text-base font-sans text-slate-500 mt-1">marcelino@gmail.com</Text>
      </View>

      {/* Bagian Target Nutrisi Harian */}
      <View className="bg-white p-5 mx-5 rounded-2xl shadow-md -mt-8">
        <Text className="text-lg font-semibold text-slate-800 mb-4">Target Nutrisi Harian</Text>
        {nutritionTargets.map(item => <TargetItem key={item.label} item={item} />)}
      </View>

      {/* Menu Pengaturan */}
      <View className="mt-8 mx-5">
        <Text className="text-sm font-semibold text-gray-500 px-4 mb-2">PENGATURAN</Text>
        <View className="bg-white rounded-2xl overflow-hidden">
          <ProfileMenuItem icon="user" text="Edit Profil" onPress={() => {}} />
          <ProfileMenuItem icon="bell" text="Notifikasi" onPress={() => {}} />
          <ProfileMenuItem icon="shield" text="Keamanan & Privasi" onPress={() => {}} isLast />
        </View>
      </View>

      {/* Menu Keluar */}
      <View className="mt-8 mx-5">
        <View className="bg-white rounded-2xl overflow-hidden">
          <ProfileMenuItem icon="log-out" text="Keluar" onPress={() => {}} color="#ef4444" isLast />
        </View>
      </View>
    </ScrollView>
  );
}
