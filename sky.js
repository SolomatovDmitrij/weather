import { Animated, Dimensions, Image, View, StyleSheet, Easing } from 'react-native'
import React, { useRef, useEffect } from 'react'
import cloud1 from './img/cloud-01.png'
import cloud2 from './img/cloud-02.png'
import cloud3 from './img/cloud-03.png'

export default function Sky(props) {
    const dimensions = Dimensions.get('window');
    
    const sky = {
        'height': Math.round(dimensions.height / 2),
        'width': dimensions.width
    }
    
    const cloud_position = useRef( new Animated.Value(0) ).current

    function get_cloud_speed(speed) {
        console.log('speed', Math.round(10000/speed))
        console.log('speed2', speed)
        return Math.round(100000/speed)
    }
    const duration_time = Math.round(100000 / props.wind_speed)
    const run_animation = () => {
        cloud_position.setValue(0)
        console.log('duration:', duration_time)
      // const cloud_speed = get_cloud_speed(props.wind_speed)
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

//    console.log('sky_height:', sky)
//    const sky_height = 100
    const styles = StyleSheet.create({
        clouds: {
            flex: 0.5,
            width: sky.width,
            height: sky.height,
            //position: 'absolute',
//            top: 50,
            overflow: 'hidden',
            transform: [{
                translateX: cloud_position.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                }),
            }]
        },
        cloud1: {
            position: 'absolute',
            left: 0,
            opacity: props.opacity,
        },
        cloud2: {
            position: 'absolute',
            left: '-70%',
            opacity: props.opacity,
        },
        cloud3: {
            position: 'absolute',
            left: '-100%',
            opacity: props.opacity,
        },
        cloud4: {
            position: 'absolute',
            left: '30%',
            opacity: props.opacity,
        },
    })

    return (
        <View style={styles.clouds}>
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud1]) } source={cloud1} />
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud2]) } source={cloud3} />
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud3]) } source={cloud1} />
            <Animated.Image style={ StyleSheet.flatten([styles.clouds, styles.cloud4]) } source={cloud3} />
        </View>
    )
}
