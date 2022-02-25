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
import {URL} from '../../url/Url';

export default () => {
  const [courseID, setCourseID] = useState('');
  const [courseName, setCourseName] = useState('');
  const [semester, setSemester] = useState('');
  const [yearID, setYearID] = useState('');
  const [programID, setProgramID] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();
  // const passwordInputRef = createRef();
  // const passwordInputRef = createRef();

  useEffect(() => {});
  handleOnPress = () => {
    navigation.navigate('ForgetPassword');
  };

  const handleSubmitPress = () => {
    setErrortext('');
    if (!courseID) {
      alert('Please fill CourseID');
      return;
    }
    if (!courseName) {
      alert('Please fill CourseName');
      return;
    }
    if (!semester) {
      alert('Please fill Semester');
      return;
    }
    if (!yearID) {
      alert('Please fill Course Year');
      return;
    }
    if (!programID) {
      alert('Please fill ProgramID');
      return;
    }


    let data = {courseID, courseName, semester, yearID, programID};

    console.log(data);
    axios
      .post(`${URL}/courses`, data)
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const submitHandler = () => {
    setCourseID('');
    setCourseName('');
    setSemester('');
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
                onChangeText={courseID => setCourseID(courseID)}
                placeholder="CourseID" //dummy@abc.com
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
                onChangeText={courseName => setCourseName(courseName)}
                placeholder="CourseName" //dummy@abc.com
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
                onChangeText={semester =>
                  setSemester(semester)
                }
                placeholder="CourseSemester" //dummy@abc.com
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
                placeholder="CourseYear" //dummy@abc.com
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
              UPDATE MODULE
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
    paddingTop: 16,
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
