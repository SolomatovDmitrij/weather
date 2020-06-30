import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
    
    const KEY = "84434ac1dc19521fb0a5c188362b3b63"

  const [my_location, setLocation] = useState({latitude: 55.0267716, longitude: 82.9288806});
  const [errorMsg, setErrorMsg] = useState(null);
    const [weather, set_weather] = useState({});
    const [city, set_city] = useState(null);

    function fetchWeather(lat, lon) {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${KEY}&units=imperial`
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

    return (
    <View style={styles.container}>
      <Text>{JSON.stringify(my_location)}</Text>
      <Text>{JSON.stringify(weather)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20px',
  },
});
