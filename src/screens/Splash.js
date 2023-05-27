import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>

      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.texts}>Hello Dr! </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196f3',
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: '#fff',
  },
  texts: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 20,
    marginLeft: 140,
  }
});

export default Splash;
