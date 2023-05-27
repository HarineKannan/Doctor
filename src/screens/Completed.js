import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const Completed = () => {
    const navigation = useNavigation();

    const handleIconClick = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    return (
        <View style={styles.container}>
            <Header
                icon={require('../images/back-button.png')}
                title={'Completed Appointments'}
                onIconClick={handleIconClick} // Pass the handleIconClick function to the Header component
            />
            <View>
                {/* Rest of the code */}
            </View>
        </View>
    );
};

export default Completed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    itemView: {
        width: '94%',
        height: 100,
        borderRadius: 10,
        borderWidth: 0.5,
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    docImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 20,
    },
    timing: {
        fontSize: 16,
        marginLeft: 20,
        marginTop: 5,
    },
    status: {
        marginLeft: 60,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        padding: 5,
        color: 'green',
    },
});
