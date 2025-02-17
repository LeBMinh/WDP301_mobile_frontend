import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Pressable, Modal, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Profile({ setIsSignedIn }) {
  const navigation = useNavigation();

  // State for children list and loading status
  const [childrenList, setChildrenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  // Simulate fetching child profiles
  useEffect(() => {
    const fetchChildren = async () => {
      setLoading(true);
      // Simulate API call with setTimeout
      setTimeout(() => {
        const fetchedChildren = [
          { id: 1, name: 'Bé An' },
          { id: 2, name: 'Bé Bình' },
        ];
        setChildrenList(fetchedChildren);
        setSelectedChild(fetchedChildren[0] || null);
        setLoading(false);
      }, 1000); // Simulate 1s delay
    };

    fetchChildren();
  }, []);

  const handleLogout = () => {
    setIsSignedIn(false);
    navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  };

  const handleSelectChild = (child) => {
    setSelectedChild(child);
    setModalVisible(false);
    navigation.navigate('BabyProfile', { childId: child.id });
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
        {/* Child Profile Dropdown */}
        {loading ? (
          <ActivityIndicator size="large" color="#5D8AB0" />
        ) : childrenList.length === 0 ? (
          <Text style={styles.noChildText}>Không có hồ sơ trẻ nào</Text>
        ) : (
          <TouchableOpacity
            style={styles.stackNavigateBtn}
            onPress={() =>
              childrenList.length > 1
                ? setModalVisible(true)
                : navigation.navigate('BabyProfile', { childId: selectedChild?.id })
            }
          >
            <View style={styles.stackNavigateLeftContainer}>
              <MaterialCommunityIcons name="baby-face" size={28} color="#5D8AB0" />
              <Text style={styles.stackNavigateTitle}>
                {selectedChild ? selectedChild.name : 'Hồ sơ trẻ'}
              </Text>
            </View>
            <MaterialIcons name="arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        )}

        {/* Child Selection Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Chọn Hồ sơ trẻ</Text>
              <FlatList
                data={childrenList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.childItem}
                    onPress={() => handleSelectChild(item)}
                  >
                    <Text style={styles.childName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Payment History */}
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
  noChildText: { fontSize: 16, fontStyle: 'italic', color: '#888', textAlign: 'center', marginVertical: 20 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: 300, backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  childItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' },
  childName: { fontSize: 16, color: '#34495E' },
  closeButton: { marginTop: 12, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#5D8AB0' },
  closeButtonText: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
  logoutBtn: { backgroundColor: "#ffe5e5", paddingVertical: 10, marginHorizontal: 30, borderRadius: 5, marginTop: 30, alignItems: 'center', marginBottom: 20 },
  logoutText: { color: "#cb1a1a", fontSize: 16, fontWeight: "bold" },
});