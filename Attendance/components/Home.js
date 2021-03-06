import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { URL } from '../url/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();


// const navigation = useNavigation();


export default ({ route, navigation }) => {
  
  const details = route.params;

  const [hodName, setHodName] = useState('HOD Name');
  const [value, setValue] = useState('')

  // console.log("My user" + details );
  // const value = AsyncStorage.getItem('username');
  // console.log("this value is" + JSON.stringify(value));
  // let lecturerID = value;
  useEffect(() => {
    getData("username");
  },[])
  
  axios
    .get(`${URL}/lecturer/${value}`)
    .then(function (response) {
      // handle success
      setHodName(response.data.lecturerName);
      console.log(response.data.lecturerName);
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
  
   const getData = async key => {
     try {
       const value = await AsyncStorage.getItem(key);
       if (value !== null) {
         // value previously stored
        //  console.log('Previosly stored');
        //  console.log(value);
setValue(value);
      //    axios
      //      .get(`${URL}/lecturer/${value}`)
      //      .then(function (response) {
      //        // handle success
      //        setHodName(response.data.lecturerName);
      //        console.log(response.data.lecturerName);
      //      })
      //      .catch(function (error) {
      //        // handle error
      //        console.log(error);
      //      })
      //      .then(function () {
      //        // always executed
      //      });
       }
     } catch (e) {
       // error reading value
       console.log(e);
     }
   };
  
  handleDAttendance = () => {
  navigation.navigate('AttendanceHome');
  }

  handleRLecturer = () => {
    navigation.navigate('RegistrationHome');
  };

  handleModule = () => {
    navigation.navigate('UpdateHome');
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
  handleAllAttendance = () => {
    navigation.navigate('AllAttendance');
  };

  handleAllAttendance2 = () => {
    navigation.navigate('AllAttendance2');
  };

  handleAllAttendace1 = () => {
    navigation.navigate('AllAttendance1');
  };

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
      <View
        style={{
          width: 340,
          height: 163,
          backgroundColor: 'rgba(255, 255, 255, 255)',
          borderRadius: 10,
          marginTop: 10,
          color: 'black',
        }}>
        <Text
          style={{
            fontFamily: 'Lucida Console',
            fontSize: 34,
            marginTop: 15,
            marginLeft: 20,
            color: 'black',
          }}>
          WELCOME
        </Text>
        <Text
          style={{
            fontFamily: 'Lucida Console',
            fontSize: 24,
            marginTop: 5,
            marginLeft: 20,
            color: 'black',
          }}>
          {hodName}
        </Text>
        <Text
          style={{
            fontFamily: 'Limoges',
            fontSize: 21,
            marginTop: 5,
            marginLeft: 20,
            color: 'black',
          }}>
          Head of Department
        </Text>
      </View>

      <TouchableHighlight
        onPress={handleDAttendance}
        style={{
          paddingStart: 24,
          paddingTop: 5,
          width: 340,
          height: 43,
          borderWidth: 2,
          borderColor: 'rgba(255, 215, 0, 255)',
          marginTop: 35,
        }}>
        <Text
          style={{
            fontFamily: 'Lucida Console',
            fontSize: 18,
            color: 'rgba(255, 255, 255, 255)',
          }}>
          Take Attendance
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
          Registration
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
          Update Details
        </Text>
      </TouchableHighlight>
    </View>
  );
};