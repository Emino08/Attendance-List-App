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
  ActivityIndicator
} from 'react-native';
import {URL} from '../url/Url';

import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

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
      param:props.route.params
    };
  }

  // state = {
  //   // isOnDefaultToggleSwitch: true,
  //   // isOnLargeToggleSwitch: false,
  //   // isOnBlueToggleSwitch: false,
  //   //   choosenIndex: 0,

  // };
  // ALTER TABLE attendance
  // ADD FOREIGN KEY (attendance.studentID) REFERENCES student.studentID
  //   changeData = (response) => {
  //   this.setState({data: response.data});
  // }

  
  
  handleChange = event => {
    const {eventCount, target, text} = event.nativeEvent;
    this.setState({ text });
    
    // console.log(this.state.param);
    
    this.setState({isLoading: true});
    var self = this;
    axios
      .get(`${URL}/student/${text}`)
      .then(function (response) {
        // this.changeData(response)
        // handle success
        console.log(response.data);
        // console.log(text);
        self.setState({data: response.data});
        self.setState({isLoading: false});
        console.log(response.data[0].length);
        console.log(response.data[1]);

        if (response.data[0].length > 0) {
          self.setState({data1: response.data[0][0]});
          self.setState({finish: true});
        }
        // let obj = {
        //   ...self.state.data[0][0]
        // }

        // console.log(obj.studentName);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        self.setState({isLoading: false});
        self.setState({error});
      })
      .then(function () {
        // always executed
      });
  };

  // onToggle(isOn) {
  //   console.log('Changed to ' + isOn);
  // }
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
    //   if (this.state.isLoading) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //       <ActivityIndicator size="large" color="#5500dc" />
    //     </View>
    //   );
    // }

    if (this.state.error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18}}>
            Error fetching data... Check your network connection!
          </Text>
        </View>
      );
    }

    let datalist = [
      {key: 'Module Name', name: 'Android'},
      {key: 'iOS', name: 'iOS'},
      {key: 'Java', name: 'Java'},
      {key: 'Swift ', name: 'Swift'},
      {key: 'Php', name: 'Php'},
      {key: 'Hadoop', name: 'Hadoop'},
      {key: 'Sap', name: 'Sap'},
      {key: 'Python', name: 'Python'},
      {key: 'Ajax', name: 'Ajax'},
      {key: 'C++', name: 'C++'},
      {key: 'Ruby', name: 'Ruby'},
      {key: 'Rails', name: 'Rails'},
      {key: '.Net', name: 'Rails'},
      {key: 'Perl', name: 'Perl'},
      {key: 'Sap1', name: 'Sap'},
      {key: 'Python1', name: 'Python'},
      {key: 'Ajax1', name: 'Ajax'},
      {key: 'C++1', name: 'C++'},
      {key: 'Ruby1', name: 'Ruby'},
      {key: 'Rails1', name: 'Rails'},
      {key: '.Net1', name: 'Net'},
      {key: 'Perl1', name: 'Perl'},
    ];

    // let obj = {
    //   ...this.state.data[0][0]
    // };

    return (
      // <ScrollView>
      <View style={{backgroundColor: 'rgba(2, 62, 196, 1)', height:'100%'}}>
        <View style={styles.container}>
          <View
            style={{
              borderRadius: 15,
              borderWidth: 2,
              overflow: 'hidden',
              height: 55,
              padding: 0,
              borderColor: 'rgba(255, 215, 0, 255)',
              width: '90%',
              marginTop: 15,
              marginLeft: '5%',
              marginBottom: 15,
            }}>
            <TextInput
              // onChangeText={text => this.setState({text})}
              onChange={this.handleChange}
              maxLength={5}
              keyboardType="phone-pad"
              style={{fontSize: 20, backgroundColor: 'white', color: 'black'}}
              placeholder="Search for student using Reg. no"></TextInput>
          </View>

          {this.state.finish ? (
            <FlatList
              nestedScrollEnabled
              style={{marginBottom: 50}}
              data={this.state.data[1]}
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
                        {this.state.data1.studentName}
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
                        {item.courseID}
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
                        {this.state.data1.programID}
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
                          12:22 AM
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
    }
});

