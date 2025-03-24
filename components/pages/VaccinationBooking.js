import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from '../../utils/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VaccinationBooking({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [children, setChildren] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [vaccinePackages, setVaccinePackages] = useState([]);
  const [pendingVaccines, setPendingVaccines] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedPending, setSelectedPending] = useState('');
  const [vaccineType, setVaccineType] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Lấy danh sách trẻ em
  useEffect(() => {
    const fetchChildren = async () => {
      try {
          const token = await AsyncStorage.getItem('userToken');
          const userId = await AsyncStorage.getItem('userId');
          console.log(`Fetching children for userId: ${userId}`); // Log userId
  
          const response = await axios.get(`/api/Child/get-all?FilterOn=userId&FilterQuery=${userId}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Children fetched:', response.data); // Log dữ liệu trẻ em
  
          setChildren(response.data?.$values || []);
      } catch (error) {
          console.error('Error fetching children:', error.config.url, error.message); // Log URL và lỗi
          Alert.alert('Lỗi', 'Không thể tải danh sách trẻ em');
      }
  };
    
    fetchChildren();
  }, []);

  // Lấy danh sách bệnh
  // Trong phần lấy danh sách bệnh
useEffect(() => {
  const fetchDiseases = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); 
      const response = await axios.get('/api/Disease/get-all', {
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      // Thêm debug log
      console.log('Disease API response:', JSON.stringify(response.data));
      
      // Kiểm tra cấu trúc dữ liệu và làm phẳng nếu cần
      let diseasesData = [];
      if (response.data && response.data.$values) {
        diseasesData = response.data.$values;
        console.log('Found $values array with', diseasesData.length, 'items');
      } else if (Array.isArray(response.data)) {
        diseasesData = response.data;
        console.log('Data is direct array with', diseasesData.length, 'items');
      } else {
        console.error('Unexpected data structure:', response.data);
      }
      
      // Kiểm tra từng item có đúng cấu trúc không
      diseasesData.forEach((item, index) => {
        console.log(`Disease ${index}:`, item.id, item.name);
      });
      
      setDiseases(diseasesData);
    } catch (error) {
      console.error('Lỗi fetch diseases:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách bệnh');
    }
  };
  
  fetchDiseases();
}, []);

  // Lấy vaccine theo bệnh
  // Sửa trong VaccinationBooking.js
useEffect(() => {
  const fetchVaccines = async () => {
    if (!selectedDisease) return;
    
    try {
      // Thay đổi từ đường dẫn hiện tại
      // const response = await axios.get(`/api/Vaccine/get-vaccines-by-diasease-name/${selectedDisease}`);
      
      // Sang đường dẫn đúng trong diseaseController
      const response = await axios.get(`/api/Vaccine/get-vaccines-by-diasease-name/${encodeURIComponent(selectedDisease)}`);
      console.log('Vaccine API response:', JSON.stringify(response.data));
      
      // Cấu trúc dữ liệu từ API
      let vaccinesData = [];
      if (response.data && response.data.$values) {
        vaccinesData = response.data.$values;
      } else if (Array.isArray(response.data)) {
        vaccinesData = response.data;
      }
      
      setVaccines(vaccinesData);
    } catch (error) {
      console.error('Lỗi khi lấy vaccine:', error);
      Alert.alert('Lỗi', 'Không thể tải vaccine');
    }
  };
  
  fetchVaccines();
}, [selectedDisease]);

  // Lấy danh sách gói vaccine
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get('/api/VaccinePackage/get-all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Package API response:', JSON.stringify(response.data));
        
        let packagesData = [];
        if (response.data && response.data.$values) {
          packagesData = response.data.$values;
        } else if (Array.isArray(response.data)) {
          packagesData = response.data;
        }
        
        setVaccinePackages(packagesData);
      } catch (error) {
        console.error('Lỗi khi lấy gói vaccine:', error);
      }
    };
    
    fetchPackages();
  }, []);

  // Xử lý dat lich
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const child = children.find(c => c.id === parseInt(selectedChild));
      
      if (!child || !date || !contactName || !contactPhone) {
        Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
        return;
      }

      const requestData = {
        childFullName: child.childrenFullname,
        contactFullName: contactName,
        contactPhoneNumber: contactPhone,
        vaccineType: vaccineType === 'Vắc xin lẻ' ? 'Single' : 'Package',
        diaseaseName: selectedDisease,
        selectedVaccineId: selectedVaccine,
        selectedVaccinePackageId: selectedPackage,
        appointmentDate: date.toISOString()
      };

      await axios.post('/api/Appointment/book-appointment', requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.goBack();
      }, 2000);
    } catch (error) {
      Alert.alert('Lỗi', error.response?.data?.message || 'Đặt lịch thất bại');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đặt lịch tiêm</Text>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {/* Chọn trẻ em */}
        <Dropdown
          data={children.map(c => ({ label: c.childrenFullname, value: c.id }))}
          labelField="label"
          valueField="value"
          placeholder="Chọn trẻ em"
          value={selectedChild}
          onChange={item => setSelectedChild(item.value)}
          style={styles.dropdown}
        />

        {/* Thông tin liên hệ */}
        <TextInput
          style={styles.input}
          placeholder="Họ tên người liên hệ"
          value={contactName}
          onChangeText={setContactName}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={contactPhone}
          onChangeText={setContactPhone}
          keyboardType="phone-pad"
        />

        {/* Chọn loại vaccine */}
        <SwitchSelector
          options={[
            { label: 'Vắc xin lẻ', value: 'Vắc xin lẻ' },
            { label: 'Vắc xin gói', value: 'Vắc xin gói' }
          ]}
          initial={0}
          onPress={value => setVaccineType(value)}
          buttonColor="#5D8AB0"
          backgroundColor="#E0E0E0"
          selectedColor="#FFFFFF"
          style={styles.switch}
        />

        {/* Chọn bệnh (nếu vaccine lẻ) */}
        {vaccineType === 'Vắc xin lẻ' && (
          <>
            <Dropdown
  data={diseases.map(d => ({ 
    label: d.name || 'Không có tên', 
    value: d.name || '' 
  }))}
  labelField="label"
  valueField="value"
  placeholder="Chọn bệnh"
  value={selectedDisease}
  onChange={item => {
    console.log('Selected disease:', item);
    setSelectedDisease(item.value);
  }}
  style={styles.dropdown}
  placeholderStyle={{color: '#999'}}
  selectedTextStyle={{color: '#000'}}
  renderItem={(item) => (
    <View style={{padding: 10}}>
      <Text>{item.label}</Text>
    </View>
  )}
/>
            
<Dropdown
  data={vaccines.map(v => ({ 
    label: v.name || 'Không có tên', 
    value: v.id 
  }))}
  labelField="label"
  valueField="value"
  placeholder="Chọn vaccine"
  value={selectedVaccine}
  onChange={item => {
    console.log('Selected vaccine:', item);
    setSelectedVaccine(item.value);
  }}
  style={styles.dropdown}
  placeholderStyle={{color: '#999'}}
  selectedTextStyle={{color: '#000'}}
  renderItem={(item) => (
    <View style={{padding: 10}}>
      <Text>{item.label}</Text>
    </View>
  )}
/>
          </>
        )}

        {/* Chọn gói vaccine */}
        {vaccineType === 'Vắc xin gói' && (
          <Dropdown
          data={vaccinePackages.map(p => ({ 
            label: p.name || 'Không có tên', 
            value: p.id 
          }))}
          labelField="label"
          valueField="value"
          placeholder="Chọn gói vaccine"
          value={selectedPackage}
          onChange={item => {
            console.log('Selected package:', item);
            setSelectedPackage(item.value);
          }}
          style={styles.dropdown}
          placeholderStyle={{color: '#999'}}
          selectedTextStyle={{color: '#000'}}
          renderItem={(item) => (
            <View style={{padding: 10}}>
              <Text>{item.label}</Text>
            </View>
          )}
        />
        )}

        {/* Chọn ngày */}
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.input}>
            Ngày tiêm: {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
            minimumDate={new Date()}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Đặt lịch</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Thông báo thành công */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modal}>
          <Text style={styles.modalText}>✅ Đặt lịch thành công!</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    zIndex: 999, // Đảm bảo dropdown hiển thị trên các component khác
    elevation: 5,
  },
});