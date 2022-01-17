import React, {Component} from 'react';
import {
  //   AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import { URL } from '../url/Url';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
  
export default class FlatListBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [],
      isLoading: false,
      error: null,
      finish: false,
      data1: null,
      param: props.route.params,
      attendance: [],
      connection: false,
      polling: true,
      cDevice: undefined,
      message:[],
      id:undefined
    };
  }


  componentDidMount(){
   let num = 2;
    let courseID = 101
    let num1 = 3;
    // this.handleList(num, courseID)
    // this.handleList(num1, courseID);
    this.check();
    // this.setTimeout(check(), 3000);
}

  handleList = (attend, course) => {
    var self = this;
    axios
      .get(`${URL}/attendance/${attend}/${course}`)
      .then(function (response) {
        // this.changeData(response)
        // handle success
        console.log(response.data);
        self.setState({attendance: [...self.state.attendance, response.data]});
        console.log(self.state.attendance);
        console.log(self.state.attendance);
        console.log(self.state.param);
        self.setState({finish: true});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  } 

  check = async () => {
    console.log("check called");
  try {
    let address = "98:D3:31:F7:63:2C"
    let device = await RNBluetoothClassic.getConnectedDevice(address);
    if (device) {
      this.sendData(device)
      this.initializeRead();
      this.setState({ cDevice: device })
    }
    // this.setState({device});
    // console.log('check called aftert');
    // console.log(device);
} catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting paired devices
} 
}

  connect = async (speaker) => {
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
        this.addData({
          data: `Attempting conn to ${speaker.address}`,
          timestamp: new Date(),
          type: 'error',
        });

        console.log({DELIMITER: '9'});
        conn = await speaker.connect({CONNECTION_TYPE: 'delimited'});
alert("Connected to the bluetooth")
        this.addData({
          data: 'conn successful',
          timestamp: new Date(),
          type: 'info',
        });
      } else {
        this.addData({
          data: `Connected to ${speaker.address}`,
          timestamp: new Date(),
          type: 'error',
        });
        alert("Already connected")
      }
this.setState({connection:conn})
      // setConnection(conn);
      if (this.state.connection) {
        this.sendData(this.state.cDevice);
        this.initializeRead();
        console.log('Data sent');
      } else {
        console.log('No data sent');
      }
      
      alert(conn);
      // initializeRead(); //read
    } catch (error) {
      this.addData({
        data: `conn failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }
  };

  addData = async message => {
    this.setState({message:[message, ...this.state.message]})
    // setData([message, ...data]);
  };

  performRead = async() => {
    try {
      console.log('Polling for available messages');
      
      let available = await this.state.cDevice.available();
      // console.log(`There is data available [${available}], attempting read`);
      // let data_r = '';

      if (available > 0) {
        for (let i = 0; i < available; i++) {
          // console.log(`reading ${i}th time`);
          let data = await this.state.cDevice.read();
          // data_r.concat(data);
          // console.log(`Read data ${data}`);
          // console.log(data);

          this.onReceivedData({data});
        }
        // console.log(data_r);
      }
    } catch (err) {
      console.log(err);
    }
  }

  onReceivedData = async (event) => {
    let data = Number(event.data)
    console.log(event.data);
    // console.log(Number(event.data) === 1);
    // console.log(Number(data));
    if (isNaN(data) === false) {
      this.setState({ id: data })
      console.log(this.state.id);
      let courseID = 101;
      this.handleList(data, courseID);
    }
      // if (Number(event.data) === 1) {
      //   console.log('End Connection');
      //   // let name = await this.state.cDevice.write("END");
      // }
    event.timestamp = new Date();
    this.addData({
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
    if (this.state.polling) {
      this.setState({polling: false});
      console.log("read interval call");
      this.readInterval = setInterval(() => this.performRead(), 5000);
    } else {
      console.log("read subscription call");
      this.readSubscription = this.state.cDevice.onDataReceived(data =>
        this.onReceivedData(data),
      );
    }
  }

  sendData = async (dev) => {
    try {
      console.log(`Attempting to send data ${'this.state.text'}`);
      let message = 'START';
      let message1 = 'ATTENDANCE';

      let name = await dev.write(message)
      

      console.log('Name ' + name);
      this.addData({
        timestamp: new Date(),
        // data: "this.state.text",
        data: message,
        type: 'm1sent',
      });
      // await RNBluetoothClassic.writeToDevice(dev, message1);
      let name1;
setInterval(() => name1 = dev.write(message1), 3000);
      
//       console.log("Name1 " + name1);

      // let m = await dev.write(message);
      // console.log("Message 1 " + m);
      // if (m) {
      //   let name1 = await dev.write(message1);
      //   console.log("Message 2 " + name1);
      // }

      this.addData({
        timestamp: new Date(),
        // data: "this.state.text",
        data: message1,
        type: 'm2sent',
      });
      this.addData({
        timestamp: new Date(),
        data: `Byte array: `,
        type: 'sent',
      });

      // this.setState({text: undefined});
    } catch (error) {
      console.log(error);
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 20,
          width: '100%',
          backgroundColor: 'rgba(2, 62, 196, 1)',
        }}
      />
    );
  };
  //handling onPress action
  getListViewItem = item => {
    Alert.alert(item.key);
  };

  render() {

    if (this.state.error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18}}>
            Error fetching data... Check your network connection!
          </Text>
        </View>
      );
    }

    return (
      // <ScrollView>

      <View style={{backgroundColor: 'rgba(2, 62, 196, 1)', height: '100%'}}>
        <View style={styles.container}>

          <Text>Taking Attendance Now</Text>

          {this.state.finish ? (
            <FlatList
              nestedScrollEnabled
              style={{marginBottom: 50}}
              data={this.state.attendance}
              renderItem={({item}) => (
                <View
                  style={{
                    flex: 1,
                    // justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={styles.item}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          width: '50%',
                          fontSize: 12,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        {item.sName}
                      </Text>
                      <Text
                        style={{
                          width: '50%',
                          fontSize: 11,
                          fontWeight: 'bold',
                          color: 'black',
                          marginLeft: 50,
                        }}
                        onPress={this.getListViewItem.bind(this, item)}>
                        {this.state.param.cSelected.item}
                      </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          width: '50%',
                          fontSize: 11,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        {this.state.param.pSelected.item}
                      </Text>
                      <Text
                        style={{
                          width: '50%',
                          fontSize: 11,
                          fontWeight: 'bold',
                          color: 'black',
                          marginLeft: 35,
                        }}
                        onPress={this.getListViewItem.bind(this, item)}>
                        {item.date}
                        <Text
                          style={{
                            fontSize: 11,
                            color: 'rgba(255, 215, 0, 255)',
                            fontWeight: 'bold',
                          }}>
                          {item.time}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={this.renderSeparator}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18}}>
                Error fetching data... Check your network connection!
              </Text>
            </View>
          )}
        </View>
      </View>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(2, 62, 196, 1)',
  },
  item: {
    padding: 10,
    height: 80,
    width: '90%',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(255, 215, 0, 255)',
  },
  pickerStyle: {
    height: 15,
    width: '100%',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 6,
  },
});

