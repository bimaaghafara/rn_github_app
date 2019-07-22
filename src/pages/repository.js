import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setCommits, setNextCommits } from '../redux/actions';

class PageRepository extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repositoryName: 'facebook/react-native'
        }
    }

    async onSubmit() {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Text style={{ marginVertical: 20 }}>
                        Please enter repository name and click submit to browse commits history!
                    </Text>
                    <Item stackedLabel>
                        <Label>Repository Name</Label>
                        <Input value={this.state.repositoryName} onChange={(event) => {
                            this.setState({ repositoryName: event.nativeEvent.text });
                        }} />
                    </Item>
                    <Button
                        iconRight
                        style={{ alignSelf: 'center', margin: 30 }}
                        disabled={!this.state.repositoryName}
                        onPress={() => {this.onSubmit()}}>
                        <Text>Next</Text>
                        <Icon name='arrow-forward' />
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { reduxState: state }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCommits: (payload) => dispatch(setCommits(payload)),
        setNextCommits: (payload) => dispatch(setNextCommits(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRepository);