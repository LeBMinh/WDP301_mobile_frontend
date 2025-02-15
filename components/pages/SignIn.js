import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';

export default function SignIn({ navigation, setIsSignedIn }) {
    return (
        <ImageBackground
            source={require('../../assets/vxn-media/HomePage/Background.png')} // Change to your image path
            style={styles.container}
        >
            <Image
                source={require('../../assets/vxn-media/logo_vaccine.png')} // Replace with your image path
                style={styles.logo}
            />

            <Text style={styles.title}>Mời bạn đăng nhập</Text>

            <Text style={styles.inputName}>Tên</Text>
            <TextInput placeholder="Nhập Tên" style={styles.input} />
            <Text style={styles.inputName}>Mật khẩu</Text>
            <TextInput placeholder="Nhập mật khẩu" secureTextEntry style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={() => setIsSignedIn(true)}>
                <Text style={styles.buttonText}>Gửi</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate('SignUp')} style={styles.link}>
                Don't have an account? Sign Up
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
});
