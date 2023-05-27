
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import CommonBtn from '../components/CommonBtn';


const Home = ({ navigation }) => {
    // const onClick = () => {

    //     navigation.navigate('BookAppointment');
    // };
    return (
        <View style={styles.container}>

            <Header title={'Hello Dr!'} icon={require('../images/logo.png')} >
            </Header>

            <Image
                source={require('../images/banner.jpg')}
                style={styles.banner}
            />
            <Text style={styles.heading}>Our Doctors</Text>

            <FlatList
                numColumns={2}
                data={[
                    { id: '1', name: 'Skin Specialist', dname: 'Harine', available: true, imgSrc: require('../images/harine.jpeg') },
                    { id: '2', name: 'Paediatrician', dname: 'Karishma', available: true, imgSrc: require('../images/karishma.png') },
                    { id: '3', name: 'NeuroSurgeon', dname: 'Navetha', available: true, imgSrc: require('../images/nave.jpeg') },
                    { id: '4', name: 'Gynecologist', dname: 'Sowmiya', available: true, imgSrc: require('../images/sowmi.jpeg') },
                    { id: '5', name: 'Cardiologist', dname: 'Sankari', available: true, imgSrc: require('../images/sankari.png') },
                    { id: '6', name: 'Dentist', dname: 'Vaishma', available: true, imgSrc: require('../images/vaish.jpeg') },
                ]}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.docItem}>
                            <Image
                                source={item.imgSrc}
                                style={styles.docImg}
                            />
                            <Text style={styles.docName}>Doctor {item.dname}</Text>
                            <Text style={styles.docSpl}>{item.name}</Text>
                            <Text style={[styles.status, { color: item.available ? 'green' : 'red', opacity: item.available ? 1 : 0.5 }]}>
                                {item.available ? 'Available' : 'Busy'}
                            </Text>
                            <View style={styles.buttonview}>
                                <Button style={styles.buttonview1}
                                    w={120}
                                    h={40}
                                    status={item.available}
                                    title="Book Appointment"
                                    onPress={() => {
                                        if (item.available) {
                                            navigation.navigate('BookAppointment', { Name: item.name, dname: item.dname, imgSrc: item.imgSrc });
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    );
                }}
            />


            <View style={styles.bottomView}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Pending');
                    }}>
                    <Image
                        source={require('../images/pending.png')}
                        style={styles.bottomIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CallAmb');
                    }}>
                    <Image
                        source={require('../images/ambulance.png')}
                        style={styles.bottomIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,

    },
    buttonview1: {
        borderRadius: 20,
    },
    buttonview: {
        borderRadius: 10,
        borderWidth: 0.1,

    },
    banner: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
    },
    heading: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 15,
        marginLeft: 15,
    },
    catName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
        marginTop: -80,
    },
    box: {
        width: 120,
        height: 120,
        backgroundColor: '#009FFD',
        borderRadius: 20,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    docItem: {
        width: '45%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0.2,
        margin: 10,
    },
    docImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 20,
    },
    docName: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 10,
    },
    docSpl: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '600',
        alignSelf: 'center',
        color: 'green',
        backgroundColor: '#f2f2f2',
        padding: 5,
        borderRadius: 10,
    },
    status: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '600',
        alignSelf: 'center',
    },
    bottomView: {
        width: '90%',
        height: 60,
        borderRadius: 10,
        elevation: 5,
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bottomIcon: {
        width: 30,
        height: 30,
    },
});
