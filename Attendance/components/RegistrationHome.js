import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import {URL} from '../url/Url';

const Stack = createStackNavigator();


// const navigation = useNavigation();


export default ({ navigation }) => {

  const [hodName, setHodName] = useState({ name: 'Mr. Emmanuel Koroma' });

  useEffect(() => {
    
  })
  
  axios
    .get(`${URL}/courses`)
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  

  // axios
  //   .post('http://172.25.176.1:3000/login', {
  //     userID: 10,
  //     password: 12345,
  //   })
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  
  // handleDAttendance = () => {
  // navigation.navigate('Attendance');
  // }

  handleRLecturer = () => {
    navigation.navigate('RLecturer');
  };

  handleModule = () => {
    navigation.navigate('RModule');
  };

  // handleAttendance1 = () => {
  //   navigation.navigate('Attendance1');
  // };
  
  // , {
  //     toggleState: isOnBlueToggleSwitch,
  //     pSelected: selectProgram,
  //     ySelected: selectYear,
  //     cSelected: selectCourses,
  //   }

  // handleAllAttendance = () => {
  //   navigation.navigate('AllAttendance');
  // };

  // handleAllAttendance2 = () => {
  //   navigation.navigate('AllAttendance2');
  // };

  // handleAllAttendace1 = () => {
  //   navigation.navigate('AllAttendance1');
  // };

  handleRStudent = () => {
    navigation.navigate('RStudent');
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(2, 62, 196, 1)',
        color: 'black',
      }}>
    
      <TouchableHighlight
        onPress={handleRStudent}
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
          Register Student
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handleRLecturer}
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
          Register Lecturer
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handleModule}
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
          Register Module
        </Text>
      </TouchableHighlight>
    </View>
  );
};