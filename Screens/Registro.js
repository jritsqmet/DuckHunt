import { View, Text, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'


import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig, db } from '../Components/Config';
import { ref, set, onValue, remove, getDatabase} from "firebase/database";

export default function Registro({ navigation }) {

  const [correo, setcorreo] = useState("")
  const [pass, setpass] = useState("")
  const [nick, setnick] = useState("")
  const [edad, setedad] = useState("")

  const [datos, setdatos] = useState([])


  function registrar() {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, correo, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("Mensaje", "Usuario registrado con éxito");
        navigation.navigate("Juego");
        guardar(correo, nick, edad);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        Alert.alert("Error")
      });
  }

  function guardar(correo, nick, edad) {
    set(ref(db, 'jugadores/' + nick), {
      email: correo,
      nick: nick,
      age: edad
    });
  }

  function leer() {
    const starCountRef = ref(db, 'jugadores/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      const dataArray = Object.entries(data).map(([key, value]) => ({
        key, ...value,
      }));

      setdatos(dataArray)

      console.log(datos)

    });
  }

  function eliminar(id){
    remove(ref(set(db, 'jugadores/'+ id)))
  }

  return (
    <View>
      <Text>Registro</Text>
      <TextInput
        placeholder='Ingrese email'
        keyboardType='email-address'
        onChangeText={(text) => setcorreo(text)}
      />
      <TextInput
        placeholder='Ingrese un nick'
        onChangeText={(text) => setnick(text)}
      />
      <TextInput
        placeholder='Ingrese edad'
        onChangeText={(text) => setedad(text)}
        keyboardType='numeric'
      />

      <TextInput
        placeholder='Ingrese contraseña'
        onChangeText={(text) => setpass(text)}
      />

      <Button
        title='Registrar'
        onPress={() => registrar()}
      />

      <Button
        title='Leer'
        onPress={() => leer()}
      />

      <FlatList
        data={datos}
        renderItem={({ item }) =>
          <View>
            <Text>{item.nombre}</Text>
            
            <Button title='Eliminar' 
            
            onPress={()=>eliminar(item.key)}
            
            />
          </View>
        }
      />
    </View>
  )
}