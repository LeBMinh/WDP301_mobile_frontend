import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Modal, StyleSheet } from 'react-native';

export default function SignUp({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSignUp = () => {
        setModalVisible(true); // Show modal when Sign Up button is pressed
        setTimeout(() => {
            setModalVisible(false);
            navigation.navigate('SignIn'); // Navigate to Sign In page after closing modal
        }, 2000); // Close after 2 seconds
    };

    return (
        <ImageBackground
            source={require('../../assets/vxn-media/HomePage/Background.png')} // Change to your image path
            style={styles.container}
        >
            <Image
                source={require('../../assets/vxn-media/logo_vaccine.png')} // Replace with your image path
                style={styles.logo}
            />

            <Text style={styles.title}>Đăng ký ở đây</Text>

            <Text style={styles.inputName}>Tên</Text>
            <TextInput placeholder="Nhập Tên" style={styles.input} />
            <Text style={styles.inputName}>Email</Text>
            <TextInput placeholder="Nhập email của bạn" style={styles.input} />
            <Text style={styles.inputName}>Mật khẩu</Text>
            <TextInput placeholder="Nhập mật khẩu" secureTextEntry style={styles.input} />
            <Text style={styles.inputName}>Nhập lại mật khẩu</Text>
            <TextInput placeholder="Nhập lại mật khẩu" secureTextEntry style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Gửi</Text>
            </TouchableOpacity>
            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>🎉 Chúc mừng bạn đã đăng ký tài khoản thành công! 🎉</Text>
                    </View>
                </View>
            </Modal>

            <Text onPress={() => navigation.navigate('SignIn')} style={styles.link}>
                Already have an account? Sign In
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
});
