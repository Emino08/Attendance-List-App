import React from 'react';
// import {Root, StyleProvider, View} from 'native-base';
import {View} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
// import getTheme from './native-base-theme/components';
// import platform from './native-base-theme/variables/platform';
import ConnectionScreen from './src/connection/ConnectionScreen';
import {
  DeviceListScreen,
  DeviceList,
  DeviceListItem,
} from './src/device-list/DeviceListScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      device: undefined,
      bluetoothEnabled: true,
    };
  }

  /**
   * Sets the current device to the application state.  This is super basic
   * and should be updated to allow for things like:
   * - multiple devices
   * - more advanced state management (redux)
   * - etc
   *
   * @param device the BluetoothDevice selected or connected
   */
  selectDevice = device => {
    console.log('App::selectDevice() called with: ', device);
    this.setState({device});
  };

  /**
   * On mount:
   *
   * - setup the connect and disconnect listeners
   * - determine if bluetooth is enabled (may be redundant with listener)
   */
  async componentDidMount() {
    console.log(
      'App::componentDidMount adding listeners: onBluetoothEnabled and onBluetoothDistabled',
    );
    console.log(
      'App::componentDidMount alternatively could use onStateChanged',
    );
    this.enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(event =>
      this.onStateChanged(event),
    );
    this.disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(event =>
      this.onStateChanged(event),
    );

    this.checkBluetootEnabled();
  }

  /**
   * Performs check on bluetooth being enabled.  This removes the `setState()`
   * from `componentDidMount()` and clears up lint issues.
   */
  async checkBluetootEnabled() {
    try {
      console.log('App::componentDidMount Checking bluetooth status');
      let enabled = await RNBluetoothClassic.isBluetoothEnabled();

      console.log(`App::componentDidMount Status: ${enabled}`);
      this.setState({bluetoothEnabled: enabled});
    } catch (error) {
      console.log('App::componentDidMount Status Error: ', error);
      this.setState({bluetoothEnabled: false});
    }
  }

  /**
   * Clear subscriptions
   */
  componentWillUnmount() {
    console.log(
      'App:componentWillUnmount removing subscriptions: enabled and distabled',
    );
    console.log(
      'App:componentWillUnmount alternatively could have used stateChanged',
    );
    this.enabledSubscription.remove();
    this.disabledSubscription.remove();
  }

  /**
   * Handle state change events.
   *
   * @param stateChangedEvent event sent from Native side during state change
   */
  onStateChanged(stateChangedEvent) {
    console.log(
      'App::onStateChanged event used for onBluetoothEnabled and onBluetoothDisabled',
    );

    this.setState({
      bluetoothEnabled: stateChangedEvent.enabled,
      device: stateChangedEvent.enabled ? this.state.device : undefined,
    });
  }

  render() {
    return (
      <View>
        {!this.state.device ? (
          <DeviceListScreen
            bluetoothEnabled={this.state.bluetoothEnabled}
            selectDevice={this.selectDevice}
          />
        ) : (
          <ConnectionScreen
            device={this.state.device}
            onBack={() => this.setState({device: undefined})}
          />
        )}
      </View>
    );
  }
}




import React from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import {
  PermissionsAndroid,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  Icon,
  Toast,
  Platform,
} from 'react-native';

/**
 * See https://reactnative.dev/docs/permissionsandroid for more information
 * on why this is required (dangerous permissions).
 */
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
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

/**
 * Displays the device list and manages user interaction.  Initially
 * the NativeDevice[] contains a list of the bonded devices.  By using
 * the Discover Devices action the list will be updated with unpaired
 * devices.
 *
 * From here:
 * - unpaired devices can be paired
 * - paired devices can be connected
 *
 * @author kendavidson
 */
export default class DeviceListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      accepting: false,
      discovering: false,
    };
  }

  componentDidMount() {
    this.getBondedDevices();
  }

  componentWillUnmount() {
    if (this.state.accepting) {
      this.cancelAcceptConnections(false);
    }

    if (this.state.discovering) {
      this.cancelDiscovery(false);
    }
  }

  /**
   * Gets the currently bonded devices.
   */
  getBondedDevices = async (unloading) => {
    console.log('DeviceListScreen::getBondedDevices');
    try {
      let bonded = await RNBluetoothClassic.getBondedDevices();
      console.log('DeviceListScreen::getBondedDevices found', bonded);

      if (!unloading) {
        this.setState({ devices: bonded });
      }
    } catch (error) {
      this.setState({ devices: [] });

      // Toast.show({
      //   text: error.message,
      //   duration: 5000,
      // });
      alert(error.message)
    }
  };

  /**
   * Starts attempting to accept a connection.  If a device was accepted it will
   * be passed to the application context as the current device.
   */
  acceptConnections = async () => {
    if (this.state.accepting) {
      // Toast.show({
      //   text: 'Already accepting connections',
      //   duration: 5000,
      // });

      alert("Already accepting connections")
      return;
    }

    this.setState({ accepting: true });

    try {
      let device = await RNBluetoothClassic.accept({ delimiter: '\r' });
      if (device) {
        this.props.selectDevice(device);
      }
    } catch (error) {
      // If we're not in an accepting state, then chances are we actually
      // requested the cancellation.  This could be managed on the native
      // side but for now this gives more options.
      if (!this.state.accepting) {
        // Toast.show({
        //   text: 'Attempt to accept connection failed.',
        //   duration: 5000,
        // });
        alert('Attempt to accept connection failed')
      }
    } finally {
      this.setState({ accepting: false });
    }
  };

  /**
   * Cancels the current accept - might be wise to check accepting state prior
   * to attempting.
   */
  cancelAcceptConnections = async () => {
    if (!this.state.accepting) {
      return;
    }

    try {
      let cancelled = await RNBluetoothClassic.cancelAccept();
      this.setState({ accepting: !cancelled });
    } catch (error) {
      // Toast.show({
      //   text: 'Unable to cancel accept connection',
      //   duration: 2000,
      // });
      alert('Unable to cancel accept connection')
    }
  };

  startDiscovery = async () => {
    try {
      let granted = await requestAccessFineLocationPermission();

      if (!granted) {
        throw new Error('Access fine location was not granted');
      }

      this.setState({ discovering: true });

      let devices = [...this.state.devices];

      try {
        let unpaired = await RNBluetoothClassic.startDiscovery();

        let index = devices.findIndex(d => !d.bonded);
        if (index >= 0) { devices.splice(index, devices.length - index, ...unpaired); }
        else { devices.push(...unpaired); }

        // Toast.show({
        //   text: `Found ${unpaired.length} unpaired devices.`,
        //   duration: 2000,
        // });
        alert(`Found ${unpaired.length} unpaired devices.`)
      } finally {
        this.setState({ devices, discovering: false });
      }
    } catch (err) {
      // Toast.show({
      //   text: err.message,
      //   duration: 2000,
      // });
      alert(err.message)
    }
  };

  cancelDiscovery = async () => {
    try {
    } catch (error) {
      // Toast.show({
      //   text: 'Error occurred while attempting to cancel discover devices',
      //   duration: 2000,
      // });
      alert('Error occurred while attempting to cancel discover devices')
    }
  };

  requestEnabled = async () => {
    try {
    } catch (error) {
      // Toast.show({
      //   text: `Error occurred while enabling bluetooth: ${error.message}`,
      //   duration: 200,
      // });
      alert(`Error occurred while enabling bluetooth: ${error.message}`)
    }
  };

  render() {
    let toggleAccept = this.state.accepting
      ? () => this.cancelAcceptConnections()
      : () => this.acceptConnections();

    let toggleDiscovery = this.state.discovering
      ? () => this.cancelDiscovery()
      : () => this.startDiscovery();

    return (
      <View>
        <View>
          <Text>Devices</Text>

          {this.props.bluetoothEnabled ? (
            <Button
              title="Bluetooth"
              transparent
              onPress={this.getBondedDevices}>
              {/* <Icon type="Ionicons" name="md-sync" /> */}
            </Button>
          ) : (
            <Text>Undefine1</Text>
          )}
        </View>
        {this.props.bluetoothEnabled ? (
          <View>
            <DeviceList
              devices={this.state.devices}
              onPress={this.props.selectDevice}
            />
            {Platform.OS !== 'ios' ? (
              <View>
                <Button
                  title={
                    this.state.accepting
                      ? 'Accepting (cancel)...'
                      : 'Accept Connection'
                  }
                  onPress={toggleAccept}/>
                <Button
                  title={
                    this.state.discovering
                      ? 'Discovering (cancel)...'
                      : 'Discover Devices'
                  }
                  onPress={toggleDiscovery}
                />
              </View>
            ) : (
              <Text>Undefine2</Text>
            )}
          </View>
        ) : (
          <View>
            <Text>Bluetooth is OFF</Text>
            <Button
              title="Enable Bluetooth"
              onPress={() => this.requestEnabled()}/>
          </View>
        )}
      </View>
    );
  }
}