import { View, Text, TextInput, Button, Alert } from 'react-native'
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
        <View>
            <Text>Login</Text>

            <TextInput
                placeholder='Ingrese login'
                keyboardType='email-address'
                onChangeText={(text) => setcorreo(text)}
                value={correo}
            />

            <TextInput
                placeholder="Ingrese contraseña"
                onChangeText={(text) => setpass(text)}
                value={pass}
            />

            <Button
                title='Login'
                onPress={()=>login()}
            />

            <Button
                title='Registrar'
                onPress={()=> registrar()}
            />

        </View>
    )
}