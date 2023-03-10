// dependencies
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// component
const Header = (props) => {

    return (
        <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>{props.name}</Text>
        </View>
    );
    
}

// styling
const styles = StyleSheet.create({
    headerWrapper: {
        
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#ffffff',
    }
});

// export
export default Header;