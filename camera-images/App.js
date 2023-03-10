import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import firebase from './config.js';

import Home from './screens/Home.js';
import Explore from './screens/Explore.js';
import Upload from './screens/Upload.js';


export default function App() {

	const Tab = createBottomTabNavigator();

	return (

		<NavigationContainer>
			<Tab.Navigator
				initialRouteName='Home'
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: '#00bfff',
						paddingTop: 15,
						elevation: 0,
        				shadowOpacity: 0,
        				borderTopWidth: 0,
						height: 80
					},
					tabBarLabelStyle: {
						color: '#ffffff',
						fontSize: 14,
						paddingBottom: 15,
						fontWeight: 'bold'
					},
					tabBarIconStyle: {
						padding: 0
					}
				}}
			>

				<Tab.Screen
					name={'home'}
					component={Home}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({focused}) => (
							<Ionicons name='home-sharp' size={25} color={focused ? '#163d8a' : '#ffffff'}/>
						)
					}}
				/>
				<Tab.Screen
					name={'explore'}
					component={Explore}
					options={{
						tabBarLabel: 'Explore',
						tabBarIcon: ({focused}) => (
							<Ionicons name='search' size={25} color={focused ? '#163d8a' : '#ffffff'}/>
						)
					}}
				/>
				<Tab.Screen
					name={'upload'}
					component={Upload}
					options={{
						tabBarLabel: 'Upload',
						tabBarIcon: ({focused}) => (
							<Ionicons name='arrow-up' size={25} color={focused ? '#163d8a' : '#ffffff'}/>
						)
					}}
				/>

			</Tab.Navigator>
		</NavigationContainer>

	);

};
