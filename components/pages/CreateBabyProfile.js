import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateBabyProfile() {
    const [modalVisible, setModalVisible] = useState(false);
    const [gender, setGender] = useState(null);
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleCreateProfile = () => {
        setModalVisible(true); // Show modal when 'Tạo hồ sơ' button is pressed
        setTimeout(() => {
            setModalVisible(false);
        }, 2000); // Close after 2 seconds
    };

    const genderOptions = [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' }
    ];

    const provinces = [{ label: 'Hồ Chí Minh', value: 'hcm' }, { label: 'Hà Nội', value: 'hn' }];
    const districts = [{ label: 'Quận 1', value: 'q1' }, { label: 'Quận 2', value: 'q2' }];
    const wards = [{ label: 'Phường 1', value: 'p1' }, { label: 'Phường 2', value: 'p2' }];

    return (
        <SafeAreaProvider>
            <ImageBackground
                source={require('../../assets/vxn-media/HomePage/baby.png')} // Change to your image path
                style={styles.container}
            >
                <Text style={styles.title}>Tạo hồ sơ cho bé ở đây</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputName}>Tên của bé</Text>
                        <TextInput style={styles.input} placeholder="Nhập tên của bé" />
                        <TouchableOpacity onPress={() => setShowPicker(true)}>
                            <Text style={styles.input}>Chọn ngày: {date.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowPicker(false);
                                    if (selectedDate) setDate(selectedDate);
                                }}
                                maximumDate={new Date()} // Disable days after today
                            />
                        )}
                        <Text style={styles.inputName}>Họ tên ba hoặc mẹ (người giám hộ)</Text>
                        <TextInput style={styles.input} placeholder="Nhập tên ba hoặc mẹ" />
                        <Text style={styles.inputName}>Số điện thoại liên lạc</Text>
                        <TextInput style={styles.input} placeholder="Nhập số điện thoại" />
                        <Text style={styles.inputName}>Giới tính</Text>
                        <SwitchSelector
                            options={genderOptions}
                            initial={0}
                            onPress={value => setGender(value)}
                            buttonColor="#5D8AB0"         // Color of the selected button
                            backgroundColor="#E0E0E0"     // Background color of the switch
                            selectedColor="#FFFFFF"       // Text color of the selected option
                            textColor="#000000"
                            style={styles.switch}
                        />
                        <Text style={styles.inputName}>Tỉnh thành</Text>
                        <Dropdown
                            data={provinces}
                            labelField="label"
                            valueField="value"
                            placeholder="Chọn tỉnh thành"
                            value={province}
                            onChange={item => setProvince(item.value)}
                            style={styles.dropdown}
                        />
                        <Text style={styles.inputName}>Quận huyện</Text>
                        <Dropdown
                            data={districts}
                            labelField="label"
                            valueField="value"
                            placeholder="Chọn quận huyện"
                            value={district}
                            onChange={item => setDistrict(item.value)}
                            style={styles.dropdown}
                        />
                        <Text style={styles.inputName}>Phường xã</Text>
                        <Dropdown
                            data={wards}
                            labelField="label"
                            valueField="value"
                            placeholder="Chọn phường xã"
                            value={ward}
                            onChange={item => setWard(item.value)}
                            style={styles.dropdown}
                        />
                        <Text style={styles.inputName}>Số nhà, tên đường</Text>
                        <TextInput style={styles.input} placeholder="Nhập số nhà, tên đường" />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleCreateProfile}>
                        <Text style={styles.buttonText}>Tạo hồ sơ</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Modal */}
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
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
    title: { fontSize: 25, fontWeight: 'bold', color: "#5D8AB0", marginTop: 40, marginBottom: 10, textAlign: 'center' },
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
    switch: { margin: 10, width: 250, },
    dropdown: { width: 250, margin: 10, borderWidth: 1, borderRadius: 5, padding: 8, backgroundColor: "#FFFAFA" },

    // Modal Styles
    modalContainer: { flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: 'white', padding: 30, borderRadius: 10, alignItems: 'center' },
    modalText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#5D8AB0' },
});