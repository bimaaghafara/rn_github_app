import React, { Component } from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon} from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setPassword } from '../redux/actions';

// 3rd lib
import base64 from 'react-native-base64'
import Axios from 'axios';

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

  onSubmit() {
    const authorization = `Basic ${base64.encode(this.props.reduxState.username+':'+this.state.password)}`; 
    Axios.post(
      'https://api.github.com/authorizations',
      {note: 'Bimaaghafara React Native Github App', fingerprint: this.getUniqString()},
      {headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': authorization
    }})
    .then(res => {
      console.log(res, res.data.token);
      AsyncStorage.setItem('token', res.data.token);
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
  }
  
  render(){
    return(
      <Container>
        <Content padder>
          <Text style = {{marginVertical: 20}}>
            Please enter your github password and click submit to continue! 
          </Text>
          <Item stackedLabel>
            <Label>Password</Label>
            <Input onChange={(event) => {
              this.setState({password: event.nativeEvent.text});
            }}/>
          </Item>
          <Button
            iconRight
            style = {{alignSelf: 'center', margin: 30}}
            disabled = {!this.state.password}
            onPress= {() => {
              this.onSubmit();
              // Actions.PagePassword();
              // this.props.setUsername(this.state.username);
            }}>
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
	  setPassword: (payload) => dispatch(
			setPassword(payload)
		)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePassword);