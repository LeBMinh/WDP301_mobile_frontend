import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../utils/axiosConfig';

export default function InjectionHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách cuộc hẹn 
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      // Fetch appointments
      const appointmentResponse = await axios.get('/api/Appointment/get-all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const appointmentsData = appointmentResponse.data.$values || [];

      // Fetch children data
      const childrenResponse = await axios.get('/api/Child/get-all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const childrenData = childrenResponse.data.$values || [];

      // Fetch vaccines data
      const vaccinesResponse = await axios.get('/api/Vaccine/get-all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const vaccinesData = vaccinesResponse.data.$values || [];

      // Map appointments with children's full names and vaccine details
      const updatedAppointments = appointmentsData.map(appointment => {
        const child = childrenData.find(c => c.id === appointment.childrenId);
        const vaccine = vaccinesData.find(v => v.id === String(appointment.vaccineId)); // Ensure string match

        return {
          ...appointment,
          childrenFullname: child ? child.childrenFullname : 'Unknown',
          vaccineName: vaccine ? vaccine.name : 'Không xác định',
          vaccinePrice: vaccine ? vaccine.price : 'N/A'
        };
      });

      //  Sort by createdAt (latest first)
      updatedAppointments.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0); // Default to oldest if missing
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA; // Descending order
      });

      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách lịch hẹn');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      // Send request to cancel appointment
      const response = await axios.put(`/api/Appointment/cancel-appointment/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Alert.alert('Thành công', 'Cuộc hẹn đã được hủy thành công.');

      // Refresh list after cancellation
      fetchAppointments();
    } catch (error) {
      console.error('Lỗi khi hủy lịch hẹn:', error);
      Alert.alert('Lỗi', 'Không thể hủy cuộc hẹn.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5D8AB0" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lịch sử cuộc hẹn</Text>
      <ScrollView>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{appointment.childrenFullname} 👶</Text>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Mũi tiêm:</Text>
                <Text style={styles.highlightedText}>{appointment.vaccineName}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Giá:</Text>
                <Text style={styles.priceText}>{appointment.vaccinePrice} VNĐ</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Ngày tiêm:</Text>
                <Text style={styles.highlightedText}>
                  {appointment.dateInjection ? new Date(appointment.dateInjection).toLocaleDateString() : 'Chưa xác định'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Trạng thái:</Text>
                <Text style={[styles.highlightedText, getStatusStyle(appointment.processStep)]}>
                  {appointment.processStep}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Xác nhận bên phòng khám:</Text>
                <Text style={[styles.highlightedText, getStatusStyle(appointment.status)]}>
                  {appointment.status}
                </Text>
              </View>

              {/* Cancel Booking Button */}
              {appointment.status !== 'Canceled' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancelAppointment(appointment.id)}
                >
                  <Text style={styles.cancelButtonText}>Hủy đặt lịch</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Không có lịch hẹn nào.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending': return { color: 'orange' };
    case 'Completed': return { color: 'green' };
    case 'Canceled': return { color: 'red' };
    default: return { color: '#333' };
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: '#FFFFFF', marginBottom: 90 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#5D8AB0', marginBottom: 20, textAlign: 'center' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#f1f8ff', padding: 15, marginBottom: 10, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 3 },
  cardTitle: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { fontSize: 16, color: '#888', fontWeight: '500' }, // Dimmed down
  highlightedText: { fontSize: 16, color: '#333', fontWeight: 'bold' }, // Highlighted
  priceText: { fontSize: 16, color: 'green', fontWeight: 'bold' }, // Green for price
  noDataText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
  cancelButton: { marginTop: 10, backgroundColor: '#ff4d4d', padding: 8, borderRadius: 5, alignItems: 'center' },
  cancelButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

