import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      // Container utama yang mengambang (dari contoh 1)
      className="absolute left-5 right-5 p-1 bg-sky-400 flex-row justify-around items-center rounded-[30px] shadow-lg"
      style={{
        bottom: insets.bottom + 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
      }}
    >
      {state.routes.map((route, index) =>{
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

        const Icon = options.tabBarIcon
          ? options.tabBarIcon({
              color: isFocused ? 'white' : 'rgba(255, 255, 255, 0.7)',
              focused: isFocused,
              size: 16,
            })
          : null;
        
        // Periksa apakah ini tombol tengah (berdasarkan nama rute)
        const isCenterButton = route.name === 'scan';

        if (isCenterButton) {
          // Render tombol tengah yang lebih besar dan menonjol
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="size-20 items-center justify-center bg-sky-500 rounded-full shadow-md"
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
                  color: 'white',
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
            className={`flex-1 flex-col items-center justify-center py-1 rounded-2xl mx-1 ${isFocused ? 'bg-sky-500/50' : 'bg-transparent'}`}
          >
            {Icon}
            <Text className={`text-sm mt-1 ${isFocused ? 'text-white' : 'text-white/70'}`}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
