// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './components/Splash Screen';
import LoginScreen from './components/Login';
import Navigation from './components/Navigation'
import Attendance from './components/Attendance';
// Forget Password
import ForgetPassword from './components/All Attendance1';
import DrawerNavigationRoutes from './components/Screen/DrawerNavigationRoutes';

const Stack = createStackNavigator();

 const Auth = () => {
   // Stack Navigator for Login and Sign up Screen
   return (
     <Stack.Navigator initialRouteName="LoginScreen">
       <Stack.Screen
         name="LoginScreen"
         component={LoginScreen}
         options={{
           headerShown: false,
           headerStyle: {
             backgroundColor: '#307ecc', //Set Header color
           },
           headerTintColor: '#fff', //Set Header text color
           headerTitleStyle: {
             fontWeight: 'bold', //Set Header text style
           },
         }}        />
      { <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          title: 'Forget Password', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
           },        
           }}
       /> }
     </Stack.Navigator>
   );
 };

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Attendance"
          component={Attendance}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Navigation"
          component={Navigation}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import React from 'react';
// import SplashScreen from './components/Splash Screen';
// import Login from './components/Login'

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App = () => {

//   return (
//     <View>
//       <Login />
//     </View>
//   );
// };

// export default App;


// import React from 'react';
// // import {Root, StyleProvider, View} from 'native-base';
// import {View} from 'react-native';
// import RNBluetoothClassic from 'react-native-bluetooth-classic';
// // import getTheme from './native-base-theme/components';
// // import platform from './native-base-theme/variables/platform';
// import ConnectionScreen from './src/connection/ConnectionScreen';
// import DeviceListScreen from './src/device-list/DeviceListScreen';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       device: undefined,
//       bluetoothEnabled: true,
//     };
//   }

//   /**
//    * Sets the current device to the application state.  This is super basic
//    * and should be updated to allow for things like:
//    * - multiple devices
//    * - more advanced state management (redux)
//    * - etc
//    *
//    * @param device the BluetoothDevice selected or connected
//    */
//   selectDevice = device => {
//     console.log('App::selectDevice() called with: ', device);
//     this.setState({device});
//   };

//   /**
//    * On mount:
//    *
//    * - setup the connect and disconnect listeners
//    * - determine if bluetooth is enabled (may be redundant with listener)
//    */
//   async componentDidMount() {
//     console.log(
//       'App::componentDidMount adding listeners: onBluetoothEnabled and onBluetoothDistabled',
//     );
//     console.log(
//       'App::componentDidMount alternatively could use onStateChanged',
//     );
//     this.enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(event =>
//       this.onStateChanged(event),
//     );
//     this.disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(event =>
//       this.onStateChanged(event),
//     );

//     this.checkBluetootEnabled();
//   }

//   /**
//    * Performs check on bluetooth being enabled.  This removes the `setState()`
//    * from `componentDidMount()` and clears up lint issues.
//    */
//   async checkBluetootEnabled() {
//     try {
//       console.log('App::componentDidMount Checking bluetooth status');
//       let enabled = await RNBluetoothClassic.isBluetoothEnabled();

//       console.log(`App::componentDidMount Status: ${enabled}`);
//       this.setState({bluetoothEnabled: enabled});
//     } catch (error) {
//       console.log('App::componentDidMount Status Error: ', error);
//       this.setState({bluetoothEnabled: false});
//     }
//   }

//   /**
//    * Clear subscriptions
//    */
//   componentWillUnmount() {
//     console.log(
//       'App:componentWillUnmount removing subscriptions: enabled and distabled',
//     );
//     console.log(
//       'App:componentWillUnmount alternatively could have used stateChanged',
//     );
//     this.enabledSubscription.remove();
//     this.disabledSubscription.remove();
//   }

//   /**
//    * Handle state change events.
//    *
//    * @param stateChangedEvent event sent from Native side during state change
//    */
//   onStateChanged(stateChangedEvent) {
//     console.log(
//       'App::onStateChanged event used for onBluetoothEnabled and onBluetoothDisabled',
//     );

//     this.setState({
//       bluetoothEnabled: stateChangedEvent.enabled,
//       device: stateChangedEvent.enabled ? this.state.device : undefined,
//     });
//   }

//   render() {
//     return (
//       <View>
//         {!this.state.device ? (
//           <DeviceListScreen
//             bluetoothEnabled={this.state.bluetoothEnabled}
//             selectDevice={this.selectDevice}
//           />
//         ) : (
//           <ConnectionScreen
//             device={this.state.device}
//             onBack={() => this.setState({device: undefined})}
//           />
//         )}
//       </View>
//     );
//   }
// }