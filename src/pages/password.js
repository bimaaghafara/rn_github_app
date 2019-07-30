import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon} from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setPassword, showLoader } from '../redux/actions';

// 3rd lib
import base64 from 'react-native-base64';
import Axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

class PagePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: ''
    }
  }

  getUniqString() {
    const min = 1;
    const max = 9876543210;
    const randomInt = Math.floor(Math.random()*(max-min)) + min;
    return Date.now().toString(32) + randomInt.toString(32);
  }

  onChangePassword = (text) => {
    this.setState({password: text});
  }

  onSubmit = async () => {
    const authorization = `Basic ${base64.encode(this.props.reduxState.username+':'+this.state.password)}`; 
    this.props.showLoader(true);
    await Axios.post(
      'https://api.github.com/authorizations',
      {note: 'Bimaaghafara React Native Github App', fingerprint: this.getUniqString()},
      {headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': authorization
    }})
    .then(res => {
      console.log(res, res.data.token);
      AsyncStorage.setItem('token', res.data.token);
      Actions.PageRepository();
    })
    .catch(error =>{
      if (error.response) {
        console.log(error.response.status);
        if (error.response.status === 401) {
          Alert.alert(
            'Error',
            'Wrong Username / Password, please try again!',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: true},
          );
        }
      } else if (error.request) {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    this.props.showLoader(false);
  }
  
  render(){
    return(
      <Container>
        <Spinner
          visible={this.props.reduxState.showLoader}
          textContent={'Loading...'}
        />
        <Content padder>
          <Text style = {styles.messageText}>
            Please enter your github password and click submit to continue! 
          </Text>
          <Item stackedLabel>
            <Label>Password</Label>
            <Input onChangeText={this.onChangePassword}/>
          </Item>
          <Button
            iconRight
            style = {styles.submitButton}
            disabled = {!this.state.password}
            onPress= {this.onSubmit}>
            <Text>Submit</Text>
            <Icon type='AntDesign' name='login' />
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { reduxState: state}
};

const mapDispatchToProps = (dispatch) => {
	return {
	  showLoader: (payload) => dispatch(showLoader(payload)),
	  setPassword: (payload) => dispatch(setPassword(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePassword);

const styles = StyleSheet.create({
  messageText: { marginVertical: 20 },
  submitButton: { alignSelf: 'center', margin: 30 }
});