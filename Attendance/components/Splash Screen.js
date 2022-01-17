import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image
} from 'react-native';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// console.log(windowWidth + " = " + windowHeight)


export default ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      // AsyncStorage.getItem('user_id').then(value =>
      //   navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
      // );
      // navigation.replace('DrawerNavigationRoutes')
      navigation.replace('LoginScreen');
    }, 5000);
  }, []);

  find_dimesions = layout => {
    const {x, y, width, height} = layout;
    console.warn(x);
    console.warn(y);
    console.warn(width);
    console.warn(height);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(2, 62, 196, 1)',
      }}>
      <Text
        onLayout={event => {
          this.find_dimesions(event.nativeEvent.layout);
        }}
        style={{
          fontFamily: 'Agency FB',
          fontSize: 21,
          textTransform: 'uppercase',
          color: 'rgba(255, 215, 0, 255)',
          // marginStart: 47,
          // justifyContent: 'center',
          textAlign: 'center',
        }}>
        Njala University
      </Text>
      <Text
        style={{
          fontFamily: 'OCR A',
          fontSize: 30,
          textTransform: 'uppercase',
          color: 'rgba(255, 215, 0, 255)',
          marginTop: 16,
          // marginStart: 20,
          // justifyContent: 'center',
          textAlign: 'center',
        }}>
        Attendance App
      </Text>
      <Text
        style={{
          fontFamily: 'Agency FB',
          fontSize: windowHeight - 780,
          textTransform: 'lowercase',
          color: 'rgba(255, 255, 255, 179)',
          // marginStart: windowWidth - 280,
          // justifyContent: 'center',
          textAlign: 'center',
          marginTop: windowHeight - 580,
        }}>
        by
      </Text>
      <Text
        style={{
          fontFamily: 'Boston Traffic',
          fontSize: windowHeight - 790,
          textTransform: 'uppercase',
          color: 'rgba(253, 255, 251, 204)',
          marginTop: 5,
          textAlign: 'center',
        }}>
        Emmanuel.m.koroma
      </Text>
    </View>
  );
};