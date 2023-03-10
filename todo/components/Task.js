import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Task = (properties) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{properties.text}</Text>
        </View>
    )
}; 

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#0f5396',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    itemText: {
        color: '#fff',
        fontSize: 15,
        maxWidth: '95%'
    }
});

export default Task;