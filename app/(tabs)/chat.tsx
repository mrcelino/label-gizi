import React, { useState, useRef, FC } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Definisi Tipe ---
interface Message {
  id: number;
  text: string;
  user: boolean;
}

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

// Contoh pertanyaan untuk memulai percakapan
const suggestionChips: string[] = [
  'Apa itu kalori defisit?',
  'Manfaat protein untuk tubuh',
  'Apakah gula aren lebih sehat?',
];

// Komponen untuk setiap gelembung chat
const ChatBubble: FC<ChatBubbleProps> = ({ message, isUser }) => (
  <View className={`flex-row items-end mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
    {!isUser && (
      <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-2">
        <Ionicons name="sparkles" size={18} color="white" />
      </View>
    )}
    <View 
      className={`max-w-[80%] p-3 rounded-2xl ${isUser ? 'bg-blue-500 rounded-br-none' : 'bg-white rounded-bl-none'}`}
    >
      <Text className={`font-sans text-base ${isUser ? 'text-white' : 'text-slate-800'}`}>
        {message}
      </Text>
    </View>
  </View>
);

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Halo! Saya asisten gizi Anda. Ada yang bisa saya bantu hari ini?', user: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim().length === 0) return;

    // Tambahkan pesan pengguna
    const userMessage: Message = { id: Date.now(), text: input, user: true };
    
    // Simulasi jawaban dari chatbot
    const botResponse: Message = { id: Date.now() + 1, text: 'Tentu, saya akan carikan informasi mengenai itu...', user: false };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput('');

    // Scroll ke bawah setelah mengirim pesan
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: '#f1f5f9' }}
      keyboardVerticalOffset={90}
    >
      <View className="flex-1" style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View className="p-4 border-b border-slate-200 bg-white">
          <Text className="text-lg font-semibold text-slate-800 text-center">Asisten Gizi</Text>
        </View>

        {/* Area Chat */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 pt-4"
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {messages.map(msg => (
            <ChatBubble key={msg.id} message={msg.text} isUser={msg.user} />
          ))}
        </ScrollView>
        
        {/* Perbaikan: Container untuk input dan saran dengan margin bawah */}
        <View style={{ marginBottom: 70 }}>
          {/* Suggestion Chips */}
          <View className="px-4 pb-2">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {suggestionChips.map((chip, index) => (
                <TouchableOpacity 
                  key={index} 
                  className="bg-white border border-slate-200 rounded-full px-4 py-2 mr-2"
                  onPress={() => setInput(chip)}
                >
                  <Text className="font-sans text-blue-500">{chip}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Input Area */}
          <View 
            className="flex-row mx-6 rounded-3xl mb-16 items-center p-2 border-t border-slate-200 bg-white"
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ketik pertanyaan Anda..."
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 mr-2 font-sans text-base"
            />
            <TouchableOpacity 
              onPress={handleSend}
              className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center"
            >
              <Feather name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
