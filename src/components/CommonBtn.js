import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CommonBtn = ({ w, h, txt, status }) => {
    const navigation = useNavigation();

    const onClick = () => {
        
        navigation.navigate('Home');
    };
    return (
        <TouchableOpacity
            onPress={() => {
                onClick();
                
            }}
            style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
            {status ? (
                <View
                    style={{
                        width: w,
                        height: h,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        backgroundColor: '#009FFD', // or any other color code you want to use
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 16 }}>{txt}</Text>
                </View>
            ) : (
                <View style={{
                    width: w,
                    height: h,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: '#8e8e8e',
                    opacity: 0.5,
                }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>{txt}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default CommonBtn;
