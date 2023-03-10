import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

import firebase from './../config.js';


const Home = () => {

    const nav = useNavigation();

	return (

		<View style={styles.container}>
			<StatusBar style="auto"/>
			<Image source={require('./../assets/homeHeader.png')} style={styles.headerImage}/>
		</View>

	);

}


const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#00bfff',
		alignItems: 'center'
	},
	headerImage: {
		resizeMode: 'contain',
		width: 300,
		position: 'absolute',
		top: '40%'
    },
	body: {
		flex: 1,
		flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 80
	}

});


export default Home;