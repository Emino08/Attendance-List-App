import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert, FlatList} from 'react-native';
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
];


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

function App({navigation}) {

  const [selectProgram, setSelectProgram] = useState({});
  const [selectYear, setSelectYear] = useState({});
  const [selectCourses, setSelectCourses] = useState({});
  const [selectRename, setSelectRename] = useState(false);
    const [selectNewCourse, setSelectNewcourse] = useState();
    const [finish, setFinish] = useState(false)
    const [data, setData] = useState([])
  const [data1, setData1] = useState(null)
  const [value, setValue] = useState('')
  const [finalValue, setFinalValue] = useState({})
  var NewCourses = [];

 useEffect(() => {
   getData('username');
 }, []);

  handleAttendance1 = () => {
    // if (!isOnBlueToggleSwitch) {
    //   alert('Please change to true');
    //   return;
    // }
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
      pSelected: selectProgram,
      ySelected: selectYear,
      cSelected: selectCourses,
    });

    setSelectProgram({});
    setSelectYear({});
    setSelectCourses({});
  };

  onChangeCourses = val => {
      // console.log(selectProgram);
    setSelectCourses(val);
    console.log(val);
        // var self = this;
        axios
          .get(`${URL}/attendance/${val.id}`)
          .then(function (response) {
            // handle success
            // console.log(response.data[0]);
        console.log(response.data[0]);
            setData(response.data[0])
            console.log(data);
            //   self.setState({data: response.data});
            //   self.setState({isLoading: false});
              console.log(Object.keys(response.data[0]).length);
            //   console.log(response.data[1]);

              if (Object.keys(response.data[0]).length > 0) {
                  setData1(response.data[1])
                // self.setState({data1: });
                  setFinish(true)
                // self.setState({finish: true});
              }

          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
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
  
  onChangeYear = val => {
    setSelectYear(val);
    setSelectCourses({});
    setSelectNewcourse();
    // console.log(selectProgram.id);

    if (Object.keys(selectProgram).length === 0) {
      alert('Please choose Program');
      return;
    }else{ axios
      // .get(`${URL}/lecturer/courses/32`)
      .get(`${URL}/lecturer/courses/${value}/${val.id}/${selectProgram.id}`)
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

        if (data === 'No Match') {
          alert('No course found');
          setSelectCourses({});
          setFinalValue({});
          setData([]);
          return;
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
        setFinalValue(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });}
   
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
  
  responderView = (item) => {
    
    navigation.navigate('ClassAttendanceDisplay', {date: item.date,selectCourses,selectProgram});
         alert(item.date)
       
  }
//handling onPress action
getListViewItem = item => {
  alert(item);
    };
    
  return (
    <View style={{backgroundColor: 'rgba(2, 62, 196, 1)', height: '100%'}}>
      <View style={{marginLeft: 30, marginRight: 30, marginTop: 30}}>
        <SelectBox
          label="Select programs"
          options={PROGRAMS}
          value={selectProgram}
          onChange={onChangeProgram()}
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

      <View style={{marginLeft: 30, marginRight: 30}}>
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

      {(Object.keys(finalValue).length) > 0 ? (
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

      {/* <TouchableHighlight
        onPress={handleAttendance1}
        style={{
          height: 40,
          width: '80%',
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
          TAKE ATTENDANCE
        </Text>
      </TouchableHighlight> */}

      {finish ? (
        <FlatList
          nestedScrollEnabled
          style={{marginBottom: 50}}
          data={data}
          keyExtractor={item => item.date.toString()}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={styles.item}
                onStartShouldSetResponder={() => responderView(item)}
                // onPress={getListViewItem(item)}
              >
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: '50%',
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {data1.lecturerName}
                  </Text>
                  <Text
                    style={{
                      width: '50%',
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: 'black',
                      marginLeft: 50,
                    }}
                    // onPress={getListViewItem(item)}
                  >
                    {item.lecturerPhone}
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
                    {selectProgram.item}
                  </Text>
                  <Text
                    style={{
                      width: '50%',
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: 'black',
                      marginLeft: 35,
                    }}
                    // onPress={getListViewItem(item)}
                  >
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
          ItemSeparatorComponent={renderSeparator}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 18 }}>
              {/* error */}
            {/* Error fetching data... Check your network connection! */}
          </Text>
        </View>
      )}
    </View>
  );

  function onChangeProgram() {
    return val => setSelectProgram(val);
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
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
export default App;
