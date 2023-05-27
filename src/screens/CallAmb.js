import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import React, { useState } from 'react';

import { firebase } from '../../config.js';
import { useNavigation } from '@react-navigation/native';

const CallAmb = () => {
    const todoRef = firebase.firestore().collection('newData');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    const addField = () => {
        if (addData && addData.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createAt: timestamp
            };
            todoRef.add(data)
                .then(() => {
                    setAddData('');
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);

                })
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add Address'
                    placeholderTextColor='#000000'
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    multiline={true}
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addField} >
                    <Text style={styles.buttonText}>Call Ambulance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}  onPress={() => {
                        navigation.navigate('Home');
                    }}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
    }
    ,
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button1: {
        height: 40,
        marginTop:100,
        
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }

});
export default CallAmb;