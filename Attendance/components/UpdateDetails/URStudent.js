import React, {useState, createRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { URL } from '../../url/Url';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default () => {
  const [studentID, setStudentID] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [programID, setProgramID] = useState('');
  const [yearID, setYearID] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [connection, setConnection] = useState(false)
  const [device, setDevice] = useState(undefined)
  const [data, setData] = useState([]);
  const [enroll, setEnroll] = useState(undefined)
  const [polling, setPolling] = useState(true)

  const passwordInputRef = createRef();
  // const passwordInputRef = createRef();
  // const passwordInputRef = createRef();

  useEffect(() => {
  
  },[]);
  handleOnPress = () => {
    navigation.navigate('ForgetPassword');
  };

  const handleSubmitPress = () => {
    // console.log(enroll);
     
    setErrortext('');
    if (!studentID) {
      alert('Please fill studentID');
      return;
    }
    if (!studentName) {
      alert('Please fill studentName');
      return;
    }
    if (!studentEmail) {
      alert('Please fill studentEmail');
      return;
    }

    if (!studentPhone) {
      alert('Please fill studentPhone');
      return;
    }


    if (!programID) {
      alert('Please fill ProgramID');
      return;
    }
    if (!yearID) {
      alert('Please fill student Year');
      return;
    }

    let data = {studentID, studentName, studentEmail, studentPhone, yearID, programID};

    console.log(data);
    axios
      .put(`${URL}/student/${Number(studentID)}`, data)
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const submitHandler = () => {
    setStudentID('');
    setStudentName('');
    setStudentEmail('');
    setStudentPhone('');
    setYearID('');
    setProgramID('');
  };
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
                onChangeText={studentID => setStudentID(studentID)}
                placeholder="studentID" //dummy@abc.com
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
                onChangeText={studentName => setStudentName(studentName)}
                placeholder="studentName" //dummy@abc.com
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
                onChangeText={studentEmail => setStudentEmail(studentEmail)}
                placeholder="StudentEmail" //dummy@abc.com
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="email-address"
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
                onChangeText={studentPhone => setStudentPhone(studentPhone)}
                placeholder="StudentPhone" //dummy@abc.com
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
                onChangeText={programID => setProgramID(programID)}
                placeholder="ProgramID" //dummy@abc.com
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
                onChangeText={yearID => setYearID(yearID)}
                
                placeholder="studentYear" //dummy@abc.com
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
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'rgba(2, 62, 196, 1)',
                textAlign: 'center',
                paddingTop: 4,
                fontSize: 25,
                fontFamily: 'OCR A',
              }}>
              UPDATE STUDENT
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingStart: 16.5,
    paddingTop: 10,
    width: 328,
    height: 56,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 255)',
    color: 'white',
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
