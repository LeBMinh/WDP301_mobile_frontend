import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, StyleSheet, Alert } from 'react-native';
import axios from '../../utils/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function SignIn({ navigation, setIsSignedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            
            // Validate input
            if (!email || !password) {
                Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu');
                return;
            }
    
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert('Lỗi', 'Email không hợp lệ');
                return;
            }
    
            // Gọi API login với endpoint chính xác từ routes
            const response = await axios.post('/api/User/login', {
                email: email.toLowerCase().trim(),
                password
            });
    
            console.log('Full response:', response.data);
    
            // Lưu token vào AsyncStorage
            if (response.data) {
                // Store token
                const token = response.data.token || response.data; // Xử lý cả 2 trường hợp: token có thể là một trường trong response.data hoặc toàn bộ response.data là token
                await AsyncStorage.setItem('userToken', token);
            
                if (response.data.userId) {
                    await AsyncStorage.setItem('userId', response.data.userId.toString());
                    console.log('User ID from response:', response.data.userId);
                } else {
                    try {
                        // Giải mã token để lấy thông tin payload
                        const decodedToken = jwtDecode(response.data.token);
                        console.log('Decoded token structure:', decodedToken);
                
                        // Lấy userId từ decoded token hoặc từ phản hồi API
                        const userId = decodedToken.Id || decodedToken.id || decodedToken.userId || response.data.userId;
                        console.log('User ID from token or response:', userId);
                
                        if (userId) {
                            await AsyncStorage.setItem('userId', userId.toString()); // Lưu userId vào AsyncStorage
                        } else {
                            console.log('User ID not found in token or response');
                
                            // Nếu không tìm thấy userId, thử gọi API để lấy thông tin user
                            try {
                                const userResponse = await axios.get('/api/User/profile', {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                });
                
                                if (userResponse.data && userResponse.data.id) {
                                    await AsyncStorage.setItem('userId', userResponse.data.id.toString());
                                } else {
                                    console.log('User ID not found in profile response');
                                }
                            } catch (profileError) {
                                console.error('Error fetching user profile:', profileError);
                            }
                        }
                    } catch (decodeError) {
                        console.error('Error decoding token:', decodeError);
                
                        // Fallback: Nếu không giải mã được token, thử lấy userId từ phản hồi API
                        if (response.data.userId) {
                            await AsyncStorage.setItem('userId', response.data.userId.toString());
                        } else {
                            console.log('User ID not found in response');
                        }
                    }
                }

                
            
                // Sau khi lưu, kiểm tra lại userId trong AsyncStorage
                const storedUserId = await AsyncStorage.getItem('userId');
                console.log('Stored user ID:', storedUserId);
            
                // Đăng nhập thành công
                setIsSignedIn(true);
                Alert.alert('Thành công', 'Đăng nhập thành công!');
            }
    
           

        } catch (error) {
            let errorMessage = 'Đã có lỗi xảy ra';
            
            // Log error to debug
            console.error('Login error:', error.response?.data || error.message);
            
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
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

            <Text style={styles.title}>Mời bạn đăng nhập</Text>

            <Text style={styles.inputName}>Email</Text>
            <TextInput 
                placeholder="Nhập email" 
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

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </Text>
            </TouchableOpacity>

            <Text onPress={() => navigation.navigate('SignUp')} style={styles.link}>
                Chưa có tài khoản? Đăng ký ngay
            </Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    logo: { width: 100, height: 100},
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
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
});