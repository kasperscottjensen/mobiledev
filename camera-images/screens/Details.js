import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import firebase from './../config.js';


const Details = ({route}) => {

    const nav = useNavigation();

    const downloadLinkHandler = () => {
        Alert.alert(
			'Here you go!',
			route.params.uri
		);
    };

    const filenameHandler = () => {
        Alert.alert(
            'Here you go!',
            route.params.filename
        );
    };

    const deleteImageHandler = () => {
        const storageRef = firebase.storage()
            .ref()
            .child(route.params.filename);
        storageRef.delete()
            .then(async () => {
                const docRef = await firebase.firestore()
                    .collection('imageurls')
                    .where('filename', '==', route.params.filename)
                    .get()
                    .then((snapshot) => {
                        snapshot.forEach((doc) => {
                            doc.ref.delete();
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
        Alert.alert(
            'Great success!',
            'The image has been successfully deleted from Firebase Storage.'
        );
        nav.navigate('stackExplore');
    };

    return (
        
        <View style={styles.container}>
            <StatusBar style='auto'/>
			<Image source={require('./../assets/detailsHeader.png')} style={styles.headerImage}/>
            <View style={styles.bodyWrapper}>
                <TouchableOpacity style={styles.button} onPress={filenameHandler}>
					<Ionicons name={'help-circle'} color={'#ffffff'} size={30}/>
					<Text style={styles.buttonText}>Name</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={downloadLinkHandler}>
					<Ionicons name={'arrow-down-circle'} color={'#ffffff'} size={30}/>
					<Text style={styles.buttonText}>URL</Text>
				</TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={deleteImageHandler}>
					<Ionicons name={'close-circle'} color={'#ffffff'} size={30}/>
					<Text style={styles.buttonText}>Delete</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.contentWrapper}>
				<Image source={{uri: route.params.uri}} style={styles.image}/>
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
		paddingTop: 150,
        marginRight: 15
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


export default Details;