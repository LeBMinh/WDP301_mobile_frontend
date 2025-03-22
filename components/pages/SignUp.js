import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Modal, StyleSheet, Alert } from 'react-native';
import axios from '../../utils/axiosConfig';

export default function SignUp({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            setLoading(true);

            // Validate input
            if (!username || !email || !password || !confirmPassword) {
                Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert('Lỗi', 'Email không hợp lệ');
                return;
            }

            // Validate password match
            if (password !== confirmPassword) {
                Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp');
                return;
            }

            // Validate password length
            if (password.length < 6) {
                Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
                return;
            }

            // Log dữ liệu gửi đi
            const signUpData = {
                username: username.trim(),
                email: email.toLowerCase().trim(),
                password,
                confirmPassword,
                role: 'user',
                children: []
            };
            console.log('Sending registration data:', signUpData);

            // Gọi API đăng ký
            const response = await axios.post('/api/User/registration', signUpData);
            console.log('Registration response:', response.data);

            if (response.data) {
                console.log('Registration successful:', response.data);
                setModalVisible(true);
                
                setTimeout(() => {
                    setModalVisible(false);
                    navigation.navigate('SignIn');
                }, 2000);
            }

        } catch (error) {
            let errorMessage = 'Đã có lỗi xảy ra';
            
            // Log chi tiết lỗi
            console.error('Registration error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
                
                // Xử lý các trường hợp lỗi cụ thể
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Thông tin không hợp lệ: ' + errorMessage;
                        break;
                    case 409:
                        errorMessage = 'Email đã tồn tại trong hệ thống';
                        break;
                    case 500:
                        errorMessage = 'Lỗi server: ' + errorMessage;
                        break;
                    default:
                        errorMessage = 'Lỗi: ' + errorMessage;
                }
            }
            
            Alert.alert('Lỗi', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/vxn-media/HomePage/Background.png')}
            style={styles.container}
        >
            <Image
                source={require('../../assets/vxn-media/logo_vaccine.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>Đăng ký ở đây</Text>

            <Text style={styles.inputName}>Tên</Text>
            <TextInput 
                placeholder="Nhập Tên" 
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />
            
            <Text style={styles.inputName}>Email</Text>
            <TextInput 
                placeholder="Nhập email của bạn" 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <Text style={styles.inputName}>Mật khẩu</Text>
            <TextInput 
                placeholder="Nhập mật khẩu" 
                secureTextEntry 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            
            <Text style={styles.inputName}>Nhập lại mật khẩu</Text>
            <TextInput 
                placeholder="Nhập lại mật khẩu" 
                secureTextEntry 
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleSignUp}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Đang xử lý...' : 'Gửi'}
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            🎉 Chúc mừng bạn đã đăng ký tài khoản thành công! 🎉
                        </Text>
                    </View>
                </View>
            </Modal>

            <Text onPress={() => navigation.navigate('SignIn')} style={styles.link}>
                Đã có tài khoản? Đăng nhập
            </Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    logo: { width: 100, height: 100 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    inputName: { fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start', marginHorizontal: 80 },
    input: { width: 250, padding: 10, margin: 10, borderWidth: 1, borderRadius: 5 },
    button: {
        backgroundColor: "#5D8AB0",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold"
    },
    link: { color: 'blue', marginTop: 50 },

    // Modal Styles
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
    modalText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#5D8AB0' },
    buttonDisabled: {
        backgroundColor: "#A9A9A9",
    },
});
