import React, { useState, useEffect } from 'react';
import { Dimensions, ImageBackground ,Image, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import clouds2 from './img/clouds2.png'
import oper from './img/oper.png'
import Sun from './sun'
import Sky from './sky'
import Ground from './ground'
import Dash from './dash'

export default function App() {
    
    const dimensions = Dimensions.get('window');
    const KEY = "84434ac1dc19521fb0a5c188362b3b63"

    const [my_location, setLocation] = useState({latitude: 55.0267716, longitude: 82.9288806});
    const [errorMsg, setErrorMsg] = useState(null);
    const [weather, set_weather] = useState(null);
    const [city, set_city] = useState(null);

    function get_time(time_utc) {
        let date = new Date(time_utc*1000)
        return date.toLocaleString()
    }

    function get_color_of_sky(clouds_percent) {
        const koeff = Math.round(clouds_percent * 1.5)
        const r = to_hex(koeff)
        const g = to_hex(koeff)
        const b = to_hex(255 - koeff)
        return ('#' + r + g + b )

    }
    function to_hex(dig) {
         return ('0' + dig.toString(16)).slice(-2)     
    }

    function fetchWeather(lat, lon) {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${KEY}&units=metric&lang=ru`
        )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                set_weather(data);
            });
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();

            // let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                //        setErrorMsg('Permission to access my_location was denied');
                //          setLocation({latitude: 55.0267716, longitude: 82.9288806})
                return
            }
            let {coords} = await Location.getCurrentPositionAsync({});
            setLocation(coords);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if(!my_location) { return null }
            await fetchWeather(my_location.latitude, my_location.longitude)
        })();
    }, [my_location])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (my_location) {
        text = JSON.stringify(my_location);
    }
    const temp = (weather && 'feels_like' in weather.main) ? weather.main.feels_like : 0
    
    const term_height = Math.round(dimensions.height / 10)
    const pressure = weather ? (weather.main.pressure - 1000) : 0
    const sun_radius = Math.round(Math.min(dimensions.width, dimensions.height) / 10)
    const wind_speed = (weather && 'wind' in weather) ? weather.wind.speed : 0

    return (
        <View style={[ styles.container, {
            backgroundColor: get_color_of_sky(weather ? weather.clouds.all : 0 )
//            backgroundColor: get_color_of_sky(10)
        } ] }>
                {weather && <Sun temp={temp} sun_radius={sun_radius}/> }
                {weather && <Sky wind_speed={weather.wind.speed} 
                    opacity={weather.clouds.all / 100} 
                        /> }
                {weather && <Ground height={dimensions.height} width={dimensions.width}/> }
                {weather && <Dash temp={temp} height={term_height} pressure={pressure}
                        speed={weather.wind.speed} 
                        clouds={weather.clouds.all}
                        /> }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#000000',
    },
});

