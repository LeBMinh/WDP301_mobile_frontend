import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import { useVideoPlayer, VideoView } from 'expo-video';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function VaccineDetail({ route }) {
    const { vaccine } = route.params;
    
    //You need to use a direct video link (e.g., .mp4, .m3u8, .mov, etc.) hosted on a server or on project.
    // const player = useVideoPlayer(vaccine.video, (player) => {
    //     player.loop = true;
    //     player.staysActiveInBackground = true;
    // }); 

    // Extract YouTube video ID from URL
    const extractVideoId = (url) => {
        const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    const videoId = extractVideoId(vaccine.video);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Image source={{ uri: vaccine.image }} style={styles.image} resizeMode='contain' />
                    <Text style={styles.name}>{vaccine.name}</Text>
                    <Text style={styles.description}>{vaccine.description}</Text>
                    <Text style={styles.price}>Giá: {vaccine.price}</Text>
                    <Text style={styles.object}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Đối tượng sử dụng: </Text>
                        {vaccine.object}
                    </Text>

                    <Text style={styles.videoName}>Video về {vaccine.name}</Text>
                    <View style={styles.vaccineVideo}>
                        {/* <VideoView
                            player={player}
                            style={{
                                width: Dimensions.get("window").width,
                                height: Dimensions.get("window").width * (9 / 16),
                            }}
                            allowsFullscreen
                            allowsPictureInPicture
                        /> */}
                        {videoId ? (
                            <YoutubePlayer
                                height={300}
                                play={false} // chạy video ngay khi vào trang
                                videoId={videoId}
                                webViewProps={{
                                    javaScriptEnabled: true,
                                    domStorageEnabled: true,
                                  }}
                            />
                        ) : (
                            <Text>Video không khả dụng</Text>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, marginTop: 20 },
    image: { width: '100%', height: 300, borderRadius: 10 },
    name: { fontSize: 24, fontWeight: 'bold', alignSelf: 'center', color: "#5D8AB0", marginVertical: 10 },
    description: { fontSize: 16, color: '#555', marginVertical: 10 },
    price: { fontSize: 18, fontWeight: 'bold', color: 'red', marginVertical: 10 },
    object: { fontSize: 16 },
    videoName: { fontSize: 24, alignSelf: 'center', marginVertical: 15 },
    vaccineVideo: { borderRadius: 10, overflow: 'hidden' },
});
