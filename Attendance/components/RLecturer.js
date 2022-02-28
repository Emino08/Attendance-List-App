import React, {useState, createRef, useEffect, useRef} from 'react';
import {View, Text,TextInput, Button, TouchableHighlight, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import {URL} from '../url/Url';

// const K_OPTIONS = [
//   {
//     item: 'Juventus',
//     id: 'JUVE',
//   },
//   {
//     item: 'Real Madrid',
//     id: 'RM',
//   },
//   {
//     item: 'Barcelona',
//     id: 'BR',
//   },
//   {
//     item: 'PSG',
//     id: 'PSG',
//   },
//   {
//     item: 'FC Bayern Munich',
//     id: 'FBM',
//   },
//   {
//     item: 'Manchester United FC',
//     id: 'MUN',
//   },
//   {
//     item: 'Manchester City FC',
//     id: 'MCI',
//   },
//   {
//     item: 'Everton FC',
//     id: 'EVE',
//   },
//   {
//     item: 'Tottenham Hotspur FC',
//     id: 'TOT',
//   },
//   {
//     item: 'Chelsea FC',
//     id: 'CHE',
//   },
//   {
//     item: 'Liverpool FC',
//     id: 'LIV',
//   },
//   {
//     item: 'Arsenal FC',
//     id: 'ARS',
//   },

//   {
//     item: 'Leicester City FC',
//     id: 'LEI',
//   },
// ];

export default () => {

const [lecturerID, setLecturerID] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const [lecturerPhone, setLecturerPhone] = useState('');
const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [selectCourses, setSelectCourses] = useState([]);
  const [selectNewCourse, setSelectNewcourse] = useState();
  var NewCourses = [];

  const passwordInputRef = createRef();
  // const passwordInputRef = createRef();
  // const passwordInputRef = createRef();
const isMounted = useRef(false);
  useEffect(() => {
isMounted.current = true;
    let isActive = true;
    axios
        .get(`${URL}/courses`)
        .then(function (response) {
          // handle success
          // console.log(response.data[0]);
// console.log(props.navigation);
          function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return {[newKey]: obj[key]};
    });
    return Object.assign({}, ...keyValues);
          }
          
          const newKeys = {courseName: 'item', courseID: 'id'};
          // console.log(response.data[0].length);
          let data = response.data[1]
          for (let i = 0; i < data.length; i++) {
            const renamedObj = renameKeys(data[i], newKeys);

         NewCourses.push((renamedObj));
            // console.log(renamedObj);
            
            console.log(NewCourses);
            // console.log(JSON.stringify);
          }
          
          setSelectNewcourse(NewCourses)
          // setSelectCourses(data);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });

    return () => (isMounted.current = false);

  },[])
   handleOnPress = () => {
  navigation.navigate('ForgetPassword');
}

  const handleSubmitPress = () => {
    console.log(selectCourses);
    setErrortext('');
    if (!lecturerID) {
      alert('Please fill LecturerID');
      return;
    }
    if (!lecturerName) {
      alert('Please fill LecturerName');
      return;
    }
    if (!lecturerPhone) {
      alert('Please fill Lecturer Phone No');
      return;
    }
    if (!selectCourses) {
      alert('Please select Courses');
      return;
    }

    let data = {lecturerID, lecturerName, lecturerPhone,lecturerCourses:selectCourses};

    console.log(data);
    console.log(selectCourses);
    axios
      .post(`${URL}/lecturer`, data)
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

   setLecturerID('');
   setLecturerName('');
   setLecturerPhone('');
  }
  
//  const submitHandler = () => {
//    setLecturerID('');
//    setLecturerName('');
//    setLecturerPhone('');
//  };
  
 const onMultiChange = (item) => {
    setSelectCourses(xorBy(selectCourses, [item], 'id'));
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(2, 62, 196, 1)',
      }}>
      <View style={styles.margin1}>
        <KeyboardAvoidingView enabled>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View>
              <TextInput
                // onSubmitEditing={submitHandler}
                style={styles.textInput}
                onChangeText={lecturerID => setLecturerID(lecturerID)}
                placeholder="Enter LecturerID" //dummy@abc.com
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}></TextInput>
            </View>

            <View style={styles.margin}>
              <TextInput
                // onSubmitEditing={submitHandler}
                style={styles.textInput}
                onChangeText={LecturerName => setLecturerName(LecturerName)}
                placeholder="Enter LecturerName" //dummy@abc.com
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}></TextInput>
            </View>

            <View style={styles.margin}>
              <TextInput
                // onSubmitEditing={submitHandler}
                style={styles.textInput}
                onChangeText={lecturerPhone => setLecturerPhone(lecturerPhone)}
                placeholder="Enter Phone Number" //12345
                placeholderTextColor="white"
                keyboardType="numeric"
                // ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"></TextInput>
            </View>
          </View>

          <View style={{alignItems: 'center', marginTop: 27}}>
            <SelectBox
              // viewMargin
              width={320}
              label="Select Courses"
              options={selectNewCourse}
              selectedValues={selectCourses}
              onMultiSelect={onMultiChange}
              onTapClose={onMultiChange}
              isMulti
              optionStyle={{
                color: 'black',
                fontWeight: 'bold',
                backgroundColor: 'white',
              }}
              labelStyle={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
              }}
              containerStyle={{
                borderWidth: 2,
                borderColor: 'rgba(255, 215, 0, 255)',
                // borderRadius: 15,
                backgroundColor: 'white',
              }}
              optionContainerStyle={{
                color: 'black',
                backgroundColor: 'white',
              }}
              inputFilterContainerStyle={{
                color: 'black',
                backgroundColor: 'white',
              }}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSubmitPress}
            style={{
              height: 40,
              width: 328,
              borderRadius: 10,
              backgroundColor: 'rgba(255, 215, 0, 255)',
              marginLeft: 50,
              marginRight: 50,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'rgba(2, 62, 196, 1)',
                textAlign: 'center',
                paddingTop: 4,
                fontSize: 25,
                fontFamily: 'OCR A',
              }}>
              REGISTER LECTURER
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );

  // function onMultiChange() {
  //   return item => setSelectCourses(xorBy(selectCourses, [item], 'id'));
  // }

  return isMounted;
};

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingStart: 16.5,
    paddingTop: 16,
    width: 328,
    height: 56,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 255)',
    color:'white'
  },
  margin1: {
    marginTop: 127,
  },
  margin: {
    marginTop: 27,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
