import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import VaccineCarousel from '../data/VaccineCarousel';

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.homeHeader}>
            <Image
              source={require('../../assets/vxn-media/logo.png')}
              style={styles.smallLogo} />
            <Image
              source={require('../../assets/vxn-media/logo_vaccine.png')}
              style={styles.logo} />
            <Image
              source={require('../../assets/vxn-media/logo.png')}
              style={styles.smallLogo} />
          </View>

          <View style={styles.imageContainer} >
            <Image
              source={require('../../assets/vxn-media/HomePage/babybg.png')} // Replace with your image path
              style={styles.homeImage}
            />

            <View style={styles.imageContent}>
              <Text style={styles.imageTitle}>
                Chăm sóc bé, từng mũi tiêm {'\n'}trọn vẹn!
              </Text>
              <Text style={styles.imageText}>
                "Chào mừng bạn đến với VACCIN CARE! Đây là nơi {'\n'}
                giúp bạn quản lý lịch tiêm chủng của bé một cách {'\n'}
                dễ dàng và hiệu quả. Hãy đồng hành cùng chúng tôi {'\n'}
                để bảo vệ sức khỏe toàn diện cho bé yêu qua từng {'\n'}
                mũi tiêm. "
              </Text>
              <View style={{ display: "flex", flexDirection: "row", gap: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: "#8E6C89" }}>
                  Đường dây nóng 24/7:
                </Text>
                <Text style={styles.imagePhoneline}>
                  0374277590
                </Text>
              </View>
            </View>

            <View style={styles.iconWrapper1}>
              <Image
                source={require('../../assets/vxn-media/HomePage/search.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.iconWrapper2}>
              <Image
                source={require('../../assets/vxn-media/HomePage/heath.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.iconWrapper3}>
              <Image
                source={require('../../assets/vxn-media/HomePage/heard.png')}
                style={styles.iconImage}
              />
            </View>
          </View>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#5981a1"
            style={styles.infoBtn}
            onPress={() => navigation.navigate('CreateBabyProfile')}
          >
            <Text style={styles.buttonText}>👼      Tạo hồ sơ      👼</Text>
          </TouchableHighlight>

          <View style={styles.vaccinListContainer}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 10, marginBottom: 20 }}>
              DANH MỤC VẮC XIN
            </Text>
            <View style={styles.vaccinCarousel}>
              <VaccineCarousel />
            </View>
          </View>

          <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 10, marginBottom: 15 }}>
            DANH MỤC DỊCH VỤ VẮC XIN
          </Text>
          <View style={styles.vaccin2ListContainer}>
            <View style={styles.vaccinListContent}>
              <Image
                source={require('../../assets/vxn-media/HomePage/tiemtheogoi.png')}
                style={styles.vaccinImage}
              />
              <Text style={styles.vaccinListText}>Tiêm theo gói</Text>
            </View>
            <View style={styles.vaccinListContent}>
              <Image
                source={require('../../assets/vxn-media/HomePage/tiemle.png')}
                style={styles.vaccinImage}
              />
              <Text style={styles.vaccinListText}>Tiêm lẻ</Text>
            </View>
            <View style={styles.vaccinListContent}>
              <Image
                source={require('../../assets/vxn-media/HomePage/tuvanmuitiem.png')}
                style={styles.vaccinImage}
              />
              <Text style={styles.vaccinListText}>Tư vấn mũi tiêm</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  //Home header
  homeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f1f8ff",
  },
  logo: {
    width: 100,
    height: 100
  },
  smallLogo: {
    width: 40,
    height: 40
  },
  infoBtn: {
    backgroundColor: "#5D8AB0",
    paddingVertical: 15,
    marginHorizontal: 50,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,

  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold"
  },
  // Home image
  imageContainer: {
    position: "relative",
  },
  homeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    overflow: 'hidden', // Hide overflowing part of the image
    backgroundColor: '#F5F5F5'  // Add a background color to the image to create a visual effect when it's tapped (optional)
  },
  imageContent: {
    position: 'absolute',
    top: 12,
    left: 15,
  },
  imageTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#5D8AB0",
    marginBottom: 10,
  },
  imageText: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 10,
    backgroundColor: "rgba(157, 157, 224, 0.5)",
    borderRadius: 5,
    padding: 2,
  },
  imagePhoneline: {
    fontSize: 12,
    color: 'white',
    backgroundColor: "#8E6C89",
    borderRadius: 8,
    padding: 4,
  },
  iconWrapper1: {
    position: 'absolute',
    top: 10,
    right: 46,
    backgroundColor: "#19B8AF",
    borderRadius: 50,
    padding: 8,
    zIndex: 1,
  },
  iconWrapper2: {
    position: 'absolute',
    top: 70,
    right: 80,
    backgroundColor: "#FFB71A",
    borderRadius: 50,
    padding: 8,
    zIndex: 1,
  },
  iconWrapper3: {
    position: 'absolute',
    bottom: 50,
    right: 35,
    backgroundColor: "#FE5858",
    borderRadius: 50,
    padding: 8,
    zIndex: 1,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  // Vaccin lists
  vaccinCarousel: {
    marginBottom: 20,
  },
  //2nd Vaccin lists
  vaccin2ListContainer: {
    marginBottom: 100,
    marginHorizontal: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#5D8AB0",
    borderRadius: 10,
    padding: 15,
  },
  vaccinImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  vaccinListText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  }
});