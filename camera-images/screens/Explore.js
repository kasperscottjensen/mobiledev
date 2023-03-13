import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, FlatList, Pressable } from 'react-native';
import { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import firebase from './../config.js';


const Explore = () => {

	const nav = useNavigation();
	const [images, setImages] = useState();

	const getImagesHandler = () => {
		firebase.firestore()
			.collection('imageurls')
			.get()
			.then((snapshot) => {
				const result = [];
				snapshot.forEach((doc) => {
					result.push({...doc.data()});
				});
				setImages(result);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useFocusEffect(() => {
		getImagesHandler();
	});

	return (

		<View style={styles.container}>
			<StatusBar style='auto'/>
			<Image source={require('./../assets/exploreHeader.png')} style={styles.headerImage}/>
			<View style={styles.listWrapper}>
				<FlatList
					data={images}
					numColumns={3}
					renderItem={({item}) => (
						<Pressable onPress={() => nav.navigate('stackDetails', {uri: item.url, filename: item.filename})}>
							<Image source={{uri: item.url}} style={styles.item}/>
						</Pressable>
					)}
				/>
			</View>
		</View>

	);

};


const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#00bfff',
		alignItems: 'center'
	},
	headerImage: {
		resizeMode: 'contain',
		width: 140,
		paddingTop: 150
    },
	listWrapper: {

	},
	itemWrapper: {

	},
	item: {
		height: 120,
		width: 120,
		margin: 3
	}

});


export default Explore;