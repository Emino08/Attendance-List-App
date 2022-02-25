import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import ToggleSwitch from 'toggle-switch-react-native';

export default class Attendance extends Component {
  state = {
    isOnDefaultToggleSwitch: true,
    isOnLargeToggleSwitch: false,
    isOnBlueToggleSwitch: false,
    choosenIndex: 0,
  };

  onToggle(isOn) {
    console.log('Changed to ' + isOn);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Select Semester</Text>
        <View
          style={{
            borderRadius: 15,
            borderWidth: 2,
            overflow: 'hidden',
            height: 55,
            padding: 0,
            borderColor: 'rgba(255, 215, 0, 255)',
            width: '80%',
            marginTop: 12,
          }}>
          <Picker
            dropdownIconRippleColor="blue"
            style={styles.pickerStyle}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemPosition) =>
              this.setState({language: itemValue, choosenIndex: itemPosition})
            }>
            <Picker.Item label="Select Semester" value="Select Semester" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="React Native" value="rn" />
          </Picker>
        </View>

        <Text style={styles.textStyle}>Year 1</Text>
        <View
          style={{
            borderRadius: 15,
            borderWidth: 2,
            overflow: 'hidden',
            height: 55,
            padding: 0,
            borderColor: 'rgba(255, 215, 0, 255)',
            width: '80%',
            marginTop: 12,
          }}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemPosition) =>
              this.setState({language: itemValue, choosenIndex: itemPosition})
            }>
            <Picker.Item label="Introduction to Programming" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="React Native" value="rn" />
          </Picker>
        </View>

        <Text style={styles.textStyle}>Year 2</Text>
        <View
          style={{
            borderRadius: 15,
            borderWidth: 2,
            overflow: 'hidden',
            height: 55,
            padding: 0,
            borderColor: 'rgba(255, 215, 0, 255)',
            width: '80%',
            marginTop: 12,
          }}>
          <Picker
            dropdownIconRippleColor="blue"
            style={styles.pickerStyle}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemPosition) =>
              this.setState({language: itemValue, choosenIndex: itemPosition})
            }>
            <Picker.Item label="C++" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="React Native" value="rn" />
          </Picker>
        </View>

        <Text style={styles.textStyle}>Year 3</Text>
        <View
          style={{
            borderRadius: 15,
            borderWidth: 2,
            overflow: 'hidden',
            height: 55,
            padding: 0,
            borderColor: 'rgba(255, 215, 0, 255)',
            width: '80%',
            marginTop: 12,
          }}>
          <Picker
            dropdownIconRippleColor="blue"
            style={styles.pickerStyle}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemPosition) =>
              this.setState({language: itemValue, choosenIndex: itemPosition})
            }>
            <Picker.Item label="EED" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="React Native" value="rn" />
          </Picker>
        </View>

        <Text style={styles.textStyle}>Year 4</Text>
        <View
          style={{
            borderRadius: 15,
            borderWidth: 2,
            overflow: 'hidden',
            height: 55,
            padding: 0,
            borderColor: 'rgba(255, 215, 0, 255)',
            width: '80%',
            marginTop: 12,
          }}>
          <Picker
            dropdownIconRippleColor="blue"
            style={styles.pickerStyle}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemPosition) =>
              this.setState({language: itemValue, choosenIndex: itemPosition})
            }>
            <Picker.Item label="Web Fundamentals" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="React Native" value="rn" />
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 62, 196, 1)',
  },

  instructions: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 5,
    backgroundColor: 'green',
  },

  textStyle: {
    fontSize: 20,
    // fontWeight: 'bold',

    alignSelf: 'flex-start',
    color: 'white',
    marginTop: 40,
    marginLeft: 40,
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
