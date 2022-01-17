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

const Stack = createStackNavigator();

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{headerShown: false,title: 'Attendance'}}
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
    </Stack.Navigator>
  );
};



// function Login({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       {/* <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       /> */}
//           <Home />
//      </View>
//   );
// }

function Logout(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => alert('Link to Logout')} />
    </DrawerContentScrollView>
  );
}

function Profile({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function LogoutScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    //  <NavigationContainer>
    <Drawer.Navigator
      screenOptions={({route}) => {
        const routeName =
          getFocusedRouteNameFromRoute(route) ?? 'OrderSearchScreen';

        let headerTitle;

        switch (routeName) {
          case 'OrderSearchScreen':
            headerTitle = 'Home';
            break;
          case 'Attendance':
            headerTitle = 'Attendance';
            break;
          case 'AllAttendance1':
            headerTitle = 'All Attendance1';
            break;
          case 'AllAttendance2':
            headerTitle = 'All Attendance2';
            break;
          case 'Attendance1':
            headerTitle = 'Attendance1';
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
        }

        return {
          headerTitle,
          headerShown: true,
          headerStyle: {backgroundColor: 'rgba(2, 62, 196, 1)',borderBottomColor:"gray",borderWidth:3},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
          headerShadowVisible: true,
        };
      }}
      initialRouteName="homeScreenStack"
      drawerContent={props => <Logout {...props} />}
      //New
      //drawerContent={({navigation}) => (
      //  <DrawerComponent navigation={navigation} />
      //)}
    >
      {/* <Drawer.Screen name="Login" component={Login} /> */}
      <Drawer.Screen name="Home Now" component={homeScreenStack} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
