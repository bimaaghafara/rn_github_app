import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// UI
import { Container, Content, Text, ListItem, Left, Thumbnail, Body, Right } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setCommits, setNextCommits } from '../redux/actions';

// 3rd lib
import Axios from 'axios';

class PageCommits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prevPage: 0,
            currentPage: 1,
            nextPage: 2
        }
    }

    // fetchCommits(token, urlParams, reduxAction) {
    //     Axios.get(
    //     `https://api.github.com/repos/${this.state.repositoryName}/commits${urlParams}`,
    //     {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/vnd.github.v3+json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //     .then(res => {
    //         console.log(res, res.data);
    //         this.props[reduxAction](res.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }

    // async onSubmit() {
    //     const token = await AsyncStorage.getItem('token');
    //     this.fetchCommits(token, '?page=1&per_page=10', 'setCommits');
    //     this.fetchCommits(token, '?page=2&per_page=10', 'setNextCommits');
    // }
    componentDidMount() {
        console.log(this.props.reduxState);
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Text style={{ marginVertical: 20 }}>
                        Commit History
                    </Text>
                    {this.props.reduxState.commits.map((commit, index) => 
                        <ListItem avatar key={index}>
                            <Left>
                                <Thumbnail source={{ uri: commit.author.avatar_url }} />
                            </Left>
                            <Body>
                                <Text>{commit.author.login}</Text>
                                <Text note>{commit.commit.message}</Text>
                            </Body>
                            <Right>
                                <Text note>{new Date(commit.commit.author.date).toLocaleDateString()}</Text>
                                <Text note>{new Date(commit.commit.author.date).toLocaleTimeString()}</Text>
                            </Right>
                      </ListItem>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(PageCommits);