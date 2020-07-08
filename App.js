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

//    const to_cell = (forengeit) =>  ((forengeit - 32) / 1.8).toFixed(1) 

    function get_time(time_utc) {
        let date = new Date(time_utc*1000)
        return date.toLocaleString()
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
            //            if(my_location.coords) {
            //                await fetchWeather(my_location.coords.latitude, my_location.coords.longitude)
            //            } else {
            await fetchWeather(my_location.latitude, my_location.longitude)
            //            }
        })();
    }, [my_location])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (my_location) {
        text = JSON.stringify(my_location);
    }
    const temp = (weather && 'feels_like' in weather.main) ? weather.main.feels_like : 0
//    const back_color = get_color_style(temp)
//    const style_container = StyleSheet.flatten([
 //       styles.container,
  //      back_color
   // ])
    const style_cloud = StyleSheet.flatten([
        {
            opacity: weather ? weather.clouds.all / 100 : 0,
            width: dimensions.width,
            height:  Math.round(dimensions.width / 2.36)

        }
    ])
    const opacity_clouds = 0.5
    const term_height = Math.round(dimensions.height / 10)
    const pressure = weather ? (weather.main.pressure - 1000) : 0
    const sun_radius = Math.round(Math.min(dimensions.width, dimensions.height) / 10)
    const wind_speed = (weather && 'wind' in weather) ? weather.wind.speed : 0
    //console.log('wind:', wind_speed)
//    console.log('sun_radius:', sun_radius)
  //  console.log('dimensions:', dimensions)

    return (
        <View style={ styles.container }>
            <Sun temp={temp} sun_radius={sun_radius}/>
            {weather && <Sky wind_speed={weather.wind.speed} opacity={opacity_clouds} /> }
            <Ground />
            <Dash temp={temp} height={term_height} pressure={pressure} />
        </View>

    )

    /*
    return (
        <View style={ styles.container }>

        <ImageBackground style={ style_cloud } source={oper}>
        {weather && <Text>{(weather.name)}</Text> }
        {weather && <Sun temp={temp} />}
        {weather && <Text>Облачность: {(weather.clouds.all)}%</Text> }
        {weather && <Text>Температура: {(weather.main.temp)}°C</Text> }
        {weather && <Text>Ощущается как {temp}°C</Text> }
        {weather && <Text>Давление: {weather.main.pressure} ГПа</Text> }
        {weather && <Text>Влажность: {weather.main.humidity}%</Text> }
        {weather && weather.wind && <Text>Скорость ветра: {weather.wind.speed} м/c</Text> }
        {weather && <Text>Восход: {get_time(weather.sys.sunrise)}</Text> }
        {weather && <Text>Закат: {get_time(weather.sys.sunset)}</Text> }
        </ImageBackground>
        </View>
    );
    */
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#0000f0',
    },
});

