import { View, Text, Button } from 'react-native'
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
    <View>
      <Text>Juego</Text>
      <Button
        title='LogOut'
        onPress={()=>logout()}
      />
    </View>
  )
}