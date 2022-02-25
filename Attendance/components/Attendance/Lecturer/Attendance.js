// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import axios from 'axios';
// import ToggleSwitch from 'toggle-switch-react-native';


// export default class Attendance extends Component {
//   componentDidMount() {
//     // setTimeout(() => {
//     //   this.setState({favoritecolor: 'yellow'});
//     // }, 1000);

//     axios
//       .get('http://172.25.176.1:3000/courses/10')
//       .then(function (response) {
//         // handle success
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .then(function () {
//         // always executed
//       });

//     axios
//       .get('http://172.25.176.1:3000/program/10')
//       .then(function (response) {
//         // handle success
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .then(function () {
//         // always executed
//       });
//   }
//   state = {
//     isOnDefaultToggleSwitch: true,
//     isOnLargeToggleSwitch: false,
//     isOnBlueToggleSwitch: false,
//     choosenIndex: 0,
//     index: 0,
//     programs: [],
//     modules: [],
//   };

//   onToggle(isOn) {
//     console.log('Changed to ' + isOn);
//   }

//   handleProgram = (itemValue, itemPosition)

//   // handleAttendance = () => {
//   //   navigation.navigate('Attendance1');
//   // };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={{alignSelf: 'flex-start', marginLeft: 30, marginTop: 100}}>
//           <ToggleSwitch
//             offColor="black"
//             label="Connect   fingerprint"
//             onColor="rgba(255, 215, 0, 255)"
//             labelStyle={{color: 'white', fontSize: 20}}
//             trackOnStyle={{color: 'rgba(2, 62, 196, 1)'}}
//             trackOffStyle={{color: 'rgba(2, 62, 196, 1)'}}
//             trackOnStyle={{color: 'rgba(2, 62, 196, 1)'}}
//             isOn={this.state.isOnBlueToggleSwitch}
//             onToggle={isOnBlueToggleSwitch => {
//               this.setState({isOnBlueToggleSwitch});
//               this.onToggle(isOnBlueToggleSwitch);
//             }}
//           />
//         </View>

//         <Text style={styles.textStyle}>Select Porgrams</Text>
//         <View
//           style={{
//             borderRadius: 15,
//             borderWidth: 2,
//             overflow: 'hidden',
//             height: 55,
//             padding: 0,
//             borderColor: 'rgba(255, 215, 0, 255)',
//             width: '80%',
//             marginTop: 15,
//           }}>
//           <Picker
//             style={styles.pickerStyle}
//             selectedValue={this.state.language}
//             onValueChange={(itemValue, itemPosition) => {
//               console.log(itemValue);
//               this.setState({language: itemValue, index: itemPosition});
//             }}>
//             <Picker.Item label="BSc Computer Science" value="1" />
//             <Picker.Item label="BSc BIT" value="2" />
//             <Picker.Item label="BSc Energy Studies" value="3" />
//             <Picker.Item label="BSc Elec & TeleCom" value="4" />
//             <Picker.Item label="BSc Physics with Comp" value="5" />
//             <Picker.Item label="HD Computer Science" value="6" />
//           </Picker>
//         </View>

//         <Text style={styles.textStyle}>Select Year</Text>
//         <View
//           style={{
//             borderRadius: 15,
//             borderWidth: 2,
//             overflow: 'hidden',
//             height: 55,
//             padding: 0,
//             borderColor: 'rgba(255, 215, 0, 255)',
//             width: '80%',
//             marginTop: 15,
//           }}>
//           <Picker
//             dropdownIconRippleColor="blue"
//             style={styles.pickerStyle}
//             selectedValue={this.state.language}
//             onValueChange={(itemValue, itemPosition) =>
//               this.setState({language: itemValue, choosenIndex: itemPosition})
//             }>
//             <Picker.Item label="1" value="1" />
//             <Picker.Item label="2" value="2" />
//             <Picker.Item label="3" value="3" />
//             <Picker.Item label="4" value="4" />
//           </Picker>
//         </View>

//         <Text style={styles.textStyle}>Module</Text>
//         <View
//           style={{
//             borderRadius: 15,
//             borderWidth: 2,
//             overflow: 'hidden',
//             height: 55,
//             padding: 0,
//             borderColor: 'rgba(255, 215, 0, 255)',
//             width: '80%',
//             marginTop: 15,
//           }}>
//           <Picker
//             dropdownIconRippleColor="blue"
//             style={styles.pickerStyle}
//             selectedValue={this.state.language}
//             onValueChange={(itemValue, itemPosition) =>
//               this.setState({language: itemValue, choosenIndex: itemPosition})
//             }>
//             <Picker.Item label="Java" value="java" />
//             <Picker.Item label="JavaScript" value="js" />
//             <Picker.Item label="React Native" value="rn" />
//           </Picker>
//         </View>

//         <TouchableHighlight
//           onPress={handleAttendance1}
//           style={{
//             height: 40,
//             width: '80%',
//             borderRadius: 10,
//             backgroundColor: 'rgba(255, 215, 0, 255)',
//             marginLeft: 50,
//             marginRight: 50,
//             marginTop: 30,
//           }}>
//           <Text
//             style={{
//               color: 'rgba(2, 62, 196, 1)',
//               textAlign: 'center',
//               paddingTop: 4,
//               fontSize: 25,
//               fontFamily: 'OCR A',
//             }}>
//             TAKE ATTENDANCE
//           </Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(2, 62, 196, 1)',
//   },

//   instructions: {
//     textAlign: 'center',
//     color: 'blue',
//     marginBottom: 5,
//     backgroundColor: 'green',
//   },

//   textStyle: {
//     fontSize: 20,
//     // fontWeight: 'bold',
    
//     alignSelf:'flex-start',
//     color: 'white',
//     marginTop: 40,
//     marginLeft: 40
//   },
//   pickerStyle: {
//     height: 15,
//     width: '100%',
//     justifyContent: 'center',
//     color: 'black',
//     backgroundColor: 'white',
//     borderWidth: 6,
    
//   },
// });

import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import ToggleSwitch from 'toggle-switch-react-native';
import axios from 'axios';
import { URL } from '../../../url/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Options data must contain 'item' & 'id' keys

const PROGRAMS = [
  {
    item: 'BSc Computer Science',
    id: '100',
  },
  {
    item: 'BSc BIT',
    id: '300',
  },
  {
    item: 'BSc Energy Studies',
    id: '400',
  },
  {
    item: 'BSc Elec & TeleCom',
    id: '500',
  },
  
  {
    item: 'Physics',
    id: '200',
  },
];

const YEAR = [
  {
    item: 'YEAR ONE',
    id: '1',
  },
  {
    item: 'YEAR TWO',
    id: '2',
  },
  {
    item: 'YEAR THREE',
    id: '3',
  },
  {
    item: 'YEAR FOUR',
    id: '4',
  },
]

const COURSES = [
  {
    item: 'Physics',
    id: '1',
  },
  {
    item: 'Mathematics',
    id: '2',
  },
  {
    item: 'Computer Applicaiton',
    id: '3',
  },
  {
    item: 'VB',
    id: '4',
  },
];

// onChangeYear = val => {
//   setSelectYear(val);
// };


function App({navigation}) {
  // useState(() => {
  //   axios
  //     .get('http://172.25.176.1:3000/lecturer/courses/32')
  //     .then(function (response) {
  //       // handle success
  //       // console.log(response.data[0]);
  //       setSelectCourses(response.data[0]);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .then(function () {
  //       // always executed
  //     });
  // });
  //isOnDefaultToggleSwitch: true,
  //     isOnLargeToggleSwitch: false,
  //     isOnBlueToggleSwitch: false,

  const [isOnDefaultToggleSwitch, setIsOnDefaultToggleSwitch] = useState(true);
  const [isOnLargeToggleSwitch, setIsOnLargeToggleSwitch] = useState(false);
  const [isOnBlueToggleSwitch, setIsOnBlueToggleSwitch] = useState(false);
  const [selectProgram, setSelectProgram] = useState({});
  const [selectYear, setSelectYear] = useState({});
  const [selectCourses, setSelectCourses] = useState({});
  const [selectRename, setSelectRename] = useState(false);
  const [selectNewCourse, setSelectNewcourse] = useState();
  const [value, setValue] = useState('');
  const [data1, setData] = useState({})
  
  var NewCourses = [];

  useEffect(() => {
    getData('username');
  }, []);

  handleAttendance1 = () => {
    // alert(Object.keys(selectCourses).length === 0);

    // console.log('it me' + JSON.stringify(selectCourses));
    // console.log("it meP" + JSON.stringify(selectProgram));
    // alert(selectCourses);
    if (!isOnBlueToggleSwitch) {
      alert('Please change to true');
      return;
    }
    if (Object.keys(selectProgram).length === 0) {
      alert('Please choose Program');
      return;
    }
    if (Object.keys(selectYear).length === 0) {
      alert('Please choose Year');
      return;
    }

    if (Object.keys(selectCourses).length === 0) {
      alert('Please choose Course');
      return;
    }
    navigation.navigate('Attendance1', {
      toggleState: isOnBlueToggleSwitch,
      pSelected: selectProgram,
      ySelected: selectYear,
      cSelected: selectCourses,
    });

    setIsOnBlueToggleSwitch(false);
    setSelectProgram({});
    setSelectYear({});
    setSelectCourses({});
    setData({});
  };

  const getData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setValue(value);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  onChangeProgram = (val) => {
    setSelectProgram(val);
  };

 onChangeCourses = (val) => {
   setSelectCourses(val);
  //  console.log(NewCourses);
  //  console.log(NewCourses);
  //  if (NewCourses.length < 1) {
  //    alert('No course is available for the lecturer');
  //    return;
  //  }
  }

  onChangeYear = (val) => {
    setSelectYear(val);
    setSelectCourses({})
    setSelectNewcourse()
    // console.log("it me" + JSON.stringify(selectCourses));

    if (Object.keys(selectProgram).length === 0) {
      alert('Please choose Program');
      return;
    }else{ axios
      .get(
        `${URL}/lecturer/courses/${value}/${val.id}/${selectProgram.id}`,
      )
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
        let data = response.data;

        if (data === "No Match") {
          alert("No course found")
          setSelectCourses({})
          setData({})
          return
        }
        for (let i = 0; i < data.length; i++) {
          const renamedObj = renameKeys(data[i], newKeys);

          NewCourses.push(renamedObj);
          // console.log(renamedObj);
          console.log(COURSES);
          console.log(NewCourses);
          // console.log(JSON.stringify);
        }
       
          setSelectNewcourse(NewCourses);
        setData(data);
        console.log(Object.keys(data1).length);
        
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });}

   
  };

  
 
  
  
  function doRename() {
    // if (selectCourses.length > 0) {
    // setSelectRename(true)
    const newKeys = { courseName: 'item', courseID: 'id' };
    console.log(selectCourses.length);
    for (let i = 0; i < selectCourses.length; i++) {
      
      const renamedObj = renameKeys(selectCourses[i], newKeys);
      
      NewCourses.push(renamedObj)
      // console.log(renamedObj);
      console.log(NewCourses);
    }
  
  }

  // console.log(isOnBlueToggleSwitch);
  // setSelectNewcourse(NewCourses)
  // console.log(selectNewCourse + " New");
  //   console.log('New courses ' + NewCourses.length);
  //   setSelectRename(false)

  
  
  // console.log(selectCourses);
  // onChangeCourses = val => {
  //   setSelectCourses(val);
  // };

  return (
    <View style={{backgroundColor: 'rgba(2, 62, 196, 1)', height: '100%'}}>
      <View>
        <View style={{alignSelf: 'flex-start', marginLeft: 30, marginTop: 100}}>
          <ToggleSwitch
            offColor="black"
            label="Connect   fingerprint"
            onColor="rgba(255, 215, 0, 255)"
            labelStyle={{color: 'white', fontSize: 20}}
            trackOnStyle={{color: 'rgba(2, 62, 196, 1)'}}
            trackOffStyle={{color: 'rgba(2, 62, 196, 1)'}}
            trackOnStyle={{color: 'rgba(2, 62, 196, 1)'}}
            isOn={isOnBlueToggleSwitch}
            onToggle={isOnBlueToggleSwitch => {
              setIsOnBlueToggleSwitch(isOnBlueToggleSwitch);
              // this.onToggle(isOnBlueToggleSwitch);
            }}
          />
        </View>
      </View>

      <View style={{margin: 30}}>
        <SelectBox
          label="Select programs"
          options={PROGRAMS}
          value={selectProgram}
          onChange={onChangeProgram}
          hideInputFilter={true}
          optionStyle={{
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: 'white',
          }}
          labelStyle={{color: 'white', fontWeight: 'bold', fontSize: 18}}
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
        />
      </View>

      <View style={{margin: 30}}>
        <SelectBox
          label="Select year"
          options={YEAR}
          value={selectYear}
          onChange={onChangeYear}
          hideInputFilter={true}
          optionStyle={{
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: 'white',
          }}
          labelStyle={{color: 'white', fontWeight: 'bold', fontSize: 18}}
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
        />
      </View>

      {(Object.keys(data1).length) > 0 ? (
        <View style={{margin: 30}}>
          <SelectBox
            label="Select courses"
            options={selectNewCourse}
            value={selectCourses}
            onChange={onChangeCourses}
            hideInputFilter={true}
            optionStyle={{
              color: 'black',
              fontWeight: 'bold',
              backgroundColor: 'white',
            }}
            labelStyle={{color: 'white', fontWeight: 'bold', fontSize: 18}}
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
          />
 
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}

      <TouchableHighlight
        onPress={handleAttendance1}
        style={{
          height: 40,
          width: '80%',
          borderRadius: 10,
          backgroundColor: 'rgba(255, 215, 0, 255)',
          marginLeft: 50,
          marginRight: 50,
          marginTop: 30,
        }}>
        <Text
          style={{
            color: 'rgba(2, 62, 196, 1)',
            textAlign: 'center',
            paddingTop: 4,
            fontSize: 25,
            fontFamily: 'OCR A',
          }}>
          TAKE ATTENDANCE
        </Text>
      </TouchableHighlight>
    </View>
  );

  // function onChangeProgram() {
  //   return val => setSelectProgram(val);
  // }

// onChangeYear = (val) => {
    
//   setSelectYear(val);

//     // axios
//     //   .get('http://172.25.176.1:3000/lecturer/courses/32')
//     //   .then(function (response) {
//     //     // handle success
//     //     // console.log(data);
//     //     setSelectCourses(response.data[0]);
//     //   })
//     //   .catch(function (error) {
//     //     // handle error
//     //     console.log(error);
//     //   })
//     //   .then(function () {
//     //     // always executed
//     //   });
//   }

//   function onChangeCourses() {
//     return val => setSelectCourses(val);
//   }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 62, 196, 1)',
  },
})
export default App;
