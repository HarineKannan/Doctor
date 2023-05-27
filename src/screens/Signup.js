import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Keyboard } from 'react-native';
import { firebase } from '../../config.js';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const navigation = useNavigation();
    
    const todoRef = firebase.firestore().collection('users');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        if (name && name.length > 0 && email && email.length > 0 && password && password.length > 0) {
            if (password === confirmPassword && isStrongPassword(password)) {
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
                const data = {
                    name: name,
                    email: email,
                    password: password,
                    createAt: timestamp,
                };
                todoRef
                    .add(data)
                    .then(() => {
                        setName('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        Keyboard.dismiss();
                        navigation.navigate('Login'); // Navigate to the Login screen after successful signup
                    })
                    .catch((error) => {
                        alert(error);
                    });
            } else {
                if (password !== confirmPassword) {
                    alert('Passwords do not match.');
                } else if (!isStrongPassword(password)) {
                    alert('Password is not strong enough.');
                }
            }
        } else {
            alert('Invalid input.');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>New User ? Register here</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Sign Up" onPress={handleSignup} color="#2196f3" />
            <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text
                    style={styles.linkText}
                    onPress={() => navigation.navigate('Login')}>
                    Log In
                </Text>
            </Text>
        </View>
    );
};
const isStrongPassword = (password) => {
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    loginText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    linkText: {
        color: 'blue',
    },
});

export default Signup;
