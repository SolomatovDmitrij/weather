import { Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Sun(props) {
    
    function to_hex(dig) {
         return ('0' + dig.toString(16)).slice(-2)     
    }

    function to_hex_color(r,g,b) {
        return '#' + to_hex(r) + to_hex(g) + to_hex(b)
    }

    function get_color_style(temp) {
        console.log('temp:', temp)
        let back_color = '#ffffff'
        let value_of_color = 'ff'
        if(temp >= 0) {
            const r = 'ff'
            const sum_g_b = Math.floor(510 - (temp*10))
            const b = (sum_g_b - 255) > 0 ? sum_g_b - 255 : 0
            const g = sum_g_b - b
            back_color = to_hex_color(r, g, b)
        } else {
            const sum_r_g = Math.floor(510 - (-temp*10))
            const b = 'ff'
            const r = (sum_r_g - 255) > 0 ? sum_r_g - 255 : 0
            const g = sum_r_g - r
            value_of_color = Math.floor((255 - (temp*5)).toString(16))
            back_color = to_hex_color(r, g, b)
        }
//        console.log('background:', back_color)
        return {
            backgroundColor: back_color
        }
    }

    const sunStyle = StyleSheet.flatten([
        {
            left: 50,
            top: 50,
            position: 'absolute',
            height: props.sun_radius * 2,
            width: props.sun_radius * 2,
            borderRadius: props.sun_radius,
        }, get_color_style(props.temp)
    ])
    return (
        <Text style={ sunStyle }>
        </Text>
    )
}

