/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  StyleSheet
} from 'react-native';

import PageLogin from './src/pages/login';
import PagePassword from './src/pages/password';

import { Router, Scene } from 'react-native-router-flux';

class App extends Component {
  render(){
    console.disableYellowBox = true;
    return (
      <Fragment>
        <Router hideNavBar= "true">
          <Scene key="Root">
            <Scene key="PageLogin" component={PageLogin} title="PageLogin" initial={true} />
            <Scene key="PagePassword" component={PagePassword} title="PagePassword" />
          </Scene>
        </Router>
      </Fragment>
    );
  };
}

const styles = StyleSheet.create({
  Content: {
    'padding': 8
  }
});

export default App;
