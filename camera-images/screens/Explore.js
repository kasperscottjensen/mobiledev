import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import firebase from './../config.js';


const Explore = () => {

	const [images, setImages] = useState();

	return (

		<View style={styles.container}>
			<StatusBar style="auto"/>
			<Image source={require('./../assets/exploreHeader.png')} style={styles.headerImage}/>
			<View style={styles.listWrapper}>
				<FlatList
					data={images}
					numColumns={3}
					renderItem={(image) => (
						<View styles={styles.itemWrapper}>
							<Image source={image.link} style={styles.item}/>
						</View>
					)}
				/>
			</View>
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
		width: 140,
		paddingTop: 150
    },
	listWrapper: {

	},
	itemWrapper: {
		resizeMode: 'contain'
	},
	item: {
		resizeMode: 'contain'
	}

});


export default Explore;