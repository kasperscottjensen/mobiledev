// dependencies
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

// components
import Home from './components/Home.js';
import AddNote from './components/AddNote.js';
import Header from './components/Header.js';
import EditNote from './components/EditNote.js';
import Details from './components/Details.js';

// setup
const Stack = createStackNavigator();

// app
export default function App() {

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					component={Home}
					name={'home'}
					options={{
						headerTitle: () => <Header name={'FIREBASE NOTEBOOK'}/>,
						headerTitleAlign: 'center',
						headerStyle: styles.navigation
					}}
				/>
				<Stack.Screen
					component={AddNote}
					name={'addNote'}
					options={{
						headerTitle: () => <Header name={'ADD NOTE'}/>,
						headerTintColor: '#ffffff',
						headerTitleAlign: 'center',
						headerStyle: styles.navigation
					}}
				/>
				<Stack.Screen
					component={EditNote}
					name={'editNote'}
					options={{
						headerTitle: () => <Header name={'EDIT NOTE'}/>,
						headerTintColor: '#ffffff',
						headerTitleAlign: 'center',
						headerStyle: styles.navigation
					}}
				/>
				<Stack.Screen
					component={Details}
					name={'details'}
					options={{
						headerTitle: () => <Header name={'DETAILS'}/>,
						headerTintColor: '#ffffff',
						headerTitleAlign: 'center',
						headerStyle: styles.navigation
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);

};

// styling
const styles = StyleSheet.create({
	navigation: {
		backgroundColor: '#fcba03',
		height: 150,
		shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
	}
});
