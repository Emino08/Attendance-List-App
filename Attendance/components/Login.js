import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  NetInfo,
  PermissionsAndroid
} from 'react-native';
import Loader from './Loader';
import axios from 'axios';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { log } from 'react-native-reanimated';
import {URL} from '../url/Url'

export default ({navigation}) => {
  const [userName, setuserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  // Bluetooth area
  const [device, setDevice] = useState(undefined);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [bondedDevice, setBondedDevice] = useState([]);
  const [accepting, setAccepting] = useState(false);
  const [discovery, setDiscovery] = useState(false);
  const [data, setData] = useState([]);
  const [connection, setConnection] = useState(false);
  const [polling, setPolling] = useState(true);
  const [cDevice, setCDevice] = useState(undefined);
  const [Id, setId] = useState("")

  /**
   * Sets the current device to the application state.  This is super basic
   * and should be updated to allow for things like:
   * - multiple devices
   * - more advanced state management (redux)
   * - etc
   *
   * @param device the BluetoothDevice selected or connected
   */
  useEffect(() => {
    console.log(
      'App::componentDidMount adding listeners: onBluetoothEnabled and onBluetoothDistabled',
    );
    console.log(
      'App::componentDidMount alternatively could use onStateChanged',
    );
    enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(event =>
      onStateChanged(event),
    );
    disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(event =>
      onStateChanged(event),
    );

    // Will turn bluetooth on if not already switch on
    checkBluetootEnabled();

    // getBondedDevices()
    // setTimeout(() => connect(), 0);

    // returned function will be called on component unmount
    return () => {
      console.log(
        'App:componentWillUnmount removing subscriptions: enabled and distabled',
      );
      console.log(
        'App:componentWillUnmount alternatively could have used stateChanged',
      );
      enabledSubscription.remove();
      disabledSubscription.remove();
    };
  }, []);

  const checkBluetootEnabled = async () => {
    try {
      console.log('App::componentDidMount Checking bluetooth status');
      let enabled = await RNBluetoothClassic.isBluetoothEnabled();

      console.log(`App::componentDidMount Status: ${enabled}`);
      setBluetoothEnabled(enabled);

      if (enabled) {
        getBondedDevices()
      }
      if (!enabled) {
        try {
          let status = RNBluetoothClassic.requestBluetoothEnabled();
          
          if (status) {
            console.log("reach heare");
            setTimeout(() => getBondedDevices(), 7000);
            
          }
        } catch (error) {
          // Toast.show({
          //   text: `Error occurred while enabling bluetooth: ${error.message}`,
          //   duration: 200,
          // });

          alert(`Error occured while enabling bluetooth: ${error.message}`);
        }

      }
    } catch (error) {
      console.log('App::componentDidMount Status Error: ', error);
      setBluetoothEnabled(false);
    }
  };

  const selectDevice = cdevice => {
    console.log('App::selectDevice() called with: ', cdevice);
    setCDevice(cdevice);
  };

  /**
   * Handle state change events.
   *
   * @param stateChangedEvent event sent from Native side during state change
   */
  onStateChanged = stateChangedEvent => {
    console.log(
      'App::onStateChanged event used for onBluetoothEnabled and onBluetoothDisabled',
    );

    // this.setState({
    //   bluetoothEnabled: stateChangedEvent.enabled,
    //   device: ,
    // });
    setBluetoothEnabled(stateChangedEvent.enabled);
    setDevice(stateChangedEvent.enabled ? device : undefined);
  };

  handleOnPress = () => {
    navigation.navigate('ForgetPassword');
  };

  const connect = async (speaker) => {
    // console.log('Connect called');
    // // let speaker = { "address": "33:6E:31:29:66:DC", "name": "MQ SPEAKER" }
    // let speaker = {address: '98:D3:31:F7:63:2C', name: 'HC05'};
    // console.log(speaker.address);
    try {
      let conn = await speaker.isConnected();
      console.log(conn);
      // console.log("Connected to " + JSON.stringify(cDevice));
      // sendData()
      if (!conn) {
        addData({
          data: `Attempting conn to ${speaker.address}`,
          timestamp: new Date(),
          type: 'error',
        });

        console.log({DELIMITER: '9'});
        conn = await speaker.connect({CONNECTION_TYPE: 'delimited'});
alert("Connected to the bluetooth")
        addData({
          data: 'conn successful',
          timestamp: new Date(),
          type: 'info',
        });
      } else {
        addData({
          data: `Connected to ${speaker.address}`,
          timestamp: new Date(),
          type: 'error',
        });
        alert("Already connected")
      }
      // let counter = 0;
      setConnection(conn);
    
      // if (connection) {
      //   if (counter === 0) {
      //     sendData();
      //     counter++
      //   }
        
      //   console.log('Data sent');
      // } else {
      //   console.log('No data sent');
      // }
      initializeRead();
      alert(conn);
      // initializeRead(); //read
    } catch (error) {
      addData({
        data: `conn failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }
  };

  // let disconnected = await cDevice.disconnect();
  // if (disconnected) {
  //   addData({
  //       data: 'Disconnected',
  //       timestamp: new Date(),
  //       type: 'info',
  //     });
  // }
      

      

      // this.setState({connection: !disconnected});
  const addData = async message => {
    setData([message, ...data]);
  };

const performRead = async() => {
    try {
      console.log('Polling for available messages');
      
      let available = await cDevice.available();
      // console.log(`There is data available [${available}], attempting read`);
      // let data_r = '';

      if (available > 0) {
        for (let i = 0; i < available; i++) {
          // console.log(`reading ${i}th time`);
          let data = await cDevice.read();
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
  }

  const onReceivedData = async (event) => {
    let data = Number(event.data);
    // console.log(data);
    // console.log(isNaN(event.data));
    if (isNaN(data) === false) {
      
      setId(data)
      
      var self = this;
      axios
        .get(`${URL}/lecturer/fingerprint/${data}`)
        .then(function (response) {
          // this.changeData(response)
          // handle success
          let data = response.data;
          if (typeof data === 'object') {
            console.log("Login");
            alert("Login")
          }
          // console.log(typeof data);
          console.log(data);
          let count = 0;
          while (data === "No FingerprintID found") {
            console.log("while loop");
            if (count === 0) {
              setTimeout(() => (name1 = cDevice.write('MATCH')), 1000);
              count++;
            }
            break;
            
          }
          // self.setState({
          //   attendance: [...self.state.attendance, response.data],
          // });
          // console.log(self.state.attendance); 
          // console.log(self.state.attendance);
          // console.log(self.state.param);
          // self.setState({finish: true});
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      
      // console.log("This is it" + data);
    }
    // console.log(Number(event.data) === 1);
    // if (Number(event.data) === 1) {
    //   console.log("End Connection");
    //   // let name = await cDevice.write("END");
    // }
    console.log(Id);
    event.timestamp = new Date();
    addData({
      ...event,
      timestamp: new Date(),
      type: 'receive',
    });
  }

  initializeRead = () => {
    // disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() =>
    //   this.disconnect(true),
    // );
// sendData()
    if (polling) {
      setPolling(false);
      console.log("read interval call");
readInterval = setInterval(() => performRead(), 1000);

    //  performRead()
      
    } else {
      console.log("read subscription call");
      readSubscription = cDevice.onDataReceived(data =>
        onReceivedData(data),
      );
    }
  }


  //Grant Permission
  const requestAccessFineLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access fine location required for discovery',
        message:
          'In order to perform discovery, you must enable/allow ' +
          'fine location access.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const sendData = async () => {
    
    try {
      console.log(`Attempting to send data ${'this.state.text'}`);
      let message = 'START';
      let message1 = 'MATCH';

      let name = await cDevice.write(message)
      

      console.log('Name ' + name);
      addData({
        timestamp: new Date(),
        // data: "this.state.text",
        data: message,
        type: 'm1sent',
      });
      // await RNBluetoothClassic.writeToDevice(cDevice, message1);
      // let isbool = true;

      // while (isbool) {
        
      // }
      let name1;
setTimeout(() => name1 = cDevice.write(message1), 3000);
      
      console.log("Name1 " + name1);

      // let m = await cDevice.write(message);
      // console.log("Message 1 " + m);
      // if (m) {
      //   let name1 = await cDevice.write(message1);
      //   console.log("Message 2 " + name1);
      // }

      addData({
        timestamp: new Date(),
        // data: "this.state.text",
        data: message1,
        type: 'm2sent',
      });
      addData({
        timestamp: new Date(),
        data: `Byte array: `,
        type: 'sent',
      });

      // this.setState({text: undefined});
    } catch (error) {
      console.log(error);
    }
  };

   const getBondedDevices = async unloading => {
     console.log('DeviceListScreen::getBondedDevices');
     try {
       let bonded = await RNBluetoothClassic.getBondedDevices();

       function add(bondedDevices, bluetoothName) {
         for (let i = 0; i < bondedDevices.length; i++) {
           const device1 = bondedDevices[i];
           if (device1.name === bluetoothName) {
             selectDevice(device1);
             return device1;
           }
         }
       }
       let bluetoothName = 'HC05';
       let details = add(bonded, bluetoothName);
       // console.log(JSON.stringify(details));
       // console.log(JSON.stringify(cDevice));
       // console.log(JSON.stringify(cDevice));
       // console.log(typeof details);

       if (!details) {
         console.log(details);
         startDiscovery()
       }

       if (!unloading) {
         setBondedDevice(bonded);
         connect(details);
       }
     } catch (error) {
       setBondedDevice([]);

       // Toast.show({
       //   text: error.message,
       //   duration: 5000,
       // });
       alert(error.message);
     }
   };

   const startDiscovery = async () => {
     try {
       let granted = await requestAccessFineLocationPermission();

       if (!granted) {
         throw new Error('Access fine location was not granted');
       }

       setDiscovery(true);

       let devices = [...bondedDevice];
       console.log(bondedDevice);

       try {
         let unpaired = await RNBluetoothClassic.startDiscovery();

         let index = devices.findIndex(d => !d.bonded);
         if (index >= 0) {
           devices.splice(index, devices.length - index, ...unpaired);
         } else {
           devices.push(...unpaired);
         }

         // Toast.show({
         //   text: `Found ${unpaired.length} unpaired devices.`,
         //   duration: 2000,
         // });

         // console.log(unpaired[1].name);
         alert(`Found ${unpaired.length} unpaired devices`);

         function add(bondedDevices, bluetoothName) {
           for (let i = 0; i < bondedDevices.length; i++) {
             const device = bondedDevices[i];
             if (device.name === bluetoothName) {
               return device;
             }
           }
         }
         let bluetoothName = 'HC05';
         let details = add(unpaired, bluetoothName);
         console.log(details);
         // let isPaired = await RNBluetoothClassic.pairDevice(details.address)
         // let connection = await [details].connect({DELIMITER: '9'});

         // console.log(connection);
         connect(details);
       } catch (error) {
         console.log(error);
       } finally {
         setDevice(devices);
         setDiscovery(false);
       }
     } catch (err) {
       alert(err.message);
     }
   };

  const handleFingerprint = () => {
    let counter = 0;
    alert('Fingerprint');
     if (connection) {
       if (counter === 0) {
         sendData();
         counter++;
       }

       console.log('Data sent');
     } else {
       console.log('No data sent');
     }
    // try {
    //   RNBluetoothClassic.requestBluetoothEnabled();
    // } catch (error) {
    //   // Toast.show({
    //   //   text: `Error occurred while enabling bluetooth: ${error.message}`,
    //   //   duration: 200,
    //   // });

    //   alert(`Error occured while enabling bluetooth: ${error.message}`);
    // }

    // Bonded Devices
    // const getBondedDevices = async unloading => {
    //   console.log('DeviceListScreen::getBondedDevices');
    //   try {
    //     let bonded = await RNBluetoothClassic.getBondedDevices();
       
    //     function add(bondedDevices, bluetoothName) {
    //       for (let i = 0; i < bondedDevices.length; i++) {
    //         const device1 = bondedDevices[i];
    //         if (device1.name === bluetoothName) {
    //           selectDevice(device1)
    //           return (device1)
    //         }
              
    //       }
    //     }
    //     let bluetoothName = 'HC05';
    //     let details = add(bonded, bluetoothName);
    //     // console.log(JSON.stringify(details));
    //     // console.log(JSON.stringify(cDevice));
    //     // console.log(JSON.stringify(cDevice));
    //     // console.log(typeof details);

        

    //     if (!unloading) {
    //       setBondedDevice(bonded);
    //       connect(details)
    //     }
    //   } catch (error) {
    //     setBondedDevice([]);

    //     // Toast.show({
    //     //   text: error.message,
    //     //   duration: 5000,
    //     // });
    //     alert(error.message);
    //   }
    // };

    // const toggleConnection = async () => {
    //   if (connection) {
    //     // disconnect();
    //     return;
    //   } else {
    //     connect();
    //   }
    // };
    // getBondedDevices()

    // const startDiscovery = async () => {
    //   try {
    //     let granted = await requestAccessFineLocationPermission();

    //     if (!granted) {
    //       throw new Error('Access fine location was not granted');
    //     }

    //     setDiscovery(true);

    //     let devices = [...bondedDevice];
    //     console.log(bondedDevice);

    //     try {
    //       let unpaired = await RNBluetoothClassic.startDiscovery();

    //       let index = devices.findIndex(d => !d.bonded);
    //       if (index >= 0) {
    //         devices.splice(index, devices.length - index, ...unpaired);
    //       } else {
    //         devices.push(...unpaired);
    //       }

    //       // Toast.show({
    //       //   text: `Found ${unpaired.length} unpaired devices.`,
    //       //   duration: 2000,
    //       // });

    //       // console.log(unpaired[1].name);
    //       alert(`Found ${unpaired.length} unpaired devices`);

    //       function add(bondedDevices, bluetoothName) {
    //         for (let i = 0; i < bondedDevices.length; i++) {
    //           const device = bondedDevices[i];
    //           if (device.name === bluetoothName) {
    //             return device
    //           }
    //         }
    //       }
    //       let bluetoothName = 'DESKTOP-1H49D03';
    //       let details = add(unpaired, bluetoothName);
    //       console.log(details);
    //       // let isPaired = await RNBluetoothClassic.pairDevice(details.address)
    //       // let connection = await [details].connect({DELIMITER: '9'});

    //       // console.log(connection);
    //       connect(details)
          
    //       } catch (error) { console.log(error); 
    //     } finally {
    //       setDevice(devices)
    //       setDiscovery(false)

    //     }
    //   } catch (err) {
    //     alert(err.message);
    //   }
    // };

    // getBondedDevices();
    // if (connection) {
    //   sendData();
    //   console.log("Data sent");
    // } else {
    //   console.log("No data sent");
    // }
    // toggleConnection();
    // startDiscovery()
  };

  const handleSubmit = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Username');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    // const baseUrl = 'https://reqres.in';
    // axios({
    //   method: 'get',
    //   url: `${baseUrl}/api/users/1`,
    // })
    //   .then(response => {
    //     alert(response.data);
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });;

    // const bodyData = {
    //   userID: 1,
    //   password: 'Cody Info',
    // };

    // request.open('POST', '172.25.176.1', true);
    // request.setRequestHeader('Content-Type', 'application/json');
    // request.setRequestHeader(
    //   'Content-Type',
    //   'application/x-www-form-urlencoded',
    // );
    // ;
    // // request.setRequestHeader(
    // //   'Authorization',
    // //   'Bearer d484c6e730cc22caf59cce6ee33c6ed1142a56f77dee4ac6b86ea8341492e408',
    // // );
    // request.send(JSON.stringify(bodyData));

    // axios
    //   .post('192.168.210.107:3000/login', {
    //     userID: 12345,
    //     password: 'ddddd',
    //   })
    //   .then(function (response) {
    //     alert(response);
    //   })
    //   .catch(function (error) {
    //     alert(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });

    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${URL}/login`);

    //  xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //  xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.withCredentials = false;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //  console.log(xhr.status);
        console.log(xhr.responseText);
        if (xhr.responseText === 'Successfully Login') {
          console.log('Yes');
          navigation.navigate('Navigation');
        }
        navigation.navigate('Navigation');
      }
    };

    setLoading(true);
    let dataToSend = {userID: userName, password: userPassword};
    // alert(dataToSend.userID + " " + dataToSend.password);
    // return;
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    let data = '{"userID": 1,"password": "Jason Sweet Me+"}';
    let dat = JSON.parse(JSON.stringify(data));

    let data1 = 'userID=ddgg&password=ddd';
    //  console.log(formBody);
    xhr.send(formBody);

    // fetch('https://reqres.in/api/login', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status === 'success') {
    //       // AsyncStorage.setItem('user_id', responseJson.data.userID);
    //       console.log(responseJson.data.userID);
    //       navigation.replace('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext(responseJson.msg);
    //       console.log('Please check your userID id or password');
    //     }
    //   })
    //   .catch(error => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };
  let style = connection ? styles.connected : styles.notConnected;
  let style1 = connection ? styles.connectedText : styles.notConnectedText;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(2, 62, 196, 1)',
      }}>
      <Text
        style={{
          fontFamily: 'Agency FB',
          fontSize: 21,
          textTransform: 'uppercase',
          color: 'rgba(255, 215, 0, 255)',
          marginTop: 35,
        }}>
        Njala University
      </Text>
      <Text
        style={{
          fontFamily: 'OCR A',
          fontSize: 30,
          textTransform: 'uppercase',
          textAlign: 'center',
          color: 'rgba(255, 215, 0, 255)',
          marginTop: 16,
        }}>
        Attendance App
      </Text>
      <View style={styles.margin1}>
        <KeyboardAvoidingView enabled>
          {/* <View style={{alignItems: 'center'}}>
            <Image
              source={require('../Images/attend.png')}
              style={{
                width: '50%',
                height: 100,
                resizeMode: 'contain',
                margin: 30,
              }}
            />
          </View> */}

          <View
            style={{
              alignItems: 'center',
            }}>
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={userName => setuserName(userName)}
                placeholder="Enter Username" //dummy@abc.com
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
                style={styles.textInput}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="white"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"></TextInput>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 16,
              letterSpacing: 0.19,
              color: 'rgba(255, 255, 255, 255)',
              marginStart: 240,
              marginTop: 18,
            }}
            onPress={handleOnPress}>
            Forget Password?
          </Text>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSubmit}
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
              LOG IN
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginStart: 2,
          marginTop: 35,
        }}>
        <View
          style={{
            marginTop: 14.5,
            backgroundColor: 'rgba(255, 215, 0, 255)',
            width: 140,
            height: 2,
          }}
        />
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 21,
            letterSpacing: 0.19,
            color: 'rgba(255, 255, 255, 255)',
            marginStart: 10.5,
          }}>
          Or
        </Text>
        <View
          style={{
            marginStart: 11.5,
            marginTop: 14.5,
            backgroundColor: 'rgba(255, 215, 0, 255)',
            width: 140,
            height: 2,
          }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleFingerprint}
        style={style}>
        <Text
          style={style1}>
          Log in with your fingerprint.
        </Text>
      </TouchableOpacity>
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
  connectedText: {
    color: 'rgba(2, 62, 196, 1)',
    fontFamily: 'Roboto',
    fontSize: 18,
    letterSpacing: 0.19,
  },
  notConnectedText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    letterSpacing: 0.19,
    color: 'rgba(255, 255, 255, 255)',
  },
  connected: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingStart: 19,
    paddingTop: 18,
    width: 328,
    height: 60,
    borderWidth: 2,
    // borderColor: 'rgba(255, 215, 0, 255)',
    backgroundColor: 'rgba(255, 215, 0, 255)',
    marginTop: 30,
    borderRadius: 10,
  },
  notConnected: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingStart: 19,
    paddingTop: 18,
    width: 328,
    height: 60,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 255)',
    marginTop: 30,
    borderRadius: 10,
    // marginBottom:60
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


