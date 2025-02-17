import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table, Row, Rows } from 'react-native-table-component';

export default function InjectionHistory() {
  const columnWidths = [50, 100, 150, 100, 200, 200]; // Set widths for each column

  const tableHead = ['ID', 'Mã bill', 'Số lượng mũi tiêm', 'Ngày tiêm', 'Bác Sĩ thực hiện mũi tiêm', 'Chiệu chứng sau khi tiêm'];
  const tableData = [
    ['1', '2', '3', '4', '4', '4'],
    ['a', 'b', 'c', 'd', 'd', 'd'],
    ['1', '2', '3', '4', '4', '4'],
    ['a', 'b', 'c', 'd', 'd', 'd']
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lịch sử tiêm</Text>

      <ScrollView horizontal nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#5D8AB0' }}>
            <Row data={tableHead} style={styles.thead} textStyle={styles.tbText} widthArr={columnWidths} />
            <Rows data={tableData} textStyle={styles.tbText} widthArr={columnWidths} />
          </Table>
        </ScrollView>
      </ScrollView>

      <View style={{marginBottom: 100}}></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: "#FFFFFF", },
  title: { fontSize: 28, fontWeight: 'bold', color: "#5D8AB0", marginBottom: 20, textAlign: 'center' },
  thead: { height: 'auto', backgroundColor: '#f1f8ff',},
  tbText: { margin: 6,},
});