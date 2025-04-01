import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from '../../utils/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaymentHistory() {
    // const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.error('No token found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/api/Payment/get-payments-for-current-user', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setPayments(response.data.$values || []);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lịch sử giao dịch</Text>
            {payments.length === 0 ? (
                <Text style={styles.emptyMessage}>Lịch sử giao dịch trống</Text>
            ) : (
                <FlatList
                    data={payments}
                    keyExtractor={(item) => item.paymentId.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>Mã Thanh Toán: <Text style={styles.value}>{item.paymentId}</Text></Text>
                            <Text style={styles.title}>Loại: <Text style={styles.value}>{item.type}</Text></Text>
                            <Text style={styles.title}>Tổng Tiền: <Text style={styles.value}>{item.totalPrice} VND</Text></Text>
                            <Text style={styles.title}>Phương Thức: <Text style={styles.value}>{item.paymentMethod}</Text></Text>
                            <Text style={styles.title}>Trạng Thái: <Text style={styles.value}>{item.paymentStatus}</Text></Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#5D8AB0",
        marginVertical: 20,
        textAlign: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333'
    },
    value: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#555'
    }
});





// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Table, Row, Rows } from 'react-native-table-component';

// export default function PaymentHistory() {
//     const columnWidths = [120, 70, 150, 150, 200]; // Set widths for each column

//     const tableHead = ['Vaccin', 'Số lượng', 'Giá', 'Tổng giá', 'Ngày thanh toán'];
//     const tableData = [
//         ['1', '2', '3', '4', '4'],
//         ['a', 'b', 'c', 'd', 'd'],
//         ['1', '2', '3', '4', '4'],
//         ['a', 'b', 'c', 'd', 'd']
//     ];

//     return (
//         <SafeAreaView style={styles.container}>
//             <Text style={styles.title}>Lịch sử giao dịch</Text>

//             <ScrollView horizontal nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}>
//                 <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
//                     <Table borderStyle={{ borderWidth: 1, borderColor: '#5D8AB0' }}>
//                         <Row data={tableHead} style={styles.thead} textStyle={styles.tbText} widthArr={columnWidths} />
//                         <Rows data={tableData} textStyle={styles.tbText} widthArr={columnWidths} />
//                     </Table>
//                 </ScrollView>
//             </ScrollView>
//         </SafeAreaView>

//     )
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, paddingHorizontal: 10, paddingTop: 30, backgroundColor: "#FFFFFF", },
//     title: { fontSize: 28, fontWeight: 'bold', color: "#5D8AB0", marginBottom: 20, textAlign: 'center' },
//     thead: { height: 'auto', backgroundColor: '#f1f8ff', },
//     tbText: { margin: 6, },
// });