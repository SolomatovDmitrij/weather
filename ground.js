import React from 'react'
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native'
import oper from './img/oper.png'
import oper2 from './img/oper2.png'

export default function Ground(props) {
    const imageAspectRatio = 609 / 231
    const height_oper = props.height * 0.6
    const ratio2 = props.width / height_oper
    const top1 = ratio2 > imageAspectRatio ? (ratio2 - imageAspectRatio) * height_oper : 0
    const scaledHeight = props.width / imageAspectRatio;
    return (
        <View style={{ flex: 0.6, flexDirection: "column" }} >
            <ImageBackground 
                source={oper2}
                 resizeMode='cover'
                 style={{ 
                     position: 'absolute',  
                     overflow: 'hidden', bottom: 0,
                     flex: 1,  height: scaledHeight, width: '100%'
                 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
        height: 'auto',
        overflow: 'hidden'
    }, 
    view: {
        display: 'flex',
        backgroundColor: '#0bda51',
        flex: 0.4,
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'bottom',
        flexDirection: 'column'
    }
})
