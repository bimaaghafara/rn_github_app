import React, { Component } from 'react';

// UI
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setUsername } from '../redux/actions';

import base64 from 'react-native-base64'

class PageLogin extends Component {

  constructor(props) {
		super(props);
	}

  componentDidMount () {
  }

  render(){
    return(
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  This is Page Login, Press button to goto page password
                </Text>
                <Text>
                  {this.props.reduxState.username} - {this.props.reduxState.password}
                </Text>
                <Text>{base64.encode(this.props.reduxState.password)}</Text>
              </Body>
            </CardItem>
          </Card>
          <Button dark bordered style = {{alignSelf: 'center', margin: 30}}
            onPress= {() => {
              Actions.PagePassword();
              this.props.setUsername('saafasfa');
            }}>
            <Text>Goto Page Password</Text>
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