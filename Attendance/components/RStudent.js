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
import { URL } from '../url/Url';
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
  axios
    .get(`${URL}/student/lastindex`)
    .then(function (response) {
      let data = response.data
      let enrolling = data[0].sfingerprintID
      // console.log(enrolling);
      setEnroll(Number(enrolling) + 1);
      // console.log(enroll);
      // this.changeData(response)
      // handle success
      // let data = response.data;
      // if (typeof data === 'object') {
      //   console.log('Login');
      // }
      // // console.log(typeof data);
      // console.log(data);
      // let count = 0;
      // while (data === 'No FingerprintID found') {
      //   console.log('while loop');
      //   if (count === 0) {
      //     setTimeout(() => (name1 = device.write('MATCH')), 1000);
      //     count++;
      //   }
      //   break;
      // }
   
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  },[]);
  handleOnPress = () => {
    navigation.navigate('ForgetPassword');
  };

const sendData = async (dev) => {
  try {
    console.log(`Attempting to send data ${'this.state.text'}`);
    let message = 'START';
    let message1 = 'ENROLL ' + enroll;

    let name = await dev.write(message);

    console.log('Name ' + name);
    addData({
      timestamp: new Date(),
      // data: "this.state.text",
      data: message,
      type: 'm1sent',
    });

    let name1;
    setTimeout(() => (name1 = dev.write(message1)), 3000);

    console.log('Name1 ' + name1);

    addData({
      timestamp: new Date(),
      data: message1,
      type: 'm2sent',
    });
    addData({
      timestamp: new Date(),
      data: `Byte array: `,
      type: 'sent',
    });

  } catch (error) {
    console.log(error);
  }
};

  const addData = async message => {
    setData([message, ...data]);
  };

  check = async () => {
    console.log('check called');
    try {
      let address = '98:D3:31:F7:63:2C';
      let device = await RNBluetoothClassic.getConnectedDevice(address);
      if (device) {
        setDevice(device)
        sendData(device);
        initializeRead();
        console.log("hi");
      }
      // this.setState({device});
      console.log('check called aftert');
      console.log(device);
    } catch (err) {
      // Error if Bluetooth
       console.log(err);
      // Or there are any issues requesting paired devices
    }
  };

  const performRead = async () => {
    try {
      console.log('Polling for available messages');

      let available = await device.available();
      // console.log(`There is data available [${available}], attempting read`);
      // let data_r = '';

      if (available > 0) {
        for (let i = 0; i < available; i++) {
          // console.log(`reading ${i}th time`);
          let data = await device.read();
          // data_r.concat(data);
          // console.log(`Read data ${data}`);
          // console.log(data);

          onReceivedData({data});
        }
        // console.log(data_r);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onReceivedData = async event => {
    let data = event.data;
    console.log(data);
    let count = 0; 
    console.log(data.length);
    
// console.log(data !== 'ENROLLED');
     while (data.length === 4) {
       console.log('while loop');
       if (count === 0) {
         setTimeout(() => (name1 = device.write('ENROLL ' + (enroll))), 1000);
         count++;
       }
       break;
     }
    if (data.length === 9) {
console.log("Data uploaded");
      let data = {
        studentID,
        studentName,
        studentEmail,
        studentPhone,
        yearID,
        programID,
        sfingerprintID: Number(enroll),
      };

      console.log(data);
      axios
        .post(`${URL}/student`, data)
        .then(function (response) {
          setEnroll(enroll + 1)
          alert(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // console.log(isNaN(event.data));
    // if (isNaN(data) === false) {
    //   setId(data);

    //   var self = this;
    //   axios
    //     .get(`${URL}/lecturer/fingerprint/${data}`)
    //     .then(function (response) {
    //       // this.changeData(response)
    //       // handle success
    //       let data = response.data;
    //       if (typeof data === 'object') {
    //         console.log('Login');
    //       }
    //       // console.log(typeof data);
    //       console.log(data);
    //       let count = 0;
    //       while (data === 'No FingerprintID found') {
    //         console.log('while loop');
    //         if (count === 0) {
    //           setTimeout(() => (name1 = device.write('MATCH')), 1000);
    //           count++;
    //         }
    //         break;
    //       }

    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     });

    // }
    
    event.timestamp = new Date();
    addData({
      ...event,
      timestamp: new Date(),
      type: 'receive',
    });
  };

  initializeRead = () => {
    // disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() =>
    //   this.disconnect(true),
    // );
    // sendData()
    if (polling) {
      setPolling(false);
      console.log('read interval call');
      performRead();
    } else {
      console.log('read subscription call');
      readSubscription = device.onDataReceived(data => onReceivedData(data));
    }
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
 check();
    // let data = {studentID, studentName, studentEmail, studentPhone, yearID, programID, sfingerprintID:4};

    // console.log(data);
    // axios
    //   .post(`${URL}/student`, data)
    //   .then(function (response) {
    //     alert(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
              Register Student
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
