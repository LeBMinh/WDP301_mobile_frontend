import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Profile({ route, setIsSignedIn }) {
  const navigation = useNavigation();

  const handleLogout = () => {
    setIsSignedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileUpdateContainer}>
        <View style={styles.profileLeftContainer}>
          <Ionicons name="person-circle" size={45} color="#5D8AB0" />
          <View style={styles.profileLeftContent}>
            <Text style={styles.profileLeftTitle}>Username here</Text>
            <Text style={styles.profileLeftDes}>Cập nhật thông tin cá nhân</Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate('UpdateProfile')}>
          <AntDesign name="infocirlce" size={20} color="gray" />
        </Pressable>
      </View>

      <View style={styles.stackNavigateContainer}>
        <TouchableOpacity style={styles.stackNavigateBtn} onPress={() => navigation.navigate('BabyProfile')}>
          <View style={styles.stackNavigateLeftContainer}>
            <MaterialCommunityIcons name="baby-face" size={28} color="#5D8AB0" />
            <Text style={styles.stackNavigateTitle}>Hồ sơ trẻ</Text>
          </View>
          <MaterialIcons name="arrow-right" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.stackNavigateBtn} onPress={() => navigation.navigate('PaymentHistory')}>
          <View style={styles.stackNavigateLeftContainer}>
            <MaterialIcons name="payment" size={28} color="#5D8AB0" />
            <Text style={styles.stackNavigateTitle}>Lịch sử giao dịch</Text>
          </View>
          <MaterialIcons name="arrow-right" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: "#FFFFFF", },
  profileUpdateContainer: { display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, backgroundColor: "#f5faff", paddingVertical: 20, paddingHorizontal: 10, },
  profileLeftContainer: { display: "flex", flexDirection: "row", gap: 20, alignItems: 'center' },
  profileLeftContent: {},
  profileLeftTitle: { fontSize: 18, color: "#000" },
  profileLeftDes: { fontSize: 14, color: "#333333" },
  stackNavigateContainer: {},
  stackNavigateBtn: { display: "flex", flexDirection: "row", justifyContent: 'space-between', backgroundColor: "#f5faff", paddingVertical: 20, paddingHorizontal: 10, marginBottom: 10 },
  stackNavigateLeftContainer: { display: "flex", flexDirection: "row", gap: 20, alignItems: 'center' },
  stackNavigateTitle: { fontSize: 20, color: "#000" },
  logoutBtn: { backgroundColor: "#ffe5e5", paddingVertical: 10, marginHorizontal: 30, borderRadius: 5, marginTop: 30, alignItems: 'center', marginBottom: 20 },
  logoutText: { color: "#cb1a1a", fontSize: 16, fontWeight: "bold" },
});