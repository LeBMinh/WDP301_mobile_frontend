import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchSelector from 'react-native-switch-selector';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from '../../utils/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateBabyProfile({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [childName, setChildName] = useState('');
    const [gender, setGender] = useState('male'); // Default to male
    const [birthDate, setBirthDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    
    // Separate fields for parents
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [fatherPhone, setFatherPhone] = useState('');
    const [motherPhone, setMotherPhone] = useState('');
    
    // Direct text inputs for address
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateProfile = async () => {
        try {
            setLoading(true);
            
            // Form validation
            if (!childName || !fatherName || !motherName || !fatherPhone || !motherPhone || 
                !streetAddress || !province || !district || !ward) {
                Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
                setLoading(false);
                return;
            }

            // Get user ID from storage
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                Alert.alert('Lỗi', 'Bạn cần đăng nhập lại');
                setLoading(false);
                return;
            }

            const userId = await AsyncStorage.getItem('userId');
            console.log('User ID từ AsyncStorage:', userId);
            if (!userId) {
                Alert.alert('Lỗi', 'Không thể xác định người dùng');
                setLoading(false);
                return;
            }

            // Format the address
            const fullAddress = `${streetAddress}, ${ward}, ${district}, ${province}`;
            
            // Prepare data for API with separate parent information
            const childData = {
                userId: parseInt(userId, 10),
                childrenFullname: childName,
                dob: birthDate.toISOString().split('T')[0],
                gender: gender,
                fatherFullName: fatherName,
                motherFullName: motherName,
                fatherPhoneNumber: fatherPhone,
                motherPhoneNumber: motherPhone,
                address: fullAddress
            };

            // Call the API to create child
            const response = await axios.post('/api/Child/create', childData);
            
            console.log('Child created successfully:', response.data);
            
            // Show success modal
            setModalVisible(true);
            
            // Close modal after 2 seconds and navigate
            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('MainPage'); // Adjust based on your navigation
            }, 2000);
            
        } catch (error) {
            console.error('Error creating child profile:', error.response?.data || error.message);
            
            let errorMessage = 'Đã có lỗi xảy ra khi tạo hồ sơ';
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            
            Alert.alert('Lỗi', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const genderOptions = [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' }
    ];

    return (
        <SafeAreaProvider>
            <ImageBackground
                source={require('../../assets/vxn-media/HomePage/baby.png')}
                style={styles.container}
            >
                <Text style={styles.title}>Tạo hồ sơ cho bé ở đây</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputName}>Tên của bé</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập tên của bé" 
                            value={childName}
                            onChangeText={setChildName}
                        />
                        
                        <Text style={styles.inputName}>Ngày sinh</Text>
                        <TouchableOpacity onPress={() => setShowPicker(true)}>
                            <Text style={styles.input}>
                                {birthDate.toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                        
                        {showPicker && (
                            <DateTimePicker
                                value={birthDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowPicker(false);
                                    if (selectedDate) setBirthDate(selectedDate);
                                }}
                                maximumDate={new Date()} // Disable days after today
                            />
                        )}
                        
                        <Text style={styles.inputName}>Giới tính</Text>
                        <SwitchSelector
                            options={genderOptions}
                            initial={0}
                            onPress={value => setGender(value)}
                            buttonColor="#5D8AB0"
                            backgroundColor="#E0E0E0"
                            selectedColor="#FFFFFF"
                            textColor="#000000"
                            style={styles.switch}
                        />
                        
                        {/* Father information */}
                        <Text style={styles.inputName}>Họ tên ba</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập họ tên ba" 
                            value={fatherName}
                            onChangeText={setFatherName}
                        />
                        
                        <Text style={styles.inputName}>Số điện thoại ba</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập số điện thoại ba" 
                            value={fatherPhone}
                            onChangeText={setFatherPhone}
                            keyboardType="phone-pad"
                        />
                        
                        {/* Mother information */}
                        <Text style={styles.inputName}>Họ tên mẹ</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập họ tên mẹ" 
                            value={motherName}
                            onChangeText={setMotherName}
                        />
                        
                        <Text style={styles.inputName}>Số điện thoại mẹ</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập số điện thoại mẹ" 
                            value={motherPhone}
                            onChangeText={setMotherPhone}
                            keyboardType="phone-pad"
                        />
                        
                        {/* Address fields - all as text inputs now */}
                        <Text style={styles.inputName}>Tỉnh thành</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập tỉnh thành" 
                            value={province}
                            onChangeText={setProvince}
                        />
                        
                        <Text style={styles.inputName}>Quận huyện</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập quận huyện" 
                            value={district}
                            onChangeText={setDistrict}
                        />
                        
                        <Text style={styles.inputName}>Phường xã</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập phường xã" 
                            value={ward}
                            onChangeText={setWard}
                        />
                        
                        <Text style={styles.inputName}>Số nhà, tên đường</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập số nhà, tên đường" 
                            value={streetAddress}
                            onChangeText={setStreetAddress}
                        />
                    </View>

                    <TouchableOpacity 
                        style={[styles.button, loading && styles.buttonDisabled]} 
                        onPress={handleCreateProfile}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Đang xử lý...' : 'Tạo hồ sơ'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Success Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>🎉 Chúc mừng bạn đã đăng ký hồ sơ cho bé thành công! 🎉</Text>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
    title: { fontSize: 25, fontWeight: 'bold', color: "#5D8AB0", marginTop: 40, marginBottom: 10, textAlign: 'center' },
    inputContainer: { alignItems: 'center' },
    inputName: { fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start', marginHorizontal: 10 },
    input: { width: 280, padding: 10, margin: 10, borderWidth: 1, borderRadius: 5, backgroundColor: "#FFFAFA" },
    button: {
        backgroundColor: "#5D8AB0",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    switch: { margin: 10, width: 250, },
    modalContainer: { flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: 'white', padding: 30, borderRadius: 10, alignItems: 'center' },
    modalText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#5D8AB0' },
});