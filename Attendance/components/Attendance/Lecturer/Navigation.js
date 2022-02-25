import * as React from 'react';
import {Button, View} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView , DrawerItemList,DrawerItem, DrawerNavigationItem} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Home from './Home'
import Attendance from './Attendance';
import AllAttendance from './All Attendance'
import AllAttendance1 from './All Attendance1'
import AllAttendance2 from './All Attendance2'
import Attendance1 from './Attendance1'
import RStudent from './RStudent'
import RLecturer from './RLecturer'
import RModule from './RModule'
import RegistrationHome from './RegistrationHome'
import AttendanceHome from './AttendanceHome'
import UpdateHome from './UpdateHome'
import Profile from './Profile'
import ClassAttendance from './ClassAttendance'
import URLecturer from './UpdateDetails/URLecturer '
import URModule from './UpdateDetails/URModule'
import URStudent from './UpdateDetails/URStudent'
import ClassAttendanceDisplay from './ClassAttendanceDisplay'
import LAllAttendance from './Attendance/Lecturer/All Attendance'
import LAllAttendance1 from './Attendance/Lecturer/All Attendance1'
import LAllAttendance2 from './Attendance/Lecturer/All Attendance2'
import LClassAttendance from './Attendance/Lecturer/ClassAttendance'
import LAttendance from './Attendance/Lecturer/Attendance'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login'
import LAttendanceHome from './Attendance/Lecturer/AttendanceHome'

const Stack = createStackNavigator();

// const Loginn = ({ navigation }) => {
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Login"
//       component={Login}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>;
// }
const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="LAttendanceHome">
      <Stack.Screen
        name="Lecturer Attendance"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{headerShown: false, title: 'Attendance'}}
      />

      <Stack.Screen
        name="AllAttendance1"
        component={AllAttendance1}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AllAttendance2"
        component={AllAttendance2}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Attendance1"
        component={Attendance1}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AllAttendance"
        component={AllAttendance}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="RStudent"
        component={RStudent}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="RLecturer"
        component={RLecturer}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="RModule"
        component={RModule}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="RegistrationHome"
        component={RegistrationHome}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AttendanceHome"
        component={AttendanceHome}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="UpdateHome"
        component={UpdateHome}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ClassAttendance"
        component={ClassAttendance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="URLecturer"
        component={URLecturer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="URModule"
        component={URModule}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="URStudent"
        component={URStudent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassAttendanceDisplay"
        component={ClassAttendanceDisplay}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LAttendance"
        component={LAttendance}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LAllAttendance"
        component={LAllAttendance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LAllAttendance1"
        component={LAllAttendance1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LAllAttendance2"
        component={LAllAttendance2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LClassAttendance"
        component={LClassAttendance}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LAttendanceHome"
        component={LAttendanceHome}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// const AttendancePath = ({navigation}) => {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="Attendance"
//         component={Attendance}
//         options={{headerShown: false, title: 'Attendance'}}
//       />

//       <Stack.Screen
//         name="AllAttendance1"
//         component={AllAttendance1}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="AllAttendance2"
//         component={AllAttendance2}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="Attendance1"
//         component={Attendance1}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="AllAttendance"
//         component={AllAttendance}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="RStudent"
//         component={RStudent}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="RLecturer"
//         component={RLecturer}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="RModule"
//         component={RModule}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

// const Registration = ({navigation}) => {
//   return (
//     <Stack.Navigator initialRouteName="Home">

//       <Stack.Screen
//         name="RStudent"
//         component={RStudent}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="RLecturer"
//         component={RLecturer}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="RModule"
//         component={RModule}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

// const UpdateDetails = ({navigation}) => {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen
//         name="URStudent"
//         component={RStudent}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="URLecturer"
//         component={RLecturer}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="URModule"
//         component={RModule}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };


// function Login1({navigation}) {
//   // return (
//   //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//   //     {/* <Button
//   //       onPress={() => navigation.navigate('Notifications')}
//   //       title="Go to notifications"
//   //     /> */}
//   //         <Home />
//   //    </View>
//   // );
//   navigation.replace('Login')
// }

// const Lout = (props) => {
//   removeValue('username');
//   removeValue('password');
//   alert("logout")
// props.navigation.replace('Login')
// }

// function Logout(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem label="Logout" onPress={Lout} />
//     </DrawerContentScrollView>
//   );
// }

removeValue = async value => {
  try {
    await AsyncStorage.removeItem(value);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};

const profileScreenStack = ({ navigation }) => {
 return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
     />
     
   </Stack.Navigator>
 )
}

const Drawer = createDrawerNavigator();

export default function App({navigation}) {
  return (
    //  <NavigationContainer>
    <Drawer.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

        let headerTitle;

        switch (routeName) {
          // case 'Home':
          //   headerTitle = 'Home';
          //   break;
          case 'Attendance':
            headerTitle = 'Attendance Details';
            break;
          case 'AllAttendance1':
            headerTitle = 'All Attendance1';
            break;
          case 'AllAttendance2':
            headerTitle = 'All Attendance2';
            break;
          case 'Attendance1':
            headerTitle = 'Taking Attendance';
            break;
          case 'RStudent':
            headerTitle = 'Register Student';
            break;
          case 'RLecturer':
            headerTitle = 'Register Lecturer';
            break;
          case 'RModule':
            headerTitle = 'Register Module';
            break;
          case 'Home':
            headerTitle = 'Home';
            break;
          case 'RegistrationHome':
            headerTitle = 'Registration';
            break;
          case 'AttendanceHome':
            headerTitle = 'Attendance';
            break;
          case 'UpdateHome':
            headerTitle = 'Update Details';
            break;
          case 'Profile':
            headerTitle = 'Profile';
            break;
          case 'ClassAttendance':
            headerTitle = 'Class Attendance';
            break;
          case 'URLecturer':
            headerTitle = 'Update Lecturer';
            break;
          case 'URModule':
            headerTitle = 'Update Module';
            break;
          case 'URStudent':
            headerTitle = 'Update Student';
            break;
          case 'Edit Profile':
            headerTitle = 'Update Student';
            break;
          case 'profileScreenStack':
            headerTitle = 'Profile';
            break;

          case 'ClassAttendanceDisplay':
            headerTitle = 'Class Attendance Display';
            break;
        }

        return {
          headerTitle,
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(2, 62, 196, 1)',
            borderBottomColor: 'gray',
            borderWidth: 3,
          },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
          headerShadowVisible: true,
        };
      }}
      initialRouteName="homeScreenStack"
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={() => {
                removeValue('username');
                removeValue('password');
                props.navigation.replace('Login')
              }}
            />
          </DrawerContentScrollView>
        );
      }
      }>
      {/* <Drawer.Screen name="Login" component={Login} /> */}
      <Drawer.Screen name="Home " component={homeScreenStack} />
      <Drawer.Screen
        name="Edit Profile"
        // options={{headerShown: true}}
        component={profileScreenStack}
      />
      {/* <Drawer.Screen name="Logout" component={LogoutScreen} /> */}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
