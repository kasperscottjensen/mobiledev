// dependencies
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

// components
import firebase from '../config.js';

// component
const Home = () => {
    
    const [notes, setNotes] = useState();
    const [link, setLink] = useState();
    const nav = useNavigation();

    useEffect(() => {
        firebase.firestore()
            .collection('notes')
            .onSnapshot((querySnapshot) => {
                const newNotes = [];
                querySnapshot.forEach(doc => {
                    firebase.storage().ref(doc.data().filename).getDownloadURL().then(url => {
                        setLink(url);
                    });
                    const {filename, body, title} = doc.data();
                    newNotes.push({link, filename, body, title, id: doc.id});
                });
                setNotes(newNotes);
            });
    }, []);

    return (
        <View style={styles.container}>
            <FlashList
                data={notes}
                numColumns={1}
                estimatedItemSize={100}
                renderItem={({item}) => (
                    <Pressable onPress={() => nav.navigate('details', {item})}>
                        <View style={styles.noteView}>
                            <Text style={styles.noteTitle}>{item.title}</Text>
                            <Image source={{uri: item.link}} style={{width: 75, height: 75}}/>
                        </View>
                    </Pressable>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => nav.navigate('addNote')}>
                <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
        </View>
    )

};

// styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffecb8',
        paddingTop: 10
    },
    noteView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    addButton: {
        backgroundColor: '#ff8400',
        marginTop: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000'
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

// export
export default Home;