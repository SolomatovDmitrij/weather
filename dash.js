import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import termometr from './img/termometr.png'
import barometer from './img/barometer.png'
import fluger from './img/fluger.png'
import thunderstorms from './img/thunderstorms.png'

export default function Dash(props) {
    return (
        <View style={styles.dash}>
            <Image style={{height: props.height, width: 30}} source={termometr} />
            <Text style={styles.baseText}>{Math.round(props.temp)}°C</Text>
            <Image style={{height: props.height, width: props.height}} source={barometer} />
            <Text style={styles.baseText}>{props.pressure}</Text>
            <Image style={{height: props.height, width: props.height}} source={fluger} />
            <Text style={styles.baseText}>{props.speed}м/с</Text>
            <Image style={{height: props.height, width: props.height * 1.5}} source={thunderstorms} />
            <Text style={styles.baseText}>{props.clouds}%</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dash: {
        height: '100%',
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: '#630058',
        padding: 2,
        alignItems: 'center'
    },
    termometr: {
    },
    baseText: {
        fontWeight: 'bold',
        color: '#ffffff',
        paddingRight: 0
    }

})
