import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../config.js';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

        const userRef = firebase.firestore().collection('users');

        // Perform a query to fetch the user document based on email and password
        userRef
            .where('email', '==', email)
            .where('password', '==', password)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // Matching document found, navigate to the home page
                    navigation.navigate('Home');
                } else {
                    // No matching document found, display an error message
                    alert('Invalid email or password');
                }
            })
            .catch((error) => {
                console.log('Error getting user document:', error);
            });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Hello Dr!</Text>
            <Text style={styles.subtitle}>Please enter your email and password to continue</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don't have an account? Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        
    },
    input: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2196f3',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Login;
