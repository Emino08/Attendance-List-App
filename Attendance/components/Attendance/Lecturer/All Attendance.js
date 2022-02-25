import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default () => {
  return (
    <View
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(2, 62, 196, 1)',
      }}>
      <View
        style={{
          width: 340,
          height: 125,
          backgroundColor: 'rgba(2, 62, 196, 1)',
          borderRadius: 10,
          marginTop:60        }}>
        <Text
          style={{
            fontFamily: 'Limoges',
            fontSize: 18,
            color: 'white',
            letterSpacing: 1.5,
          
          }}>
          Select the program you want to check attendance. Note that the
          attendance is for 2021/2022 Accademic Year.
        </Text>
      </View>

      <TouchableHighlight
        style={{
          paddingStart: 24,
          paddingTop: 5,
          width: 340,
          height: 43,
          borderWidth: 2,
          borderColor: 'rgba(255, 215, 0, 255)',
          marginTop: 5,
        }}>
        <Text
          style={{
            fontFamily: 'Lucida Console',
            fontSize: 18,
            color: 'rgba(255, 255, 255, 255)',
          }}>
          Computer Science
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={{
          paddingStart: 24,
          paddingTop: 5,
          width: 340,
          height: 43,
          borderWidth: 2,
          borderColor: 'rgba(255, 215, 0, 255)',
          marginTop: 27,
        }}>
        <Text
          style={{
            fontFamily: 'Lucida Console',
            fontSize: 18,
            color: 'rgba(255, 255, 255, 255)',
          }}>
          Physics
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={{
          alignItems: 'flex-start',
          paddingStart: 24,
          paddingTop: 5,
          width: 340,
          height: 43,
          borderWidth: 2,
          borderColor: 'rgba(255, 215, 0, 255)',
          marginTop: 27,
        }}>
        <Text
          style={{
            fontFamily: 'Lucida Console',
            fontSize: 18,
            color: 'rgba(255, 255, 255, 255)',
          }}>
          Energy Studies
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={{
          alignItems: 'flex-start',
          paddingStart: 24,
          paddingTop: 5,
          width: 340,
          height: 43,
          borderWidth: 2,
          borderColor: 'rgba(255, 215, 0, 255)',
          marginTop: 27,
        }}>
        <Text
          style={{
            fontFamily: 'Lucida Console',
            fontSize: 18,
            color: 'rgba(255, 255, 255, 255)',
          }}>
          BIT
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={{
          paddingStart: 24,
          paddingTop: 5,
          width: 340,
          height: 43,
          borderWidth: 2,
          borderColor: 'rgba(255, 215, 0, 255)',
          marginTop: 27,
        }}>
        <Text
          style={{
            fontFamily: 'Lucida Console',
            fontSize: 18,
            color: 'rgba(255, 255, 255, 255)',
          }}>
          Electronics and Telecommunication
        </Text>
      </TouchableHighlight>
    </View>
  );
};
