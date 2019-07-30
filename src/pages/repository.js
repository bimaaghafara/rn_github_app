import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet } from 'react-native';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setCommits, setNextCommits, showLoader, setRepositoryName } from '../redux/actions';

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

    onPressLogout = () => {
        AsyncStorage.removeItem('token');
        Actions.reset('PageLogin')
    }

    onChangeRepositoryName = (text) => {
        this.setState({ repositoryName: text });
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

    onSubmit = async () => {
        this.props.showLoader(true);
        const token = await AsyncStorage.getItem('token');
        await this.fetchCommits(token, '?page=1&per_page=10', 'setCommits');
        await this.fetchCommits(token, '?page=2&per_page=10', 'setNextCommits');
        this.props.setRepositoryName(this.state.repositoryName);
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
                    
                    <Button
                        style={styles.logoutButton}
                        iconLeft danger small rounded
                        onPress={this.onPressLogout}>
                        <Icon name='home' />
                        <Text>Logout</Text>
                    </Button>

                    <Text style={styles.messageText}>
                        Please enter repository name and click submit to browse commits history!
                    </Text>
                    <Item stackedLabel>
                        <Label>Repository Name</Label>
                        <Input value={this.state.repositoryName} onChangeText={this.onChangeRepositoryName} />
                    </Item>
                    <Button
                        iconRight
                        style={styles.nextButton}
                        disabled={!this.state.repositoryName}
                        onPress={this.onSubmit}>
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
        setRepositoryName: (payload) => dispatch(setRepositoryName(payload)),
        setCommits: (payload) => dispatch(setCommits(payload)),
        setNextCommits: (payload) => dispatch(setNextCommits(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRepository);

const styles = StyleSheet.create({
    logoutButton: { alignSelf: 'flex-end' },
    messageText: { marginVertical: 20 },
    nextButton: { alignSelf: 'center', margin: 30 }
});