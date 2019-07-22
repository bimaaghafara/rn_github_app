import React, { Component } from 'react';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon} from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setUsername } from '../redux/actions';

class PageLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
	}

  render(){
    return(
      <Container>
        <Content padder>
          <Text style = {{marginVertical: 20}}>
            Please enter your github username and click next to continue! 
          </Text>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input onChange={(event) => {
              this.setState({username: event.nativeEvent.text});
            }}/>
          </Item>
          <Button
            iconRight
            style = {{alignSelf: 'center', margin: 30}}
            disabled = {!this.state.username}
            onPress= {() => {
              Actions.PagePassword();
              this.props.setUsername(this.state.username);
            }}>
            <Text>Next</Text>
            <Icon name='arrow-forward' />
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
	  setUsername: (payload) => dispatch(
			setUsername(payload)
		)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);