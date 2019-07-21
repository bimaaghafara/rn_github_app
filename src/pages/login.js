import React, { Component } from 'react';
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class PageLogin extends Component {
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
            onPress= {() => {Actions.PagePassword(); }}>
            <Text>Goto Page Password</Text>
          </Button>
         </Content>
      </Container>
    );
  }
}