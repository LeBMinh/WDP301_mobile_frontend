import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Table, Row, Rows } from 'react-native-table-component';


export default function BabyProfile() {
    const [modalVisible, setModalVisible] = useState(false);
    const [gender, setGender] = useState(null);
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [checked, setChecked] = useState({});

    const rows = [
        'Lao',
        'Viêm gan B',
        'Bạch hầu, ho gà, uốn ván',
        'Bại liệt',
        'Viêm phổi, viêm màng não mủ do Hib',
        'Tiêu chảy do Rota Virus',
        'Viêm phổi, viêm màng não, viêm tai giữa do phế cầu khuẩn',
        'Viêm màng não, nhiễm khuẩn huyết, viêm phổi do não mô cầu khuẩn B, C',
        'Cúm',
        'Sởi',
        'Viêm màng não, nhiễm khuẩn huyết, viêm phổi do não mô cầu khuẩn A,C,W,Y',
        'Viêm não Nhật Bản',
        'Sởi, Quai bị, Rubella',
        'Thủy đậu',
        'Viêm gan A',
        'Viêm gan A + B',
        'Thương hàn',
        'Bệnh tả',
    ];

    const columns = ['Sơ sinh', '2 tháng', '3 tháng', '4 tháng', '6 tháng', '7 tháng', '8 tháng', '9 tháng', '10-11 tháng', '12 tháng', '18 tháng', '2 tuổi', '3-4 tuổi', '5-6 tuổi', '7-8 tuổi'];

    const toggleCheck = (rowIndex, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        setChecked((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleUpdateProfile = () => {
        setModalVisible(true); // Show modal when 'Cập nhật hồ sơ' button is pressed
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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Hồ sơ trẻ</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.infoTitle}>Thông tin người tiêm</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputName}>Tên của bé</Text>
                    <TextInput style={styles.input} placeholder="Nhập tên của bé" />
                    <Text style={styles.inputName}>Ngày sinh của bé</Text>
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
                    <TextInput style={styles.input} placeholder="Số nhà, tên đường" />
                    <Text style={styles.inputName}>Họ tên người giám hộ</Text>
                    <TextInput style={styles.input} placeholder="Tên ba hoặc mẹ" />
                    <Text style={styles.inputName}>Số điện thoại liên hệ</Text>
                    <TextInput style={styles.input} placeholder="Số điện thoại liên hệ" />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                    <Text style={styles.buttonText}>Cập nhật thông tin</Text>
                </TouchableOpacity>


                <View style={styles.injectSuggestContainer}>
                    <Text style={styles.infoTitle}>Gợi ý mũi tiêm:</Text>
                    <Text style={styles.suggText}>Viêm màng não, nhiễm khuẩn huyết, viêm phổi do não mô cầu khuẩn B,C</Text>
                    <Text style={styles.suggText}>Tiêu chảy do Rota Virus</Text>
                    <Text style={styles.suggText}>Viêm màng não nhiễm khuẩn huyết, viêm phổi do não mô cầu khuẩn A,C,W,Y</Text>
                </View>

                <View>
                    <Text style={styles.infoTitle}>Hồ sơ tiêm chủng:</Text>
                    <Text style={styles.injectInfo}>Người giám hộ có thể đánh giấu X vào các Vaccin mà bé đã được tiêm trước đó:</Text>
                    
                    <Text style={styles.tableTitle}>XÁC NHẬN TIÊM CHỦNG CHO TRẺ TỪ 0-8 TUỔI</Text>

                    <ScrollView style={styles.tableContainer} horizontal>
                        <View>
                            <View style={styles.headerRow} accessible accessibilityRole="header">
                                <Text style={styles.headerCellZero}>Mũi tiêm</Text>
                                {columns.map((col, index) => (
                                    <Text key={index} style={styles.headerCell}>{col}</Text>
                                ))}
                            </View>
                            {rows.map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.row} accessible accessibilityLabel={`Hàng ${row}`}>
                                    <Text style={styles.rowHeader}>{row}</Text>
                                    {columns.map((_, colIndex) => (
                                        <TouchableOpacity
                                            key={colIndex}
                                            style={[styles.cell, checked[`${rowIndex}-${colIndex}`] && styles.checkedCell]}
                                            onPress={() => toggleCheck(rowIndex, colIndex)}
                                            accessible
                                            accessibilityLabel={`Checkbox ${row} - ${columns[colIndex]}`}
                                            accessibilityRole="checkbox"
                                            accessibilityState={{ checked: checked[`${rowIndex}-${colIndex}`] }}
                                            accessibilityHint="Nhấn để chọn hoặc bỏ chọn"
                                        >
                                            {checked[`${rowIndex}-${colIndex}`] && (
                                                <Text style={styles.checkMark} accessible={false}>✓</Text>
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Cập nhật mũi tiêm</Text>
                    </TouchableOpacity>
                </View>
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
                        <Text style={styles.modalText}>🎉 Chúc mừng bạn đã cập nhật hồ sơ cho bé thành công! 🎉</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 10, paddingTop: 30, backgroundColor: "#FFFFFF", },
    title: { fontSize: 28, fontWeight: 'bold', color: "#5D8AB0", marginBottom: 20, textAlign: 'center' },
    // Form cập nhật thông tin cá nhân của bé
    infoTitle: { fontSize: 17, fontWeight: 'bold', textTransform: 'uppercase', color: "#6D6E70", marginBottom: 10 },
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
    // Mục Gợi ý mũi tiêm 
    injectSuggestContainer: { marginVertical: 20, marginRight: 50 },
    suggText: { fontSize: 12, color: "#333333", marginBottom: 5 },
    injectInfo: { fontSize: 14, color: "#6D6E70", marginBottom: 20 },
    // Bảng HỒ SƠ TIÊM CHỦNG
    tableTitle:{ fontSize: 24, color: "#5D8AB0", fontWeight: 'bold',textAlign: 'center', marginVertical: 20},
    tableContainer: { flex: 1, padding: 10, backgroundColor: '#F3F6FA' },
    headerRow: { flexDirection: 'row', backgroundColor: '#D1E7FD' },
    headerCellZero: { padding: 10, fontWeight: 'bold', minWidth: 500, height: 'auto', textAlign: 'center', fontSize: 14 },
    headerCell: { padding: 10, fontWeight: 'bold', minWidth: 100, height: 'auto', textAlign: 'center', fontSize: 14 },
    row: { flexDirection: 'row', minWidth: 100, height: 'auto' },
    rowHeader: { padding: 15, fontWeight: 'bold', minWidth: 500, height: 60, textAlign: 'left', fontSize: 13, flexWrap: 'wrap',  },
    cell: { width: 100, height: 'auto', borderWidth: 1, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
    checkedCell: { backgroundColor: '#4CAF50' },
    checkMark: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

    // Modal Styles
    modalContainer: { flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: 'white', padding: 30, borderRadius: 10, alignItems: 'center' },
    modalText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#5D8AB0' },
});