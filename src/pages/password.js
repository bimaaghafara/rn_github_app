import React, { Component } from 'react';
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class PagePassword extends Component {
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
              </Body>
            </CardItem>
          </Card>
          <Button dark bordered
            onPress= {() => {Actions.pop(); }}>
            <Text>Goto Page Login</Text>
         </Button>
        </Content>
      </Container>
    );
  }
}