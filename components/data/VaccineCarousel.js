import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { vaccineData } from './vaccineData';

const { width } = Dimensions.get('window');

export default function VaccineCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slide);
  };

  return (
    <View>
      <FlatList
        data={vaccineData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <Pressable key={item.id} onPress={() => navigation.navigate('VaccineDetail', { vaccine: item})}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode='contain' />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.pagination}>
        {vaccineData.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
  },
});
