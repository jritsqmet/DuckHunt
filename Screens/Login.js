import { View, Text, TextInput, Button, Alert, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Components/Config';

export default function Login( { navigation } ) {

    const [correo, setcorreo] = useState('')
    const [pass, setpass] = useState('')

    function login() {

        const app= initializeApp(firebaseConfig)
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, correo, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                
                navigation.navigate('Juego')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
     
                if(errorCode === "auth/wrong-password"){
                    Alert.alert("Error", "Verifique las credenciales")
                }else{
                    Alert.alert("Error")
                }
                console.log(errorCode)
            });

        limpiar()
    }

    function limpiar(){
        setcorreo("")
        setpass("")
    }

    function registrar(){
        navigation.navigate("Registro")
    }

    



    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/Stage02.png')}
                style={styles.fondo}
            >
                <Image
                    source={require("../assets/images/title.png")}
                    style={styles.imgT}
                />
                

                <TextInput
                    placeholder='Ingrese login'
                    keyboardType='email-address'
                    onChangeText={(text) => setcorreo(text)}
                    value={correo}
                    style={styles.inputLogin}
                />

                <TextInput
                    placeholder="Ingrese contraseña"
                    onChangeText={(text) => setpass(text)}
                    value={pass}
                    style={styles.inputLogin }
            
                />


                <TouchableOpacity style={styles.btn} onPress={() => login()}>
                    <Text style={styles.txt}>LOGIN</Text>
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.btn} onPress={() => registrar()}>
                    <Text style={styles.txt}>REGISTRAR</Text>
                </TouchableOpacity>

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
    inputLogin: {
        backgroundColor: 'transparent',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: "80%",
        height: 50,
        alignSelf: 'center',
        textAlign:'center',
        fontSize:20

    },
    imgT: {
        height: 70,
        width: "90%",
        alignSelf: 'center',
        top: "-10%"
    },
    txt: {
        color:'white',
        fontSize:22,
        fontWeight:'bold'
    },
    
    btn: {
        width: '80%',
        backgroundColor: "#f52c28",
        alignItems: 'center',
        alignSelf: 'center',
        marginTop:20,
        height:35,
        borderRadius:30,
        justifyContent:'center'
        
    }

});