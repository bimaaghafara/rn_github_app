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

// Pages
import PageLogin from './src/pages/login';
import PagePassword from './src/pages/password';

// redux
import { Provider } from 'react-redux';
import store from './src/redux/store';

// navigation
import { Router, Scene } from 'react-native-router-flux';

class App extends Component {
  render(){
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Fragment>
          <Router hideNavBar= "true">
            <Scene key="Root">
              <Scene key="PageLogin" component={PageLogin} title="Login Page" initial={true} />
              <Scene key="PagePassword" component={PagePassword} title="Password Page" />
            </Scene>
          </Router>
        </Fragment>
      </Provider>
    );
  };
}

const styles = StyleSheet.create({
  Content: {
    'padding': 8
  }
});

export default App;
