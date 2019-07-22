import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setCommits, setNextCommits, showLoader } from '../redux/actions';

// 3rd lib
import Axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

class PageRepository extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repositoryName: 'facebook/react-native'
        }
    }

    async fetchCommits(token, urlParams, reduxAction) {
        await Axios.get(
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
        this.props.showLoader(true);
        const token = await AsyncStorage.getItem('token');
        await this.fetchCommits(token, '?page=1&per_page=10', 'setCommits');
        await this.fetchCommits(token, '?page=2&per_page=10', 'setNextCommits');
        this.props.showLoader(false);
        Actions.PageCommits();
    }

    render() {
        return (
            <Container>
                <Spinner
                    visible={this.props.reduxState.showLoader}
                    textContent={'Loading...'}
                />
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
        showLoader: (payload) => dispatch(showLoader(payload)),
        setCommits: (payload) => dispatch(setCommits(payload)),
        setNextCommits: (payload) => dispatch(setNextCommits(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRepository);