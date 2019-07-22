import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setCommits, setNextCommits } from '../redux/actions';

// 3rd lib
import Axios from 'axios';

class PageRepository extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repositoryName: 'facebook/react-native'
        }
    }

    fetchCommits(token, urlParams, reduxAction) {
        Axios.get(
        `https://api.github.com/repos/${this.state.repositoryName}/commits${urlParams}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res, res.data);
            this.props[reduxAction](res.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    async onSubmit() {
        const token = await AsyncStorage.getItem('token');
        this.fetchCommits(token, '?page=1&per_page=10', 'setCommits');
        this.fetchCommits(token, '?page=2&per_page=10', 'setNextCommits');
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
                    </Button><Button
                        iconRight
                        style={{ alignSelf: 'center', margin: 30 }}
                        disabled={!this.state.repositoryName}
                        onPress={() => {console.log(this.props.reduxState)}}>
                        <Text>sfdfsd</Text>
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