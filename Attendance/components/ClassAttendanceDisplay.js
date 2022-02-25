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
import {URL} from '../url/Url';
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
      message: [],
      id: undefined,
    };
  }

  componentDidMount() {
    let num = 2;
    let courseID = 101;
    let num1 = 3;
    // this.handleList(num, courseID)
    // this.handleList(num1, courseID);
    // this.setTimeout(check(), 3000);
      let courseid = Number(this.props.route.params.selectCourses.id);
      let date = this.props.route.params.date;
      alert(courseid);
      console.log(date);
      this.handleList(date, 103);
  }

  handleList = (date, courseID) => {
    var self = this;
    axios
      .get(`${URL}/attendance/class/${date}/${courseID}`)
      .then(function (response) {
        // this.changeData(response)
        // handle success
        console.log(response.data);
        self.setState({attendance: [...self.state.attendance, response.data]});
        console.log(self.state.attendance);
        // console.log(self.state.attendance);
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
    alert(item.key);
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
          {/* <Text>Taking Attendance Now</Text> */}

          {this.state.finish ? (
            <FlatList
              nestedScrollEnabled
              style={{marginBottom: 50}}
              data={this.state.attendance[0]}
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
                        {item.name}
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
                        {this.state.param.selectCourses.item}
                      </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          width: '40%',
                          fontSize: 11,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        {this.state.param.selectProgram.item}
                      </Text>
                      <Text
                        style={{
                          width: '15%',
                          fontSize: 11,
                          fontWeight: 'bold',
                          color: `${item.attended == "Yes"?"green":"red"}`,
                                  }}>{ item.attended}</Text>
                      <Text
                        style={{
                          width: '40%',
                          fontSize: 11,
                          fontWeight: 'bold',
                          color: 'black',
                          marginLeft: 35,
                        }}
                        onPress={this.getListViewItem.bind(this, item)}>
                        {this.state.param.date}
                        <Text
                          style={{
                            fontSize: 11,
                            color: 'rgba(255, 215, 0, 255)',
                            fontWeight: 'bold',
                          }}>
                          {item.time?" " + item.time:""}
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
                {/* Error fetching data... Check your network connection! */}
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
