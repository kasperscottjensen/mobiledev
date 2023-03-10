// setup
import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import firebase from '../config.js';

// component
const Details = ({route}) => {

    const nav = useNavigation();
    const {item} = route.params;

    const handleDelete = () => {
        firebase.firestore()
            .collection('notes')
            .doc(item.id)
            .delete()
            .then(() => {
                nav.navigate('home');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='A neat little title...'
                value={item.title}
                style={styles.titleInput}
                editable={false}
            />
            <TextInput
                placeholder='And the rest goes here...'
                value={item.body}
                style={styles.bodyInput}
                multiline={true}
                editable={false}    
            />
            <View style={styles.imageWrapper}>
                <Image source={{uri: item.link}} style={{width: 200, height: 200}}/>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={() => nav.navigate('editNote', {item})}>
                <Text style={styles.updateButtonText}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>DELETE</Text>
            </TouchableOpacity>
        </View>
    );

};

// styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffecb8'
    },
    titleInput: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize: 15,
        marginTop: 20,
        height: 50 ,
        width: '90%',
        borderWidth: 1,
        borderColor: '#808080',
        padding: 10,
        color: '#000000'
    },
    bodyInput: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize: 15,
        marginTop: 20,
        marginBottom: 10,
        height: 100,
        width: '90%',
        borderWidth: 1,
        borderColor: '#808080',
        padding: 10,
        color: '#000000'
    },
    deleteButton: {
        backgroundColor: '#e02241',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    deleteButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    updateButton: {
        backgroundColor: '#ff8400',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        postion: 'absolute',
        bottom: -260
    },
    updateButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    imageWrapper: {
        marginTop: 25
    }
});

// export
export default Details;