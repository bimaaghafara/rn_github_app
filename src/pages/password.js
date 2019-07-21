import React, { Component } from 'react';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon} from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setPassword } from '../redux/actions';

// 3rd lib
import base64 from 'react-native-base64'

class PagePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: ''
    }
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
              console.log(
                this.props.reduxState.username,
                this.state.password,
                base64.encode(this.state.password)
              )
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