import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      {/* 1. Layar Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      {/* 2. Layar Bandingkan */}
      <Tabs.Screen
        name="compare"
        options={{
          title: 'Compare',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'git-compare' : 'git-compare-outline'} size={28} color={color} />
          ),
        }}
      />
      {/* 3. Layar Pindai (Scan) */}
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Pindai',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'scan-circle' : 'scan-circle-outline'} size={28} color={color} />
          ),
        }}
      />
      {/* 4. Layar Riwayat */}
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'time' : 'time-outline'} size={24} color={color} />
          ),
        }}
      />
      {/* 5. Layar Profil */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
