import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table, Row, Rows } from 'react-native-table-component';

export default function PaymentHistory() {
    const columnWidths = [120, 70, 150, 150, 200]; // Set widths for each column

    const tableHead = ['Vaccin', 'Số lượng', 'Giá', 'Tổng giá', 'Ngày thanh toán'];
    const tableData = [
        ['1', '2', '3', '4', '4'],
        ['a', 'b', 'c', 'd', 'd'],
        ['1', '2', '3', '4', '4'],
        ['a', 'b', 'c', 'd', 'd']
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Lịch sử giao dịch</Text>

            <ScrollView horizontal nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#5D8AB0' }}>
                        <Row data={tableHead} style={styles.thead} textStyle={styles.tbText} widthArr={columnWidths} />
                        <Rows data={tableData} textStyle={styles.tbText} widthArr={columnWidths} />
                    </Table>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 10, paddingTop: 30, backgroundColor: "#FFFFFF", },
    title: { fontSize: 28, fontWeight: 'bold', color: "#5D8AB0", marginBottom: 20, textAlign: 'center' },
    thead: { height: 'auto', backgroundColor: '#f1f8ff', },
    tbText: { margin: 6, },
});