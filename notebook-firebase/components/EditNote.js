// dependencies
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from '@react-navigation/native';

// components
import firebase from '../config.js';

// component
const EditNote = ({route}) => {

    const nav = useNavigation();
    const {item} = route.params;
    const [title, setTitle] = useState(item.title);
    const [body, setBody] = useState(item.body);

    const handleEdit = () => {
        if (title && title.length > 0 && body && body.length > 0) {
            firebase.firestore()
                .collection('notes')
                .doc(item.id)
                .update({title: title, body: body})
                .then(() => {
                    nav.navigate('details');
                })
                .catch((error) => {
                    alert(error);
                });
        }
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
            <TouchableOpacity style={styles.updateButton} onPress={handleEdit}>
                <Text style={styles.updateButtonText}>UPDATE</Text>
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
    updateButton: {
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
    updateButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

// export
export default EditNote;