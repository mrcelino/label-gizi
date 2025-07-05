import { Stack } from 'expo-router';

export default function CameraLayout() {
  // Layout ini hanya akan berlaku untuk layar di dalam folder (camera)
  // dan akan menyembunyikan header untuk semua layar tersebut.
  return <Stack screenOptions={{ headerShown: false }} />;
}
