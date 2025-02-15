import React, { Children } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../pages/Home';
import VaccinationBooking from '../pages/VaccinationBooking';
import InjectionHistory from '../pages/InjectionHistory';
import Profile from '../pages/Profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) =>
        ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                    case 'Trang chủ':
                        iconName = focused ? 'home' : 'home-outline';
                        break;
                    case 'Đặt lịch':
                        iconName = focused ? 'medkit' : 'medkit-outline';
                        break;
                    case 'Lịch sử':
                        iconName = focused ? 'calendar' : 'calendar-outline';
                        break;
                    case 'Cá nhân':
                        iconName = focused ? 'person' : 'person-outline';
                        break;
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabel: ({ color, focused }) => (
                <Text style={{
                    fontSize: 12,
                    fontWeight: focused ? 'bold' : 'normal',
                    color,
                }}
                >
                    {route.name}
                </Text>
            ),
            tabBarStyle: styles.tabBarStyle,
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarActiveBackgroundColor: "#5D8AB0",
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "gray",
            headerTintColor: "#5D8AB0",
            headerTitleAlign: 'center',
            headerStyle: styles.headerStyle,
        })}>
            <Tab.Screen name="Trang chủ" component={Home} />
            <Tab.Screen name="Đặt lịch" component={VaccinationBooking} />
            <Tab.Screen name="Lịch sử" component={InjectionHistory} />
            <Tab.Screen name="Cá nhân" component={Profile} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 75,
        backgroundColor: "#fefce8",
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
        borderRadius: 40,
        borderTopWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    tabBarItemStyle: {
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 40,
        overflow: "hidden",
    },
    headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0
    }
});