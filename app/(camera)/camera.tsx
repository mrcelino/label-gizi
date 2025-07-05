import { useRef, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };
  
  const handleConfirm = () => {
    if(photoUri) {
        console.log("Menggunakan foto:", photoUri);
        router.back();
    }
  };

  if (!permission) {
    return <View className="flex-1 justify-center items-center p-5" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-base text-center mb-5">Izin kamera diperlukan.</Text>
        <TouchableOpacity onPress={requestPermission} className="bg-blue-500 py-3 px-5 rounded-lg">
          <Text className="text-white text-base font-bold">Berikan Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {photoUri ? (
        <View className="flex-1">
          <Image source={{ uri: photoUri }} className="flex-1 resize-contain" />
          <View
            className="absolute w-full flex-row justify-around px-5"
            style={{ bottom: insets.bottom + 30 }}
          >
            <TouchableOpacity
              onPress={() => setPhotoUri(null)}
              className="bg-red-500 py-4 px-6 rounded-full flex-row items-center"
            >
              <Feather name="x" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-2">Ambil Ulang</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="bg-green-600 py-4 px-6 rounded-full flex-row items-center"
            >
              <Feather name="check" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-2">Gunakan Foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
        <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef} />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-5 p-2 bg-black bg-opacity-40 rounded-full z-10"
            style={{ top: insets.top + 20 }}
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View
            className="absolute left-0 right-0 items-center z-10"
            style={{ bottom: insets.bottom + 40 }}
          >
            <TouchableOpacity
              onPress={takePicture}
              className="w-20 h-20 rounded-full bg-white bg-opacity-90 border-4 border-white border-opacity-50 flex items-center justify-center"
            >
              <View className="w-16 h-16 rounded-full bg-white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
