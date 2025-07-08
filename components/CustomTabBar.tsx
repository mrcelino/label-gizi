import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      // Container utama yang mengambang dengan latar belakang putih
      className="absolute left-5 right-5 p-2 bg-white flex-row justify-around items-center rounded-full shadow-lg"
      style={{
        bottom: insets.bottom + 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // Periksa apakah ini tombol tengah (berdasarkan nama rute)
        const isCenterButton = route.name === 'scan';

        // Mendefinisikan warna ikon berdasarkan fokus
        const iconColor = isFocused ? '#3b82f6' : '#6b7280'; // Biru saat fokus, abu-abu saat tidak

        const Icon = options.tabBarIcon
          ? options.tabBarIcon({
              color: iconColor,
              focused: isFocused,
              size: 24,
            })
          : null;

        if (isCenterButton) {
          // Render tombol tengah yang lebih besar dan menonjol
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="w-16 h-16 items-center justify-center bg-blue-500 rounded-full shadow-md"
              style={{
                // Mengangkat tombol ke atas
                transform: [{ translateY: -20 }],
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 10,
              }}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: 'white', // Ikon di tengah selalu putih
                  focused: isFocused,
                  size: 32, // Ukuran ikon lebih besar
                })}
            </TouchableOpacity>
          );
        }

        // Render tombol biasa
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className={`flex-1 flex-col items-center justify-center py-2 rounded-2xl mx-1 ${isFocused ? '' : 'bg-transparent'}`}
          >
            {Icon}
            <Text className={`text-[10px] mt-1 font-semibold ${isFocused ? 'text-blue-600' : 'text-gray-500'}`}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
