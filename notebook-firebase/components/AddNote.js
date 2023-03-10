// dependencies
import React, {useState} from 'react';
import {StyleSheet, View, Text, Keyboard, TextInput, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// components
import firebase from '../config.js';

// component
const AddNote = () => {
    
    const [image, setImage] = useState(null);
    const [upload, setUpload] = useState(false);

    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [filename, setFilename] = useState();

    const handleAdd = () => {
        if (title != null && body != null && image != null) {
            uploadImage();
            firebase.firestore()
                .collection('notes')
                .add({title, body, filename})
                .then(() => {
                    setTitle();
                    setBody();
                    setFilename();
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                });
        } 
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4,3],
            quality: 1
        });

        const src = {uri: result.uri};
        setImage(src);
    };

    const uploadImage = async () => {
        setUpload(true);
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
        setFilename(filename);
        const ref = firebase.storage().ref().child(filename).put(blob);
        try {
            await ref;
        } catch (error) {
            console.log(error);
        }
        setUpload(false);
        setImage(null); 
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='A neat little title...'
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.titleInput} 
            />
            <TextInput
                placeholder='And the rest goes here...'
                value={body}
                onChangeText={(text) => setBody(text)}
                style={styles.bodyInput}
                multiline={true}    
            />
            <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                <Text style={styles.pickImageText}>ADD IMAGE</Text>
            </TouchableOpacity>
            <View style={styles.imageWrapper}>
                {image && <Image source={{uri: image.uri}} style={{width: 200, height: 200}}/>}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>DONE</Text>
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
        padding: 10
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
        padding: 10
    },
    addButton: {
        backgroundColor: '#ff8400',
        marginTop: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    pickImageButton: {
        backgroundColor: '#ff8400',
        marginTop: 15,
        height: 50,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },
    pickImageText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    imageWrapper: {
        marginTop: 25
    }
});

// export
export default AddNote;