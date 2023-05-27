import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    Button,

} from 'react-native';
import axios from 'axios';

import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { firebase } from '../../config'; // Import the firebase configuration

import Header from '../components/Header';
import CommonBtn from '../components/CommonBtn';

const BookAppointment = ({ route, navigation }) => {

    const saveAppointmentData = async (appointmentData) => {
        try {
            const db = getFirestore();
            const appointmentsCollectionRef = collection(db, 'appointments');

            // await addDoc(appointmentsCollectionRef, appointmentData);

            await addDoc(appointmentsCollectionRef, {
                ...appointmentData,
                Required_Specalization: Name // Add the Name value from route.params
            });

            console.log('Appointment data saved successfully!');
        } catch (error) {
            console.error('Error saving appointment data:', error);
        }
    };
    const validateName = () => {
        if (name.trim() === '') {
            setNameError('Please enter your name');
            return false;
        }
        setNameError('');
        return true;
    };

    const validateAge = () => {
        if (age.trim() === '') {
            setAgeError('Please enter your age');
            return false;
        }
        const ageNum = Number(age);
        if (isNaN(ageNum) || ageNum <= 0) {
            setAgeError('Please enter a valid age');
            return false;
        }
        setAgeError('');
        return true;
    };

    const validateSlot = () => {
        if (selectedSlot === -1) {
            setSlotError('Please select a time slot');
            return false;
        }
        setSlotError('');
        return true;
    };

    const validateGender = () => {
        if (!selectedMale && !selectedFemale) {
            setGenderError('Please select a gender');
            return false;
        }
        setGenderError('');
        return true;
    };

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const nameInputRef = useRef(null);
    const ageInputRef = useRef(null);

    const [selectedSlot, setSelectedSlot] = useState(-1);
    const { Name, dname, imgSrc } = route.params;
    const [selectedMale, setSelectedMale] = useState(false);
    const [selectedFemale, setSelectedFemale] = useState(false);
    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [slotError, setSlotError] = useState('');
    const [genderError, setGenderError] = useState('');

    const [slots, setSlots] = useState([
        { id: '1', sloT: '10:00-12:00PM', selected: false },
        { id: '2', sloT: '12:00-02:00PM', selected: false },
        { id: '3', sloT: '02:00-04:00PM', selected: false },
        { id: '4', sloT: '04:00-06:00PM', selected: false },
        { id: '5', sloT: '06:00-08:00PM', selected: false },
        { id: '6', sloT: '08:00-11:00PM', selected: false },
    ]);
  
    return (
        <ScrollView style={styles.container}>

            <View style={styles.container}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button1} onPress={() => {
                        navigation.navigate('Home');
                    }}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.topHeadingContainer}>
                        <Text style={styles.topHeadingContainer}>
                            Book an appointment with {Name}
                        </Text>
                    </View>
                </View>
                <Image source={imgSrc} style={styles.Img} />
                <Text style={styles.docName}>{dname}</Text>
                <Text style={styles.heading}>Patient Name</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder={'Enter Name'}
                    ref={nameInputRef}
                    onChangeText={(text) => setName(text)}
                />
                {Boolean(nameError) && <Text style={styles.errorText}>{nameError}</Text>}

                <Text style={styles.heading}>Age</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder={'Enter Age'}
                    ref={ageInputRef}
                    onChangeText={(text) => setAge(text)}
                />
                {Boolean(ageError) && <Text style={styles.errorText}>{ageError}</Text>}

                <Text style={styles.heading}>Select Gender</Text>
                <View style={styles.genderView}>
                    <TouchableOpacity
                        style={[
                            styles.gender,
                            {
                                borderWidth: 0.5,
                                borderColor: selectedMale ? 'blue' : 'black',
                            },
                        ]}
                        onPress={() => {
                            setSelectedMale(true);
                            setSelectedFemale(false);
                        }}>
                        <Image
                            source={require('../images/male.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.gender,
                            {
                                borderWidth: 0.5,
                                borderColor: selectedFemale ? 'blue' : 'black',
                            },
                        ]}
                        onPress={() => {
                            setSelectedFemale(true);
                            setSelectedMale(false);
                        }}>
                        <Image
                            source={require('../images/female.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>
                {Boolean(genderError) && <Text style={styles.errorText}>{genderError}</Text>}

                <Text style={styles.heading}>Available Slots</Text>
                <FlatList
                    numColumns={2}
                    data={slots}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.timeSlot,
                                    { borderColor: index == selectedSlot ? 'blue' : 'black' },
                                ]}
                                onPress={() => {
                                    setSelectedSlot(index);
                                }}>
                                <Text
                                    style={{ color: index == selectedSlot ? 'blue' : 'black' }}>
                                    {item.sloT}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                {Boolean(slotError) && <Text style={styles.errorText}>{slotError}</Text>}

                <View style={styles.btnView}>
                    {/* <TouchableOpacity
                        style={styles.bookNowButton}
                        onPress={() => {
                            navigation.navigate('Success');
                        }}
                    >
                        <Text style={styles.buttonText}>Book Now</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.bookNowButton}
                        onPress={() => {
                            const isNameValid = validateName();
                            const isAgeValid = validateAge();
                            const isSlotValid = validateSlot();
                            const isGenderValid = validateGender();

                            if (isNameValid && isAgeValid && isSlotValid && isGenderValid) { 
                            const appointmentData = {
                                Patient_Name: name,
                                Patient_age: age,
                                Gender: selectedMale ? 'Male' : 'Female',
                                TimeSlot: selectedSlot !== -1 ? slots[selectedSlot].sloT : ''
                            };

                            saveAppointmentData(appointmentData);

                            navigation.navigate('Success', { Name, appointmentData });
                        }
                        }
                    }
                    >
                        <Text style={styles.buttonText}>Book Now</Text>
                    </TouchableOpacity>


                </View>

            </View>
        </ScrollView>

    );
};
export default BookAppointment;

const styles = StyleSheet.create({
    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 15,
        backgroundColor: '#2196f3',
        width: 70,
        height: 40,
        borderRadius: 5,
        marginTop: 15,
        marginRight: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        marginLeft: 15,
    },
    topHeadingContainer: {
        flex: 1,
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',

    },
    bookNowButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196f3',
        height: 45,
        borderRadius: 5,
        marginTop: 20,
    },

    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
    },
    topHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0.2,
    },
    docName: {
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    Img: {
        width: 130,
        height: 120,
        borderRadius: 75,
        alignSelf: 'center',
    },
    heading: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 8,
        marginLeft: 15,
    },
    timeSlot: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameInput: {
        borderRadius: 10,
        marginTop: 10,
        width: '94%',
        height: 45,
        borderWidth: 0.5,
        alignSelf: 'center',
        paddingLeft: 20,
    },
    genderView: {
        marginTop: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    gender: {
        borderRadius: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnView: { marginTop: 20, marginBottom: 20 },

});
