import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig, db } from '../Components/Config';

import Pato from '../Components/Pato';

///////////
import { ref, set } from "firebase/database";
/////////////////

export default function Juego({ navigation, route }) {

  const { nick } = route.params;

  const [tiempo, settiempo] = useState(10)

  // TEMPORIZADOR
  useEffect(() => {
    /*
    const temporizador= setInterval(()=>{
      settiempo((tiempoAnterior) => tiempoAnterior-1)
    }, 1000   //milisegundos
    )
    */
    const temporizador = setInterval(() => {
      settiempo((tiempoAnterior) => {
        if (tiempoAnterior == 1) {
          clearInterval(temporizador) // detiene el temporizador
        }
        return tiempoAnterior - 1;
      })
    }, 1000)

  }, [])

  useEffect(() => {
    if (tiempo == 0) {
      Alert.alert("GAME OVER", "Su puntuación es: ")
      settiempo(10)
      enviarP()

    }

  }, [tiempo])
  /////////////////////////////////////////////////////////////////////////


  //FASE 3


  function enviarP(){
    set(ref(db, 'puntuación/' + nick), {
      nick: nick,
      puntuación: 34
    });
  }


  function logout() {
    const app = initializeApp(firebaseConfig)
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

          <Text style={styles.time}> {tiempo}</Text>

          <TouchableOpacity style={styles.btn} onPress={() => logout()}>
            <Text style={styles.txt}>atras</Text>
          </TouchableOpacity>
        </View>

        <Pato />


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