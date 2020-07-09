import { Animated, Dimensions, Image, View, StyleSheet, Easing } from 'react-native'
import React, { useRef, useEffect } from 'react'
import cloud1 from './img/cloud-01.png'
import cloud2 from './img/cloud-02.png'
import cloud3 from './img/cloud-03.png'
import black_cloud from './img/clouds.png'

export default function Sky(props) {
    const dimensions = Dimensions.get('window');
    const ratio_cloud1 = 1920 / 1047
    const ratio_cloud3 = 1920 / 1135
    const ratio_black_cloud = 1607 / 682

    const sky = {
        'height': Math.round(dimensions.height / 2),
        'width': dimensions.width
    }
    
    const cloud_position = useRef( new Animated.Value(0) ).current
    const duration_time = Math.round(1000000 / props.wind_speed)
    const run_animation = () => {
        cloud_position.setValue(0)
        console.log('duration:', duration_time)
        Animated.timing(
            cloud_position,
            {
                toValue: 100,
                duration: duration_time,
                easing: Easing.linear,
            }
        ).start(() => run_animation())
    }
    useEffect( () => run_animation(), [] )

    const styles = StyleSheet.create({
        clouds: {
            flex: 0.3,
            width: sky.width,
            height: sky.height,
        },
        cloud1: {
            position: 'absolute',
            left: 0,
            width: '100%',
        //    height: Math.round(sky.height / ratio_cloud1),
            opacity: props.opacity,
            overflow: 'hidden',
            transform: [{
                translateX: cloud_position.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, dimensions.width]
                }),
            }]
        },
        cloud2: {
            position: 'absolute',
            left: '-70%',
            width: '100%',
         //   height: Math.round(sky.height / ratio_cloud3),
            opacity: props.opacity,
            overflow: 'hidden',
            transform: [{
                translateX: cloud_position.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, dimensions.width]
                }),
            }]
        },
        cloud3: {
            position: 'absolute',
            left: '-100%',
            width: '100%',
            opacity: props.opacity,
            overflow: 'hidden',
            transform: [{
                translateX: cloud_position.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, dimensions.width]
                }),
            }]
        },
        cloud4: {
            position: 'absolute',
            left: '30%',
            opacity: props.opacity,
            width: '100%',
            overflow: 'hidden',
            transform: [{
                translateX: cloud_position.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, dimensions.width]
                }),
            }]
        },
    })

    return (
        <Animated.View style={styles.clouds}>
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud1]) } source={cloud1} />
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud2]) } source={cloud3} />
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud3]) } source={cloud1} />
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud4]) } source={cloud3} />
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud4]) } source={cloud3} />
        </Animated.View>
    )
}
