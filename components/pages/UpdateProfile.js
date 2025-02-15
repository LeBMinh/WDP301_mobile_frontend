import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UpdateProfile() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleUpdateProfile = () => {
        setModalVisible(true); // Show modal when 'Cập nhật' button is pressed
        setTimeout(() => {
            setModalVisible(false);
        }, 2000); // Close after 2 seconds
    };

    return (
        <ImageBackground
            source={require('../../assets/vxn-media/HomePage/Background.png')} // Change to your image path
            style={styles.container}
        >
            <Text style={styles.title}>Cập nhật thông tin người dùng</Text>

            <Text style={styles.inputName}>Tên</Text>
            <TextInput placeholder="Nhập Tên" style={styles.input} />
            <Text style={styles.inputName}>Email</Text>
            <TextInput placeholder="Nhập email của bạn" style={styles.input} />
            <Text style={styles.inputName}>Mật khẩu cũ</Text>
            <TextInput placeholder="Nhập mật khẩu cũ" secureTextEntry style={styles.input} />
            <Text style={styles.inputName}>Mật khẩu mới</Text>
            <TextInput placeholder="Nhập mật khẩu mới" secureTextEntry style={styles.input} />
            <Text style={styles.inputName}>Nhập lại mật khẩu mới</Text>
            <TextInput placeholder="Nhập lại mật khẩu mới" secureTextEntry style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Cập nhật</Text>
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
                        <Text style={styles.modalText}>🎉 Chúc mừng bạn đã cập nhật thông tin tài khoản thành công! 🎉</Text>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    inputName: { fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start', marginHorizontal: 70 },
    input: { width: 250, padding: 10, margin: 10, borderWidth: 1, borderRadius: 5 },
    button: {
        backgroundColor: "#5D8AB0",
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
        marginHorizontal: 10
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },

    // Modal Styles
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: 'white', padding: 30, borderRadius: 10, alignItems: 'center' },
    modalText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#5D8AB0' },
});