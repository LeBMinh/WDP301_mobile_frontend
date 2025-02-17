import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function VaccinationBooking() {
  const [modalVisible, setModalVisible] = useState(false);
  const [guardant, setGuardant] = useState(null);
  const [vaccine, setVaccine] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleVaccineBooking = () => {
    setModalVisible(true); // Show modal when 'Tạo hồ sơ' button is pressed
    setTimeout(() => {
      setModalVisible(false);
    }, 2000); // Close after 2 seconds
  };

  const guardants = [
    { label: 'Cha', value: 'Father' },
    { label: 'Mẹ', value: 'Mother' },
    { label: 'Anh', value: 'Brother' },
    { label: 'Chị', value: 'Sister' }
  ];

  const vaccineOptions = [
    { label: 'Vắc xin gói', value: 'Vaccine package' },
    { label: 'Vắc xin lẻ', value: 'Individual vaccines' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đặt lịch tiêm</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.titleDes}>Đăng ký thông tin tiêm chủng để tiết
          kiệm thời gian khi đến làm thủ tục tại quầy Lễ tân cho Quý Khách hàng,
          việc đăng ký thông
          tin tiêm chủng chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.infoTitle}>Thông tin người tiêm</Text>
          <Text style={styles.inputName}>Họ tên người tiêm</Text>
          <TextInput style={styles.input} placeholder="Nhập tên người tiêm" />

          <Text style={styles.infoTitle}>Thông tin liên hệ</Text>
          <Text style={styles.inputName}>Họ tên người liên hệ</Text>
          <TextInput style={styles.input} placeholder="Nhập tên người liên hệ" />
          <Text style={styles.inputName}>Mối quan hệ với người tiêm</Text>
          <Dropdown
            data={guardants}
            labelField="label"
            valueField="value"
            placeholder="Chọn mối quan hệ với người tiêm"
            value={guardant}
            onChange={item => setGuardant(item.value)}
            style={styles.dropdown}
          />
          <Text style={styles.inputName}>Số điện thoại người liên hệ</Text>
          <TextInput style={styles.input} placeholder="Nhập sđt người liên hệ" />

          <Text style={styles.infoTitle}>Thông tin dịch vụ</Text>
          <SwitchSelector
            options={vaccineOptions}
            initial={0}
            onPress={value => setVaccine(value)}
            buttonColor="#5D8AB0"         // Color of the selected button
            backgroundColor="#E0E0E0"     // Background color of the switch
            selectedColor="#FFFFFF"       // Text color of the selected option
            textColor="#000000"
            style={styles.switch}
          />

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
              minimumDate={new Date()} // Disable days before today
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVaccineBooking}>
          <Text style={styles.buttonText}>Hoàn thành đăng ký</Text>
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
            <Text style={styles.modalText}>🎉 Chúc mừng bạn đã đặt lịch thành công! 🎉</Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, backgroundColor: "#FFFFFF", },
  title: { fontSize: 28, fontWeight: 'bold', color: "#5D8AB0", marginBottom: 10, textAlign: 'center' },
  titleDes: { fontSize: 15, color: "#6D6E70", marginBottom: 10 },
  infoTitle: { fontSize: 17, fontWeight: 'bold', textTransform: 'uppercase', color: "#6D6E70", marginBottom: 10, marginTop: 15 },
  inputName: { fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start', marginHorizontal: 10 },
  input: { width: 280, padding: 10, margin: 10, borderWidth: 1, borderRadius: 5, backgroundColor: "#FFFAFA" },
  button: {
    backgroundColor: "#5D8AB0",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 110,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  },
  switch: { margin: 10, width: 250, },
  dropdown: { width: 280, margin: 10, borderWidth: 1, borderRadius: 5, padding: 8, backgroundColor: "#FFFAFA" },

  // Modal Styles
  modalContainer: { flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 30, borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#5D8AB0' },
});