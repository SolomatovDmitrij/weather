import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import oper from './img/oper.png'

export default function Ground(props) {
    return (
        <View style={{
                backgroundColor: '#0bda51',
                flex: 0.4,
        }} >
            <Image style={[styles.container, {
                height: props.height / 2,
                transform: [{
                    translateY: -(props.height / 3)
                }]
            }]} source={oper}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container:  {
        width: '100%',
    }
})
