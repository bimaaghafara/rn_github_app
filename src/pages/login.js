import React, { Component } from 'react';

// UI
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';

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
              </Body>
            </CardItem>
          </Card>
          <Button dark bordered style = {{alignSelf: 'center', margin: 30}}
            onPress= {() => {console.log(this.props); }}>
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

export default connect(mapStateToProps)(PageLogin);