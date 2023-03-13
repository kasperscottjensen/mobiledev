import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import firebase from './../config.js';


const Upload = () => {

	const [image, setImage] = useState();
	
	const selectImageHandler = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
		});
        setImage({uri: result.uri});
	};

	const captureImageHandler = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true
		});
		setImage({uri: result.uri});
	};

	const deleteImage = () => {
		if (!image) {
			return Alert.alert(
				'Woops!',
				'Please select or capture an image first.'
			);
		}
		setImage(null);
	};

	const uploadImageHandler = async () => {
		if (!image) {
			return Alert.alert(
				'Woops!',
				'Please select or capture an image first.'
			);
		}
		const filepath = image.uri;
		const response = await fetch(filepath);
		const blob = await response.blob();
		const filename = filepath.substring(filepath.lastIndexOf('/') + 1);
		const storageRef = firebase.storage()
			.ref()
			.child(filename);
		storageRef.put(blob)
			.then(async (snapshot) => {
				const imageUrl = await snapshot.ref.getDownloadURL();
				firebase.firestore()
					.collection('imageurls')
					.add({url: imageUrl, filename: filename});
			})
			.catch((error) => {
				console.log(error);
			});
		Alert.alert(
			'Yeehaw!',
			'Your image has been successfully uploaded to Firebase Storage.'
		);
		setImage(null);
	}

	return (

		<View style={styles.container}>
			<StatusBar style='auto'/>
			<Image source={require('./../assets/uploadHeader.png')} style={styles.headerImage}/>
			<View style={styles.bodyWrapper}>
				<TouchableOpacity style={styles.button} onPress={selectImageHandler}>
					<Ionicons name={'folder-open'} color={'#ffffff'} size={30}/>
					<Text style={styles.buttonText}>Select</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={captureImageHandler}>
					<Ionicons name={'camera'} color={'#ffffff'} size={30}/>
					<Text style={styles.buttonText}>Capture</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={uploadImageHandler}>
					<Ionicons name={'arrow-up-circle'} color={'#ffffff'} size={30}/>
					<Text style={styles.buttonText}>Upload</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={deleteImage}>
					<Ionicons name={'close-circle'} color={'#ffffff'} size={30}/>
					<Text style={styles.buttonText}>Cancel</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.contentWrapper}>
				{image && <Image source={{uri: image.uri}} style={styles.image}/>}
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
	bodyWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		marginHorizontal: 20,
		alignItems: 'center'
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 15
	},
	contentWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 100
	},
	image: {
		resizeMode: 'contain',
		width: 350,
		height: 350
	}

});


export default Upload;