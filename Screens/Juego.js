import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native'
import React from 'react'

import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Components/Config';

export default function Juego( { navigation} ) {

  function logout(){
    const app= initializeApp(firebaseConfig)
    const auth = getAuth(app);
    signOut(auth).then(() => {
      navigation.navigate("Login")
      
    }).catch((error) => {

      Alert.alert("Error")
    });
}

  return (
    <View style={styles.container}>
    <ImageBackground
      source={require('../assets/images/Stage02.png')}
      style={styles.fondo}
    >
      <View style={styles.fila}>
        <View>
        <Image source={require('../assets/images/duck_hunt_logo.png')} style={styles.imgT} />
         <Text>0</Text>
        </View>
        <Text style={styles.time}>tiempo</Text>

        <TouchableOpacity style={styles.btn} onPress={() => logout()}>
          <Text style={styles.txt}>atras</Text>
        </TouchableOpacity>

      </View>


   

    </ImageBackground>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  fondo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  imgT: {
    height: 25,
    width: 25,

  },
  time: {
    color: 'white',
    fontSize: 20,

  },

  btn: {
    width: '5%',
    backgroundColor: "#f52c28",
    alignItems: 'center',
    height: 35,
    borderRadius: 30,
    justifyContent: 'center',

  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: "5%",
    marginTop: 20,
    height: 35,
    borderRadius: 30,
    top: "-90%"

  },


});