import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const Pending = () => {
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
                <FlatList
                    data={[
                        { id: '1', name: 'Skin Specialist', imgSrc: require('../images/harine.jpeg'), time: '2:00 pm' },
                        { id: '2', name: 'Paediatrician', imgSrc: require('../images/karishma.png'), time: '12:00 pm' },
                        { id: '3', name: 'NeuroSurgeon', imgSrc: require('../images/nave.jpeg'), time: '10:00 am' },
                    ]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.itemView}>
                                <Image
                                    source={item.imgSrc}
                                    style={styles.docImage}
                                />
                                <View>
                                    <Text style={styles.name}> {item.name}</Text>
                                    <Text style={styles.timing}>{item.time}</Text>
                                </View>
                                <Text style={styles.status}>{'Pending'}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default Pending;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: 'orange',
    },
});