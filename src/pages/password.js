import React, { Component } from 'react';
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setPassword } from '../redux/actions';

class PagePassword extends Component {
  render(){
    return(
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  This is Page Password, Press button to goto page login
                </Text>
                <Text>
                  {this.props.reduxState.username} - {this.props.reduxState.password}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Button dark bordered
            onPress= {() => {
              this.props.setPassword('ffffffff');
              Actions.pop();
            }}>
            <Text>Goto Page Login</Text>
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