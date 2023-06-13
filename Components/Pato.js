import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Pato() {

    const [posicion, setposicion] = useState({ x: 0, y: 0 })

    function moverPato() {
        const MAX_X = 350;
        const MAX_Y = 750;

        const randomX = Math.floor(Math.random() * MAX_X)
        const randomY = Math.floor(Math.random() * MAX_Y)

        setposicion({ x: randomX, y: randomY })

    }

    return (
        <View style={{ top: posicion.y, left: posicion.x, position: 'absolute' }} >

            <TouchableOpacity onPress={ ()=> moverPato()  } style={styles.component}>
                <Image source={require("../assets/images/duck.png")} style={styles.img} />

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 90,
        height: 90
    },
    container:{
        
    }
})