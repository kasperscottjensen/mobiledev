import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { StackHome, StackExplore, StackUpload} from './components/StackNavigator.js';


export default function App() {

	const Tab = createBottomTabNavigator();

	return (

		<NavigationContainer>
			<Tab.Navigator
				initialRouteName='home'
				screenOptions={() => ({
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
				})}
			>

				<Tab.Screen
					name={'home'}
					component={StackHome}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({focused}) => (
							<Ionicons name='home-sharp' size={25} color={focused ? '#163d8a' : '#ffffff'}/>
						)
					}}
				/>
				<Tab.Screen
					name={'explore'}
					component={StackExplore}
					options={{
						tabBarLabel: 'Explore',
						tabBarIcon: ({focused}) => (
							<Ionicons name='search' size={25} color={focused ? '#163d8a' : '#ffffff'}/>
						)
					}}
				/>
				<Tab.Screen
					name={'upload'}
					component={StackUpload}
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