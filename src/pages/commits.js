import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// UI
import { Container, Content, Text, ListItem, Left, Thumbnail, Body, Right, View, Button, Icon } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setPrevCommits, setCommits, setNextCommits, showLoader } from '../redux/actions';

// 3rd lib
import Axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

class PageCommits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prevPage: 0,
            currentPage: 1,
            nextPage: 2
        }
    }

    async fetchCommits(token, urlParams, reduxAction) {
        Axios.get(
        `https://api.github.com/repos/facebook/react-native/commits${urlParams}`,
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

    async fetchPaginatedCommits() {
        const token = await AsyncStorage.getItem('token');
        await this.fetchCommits(token, `?page=${this.state.currentPage}&per_page=10`, 'setCommits');
        await this.fetchCommits(token, `?page=${this.state.currentPage-1}&per_page=10`, 'sePrevtCommits');
        await this.fetchCommits(token, `?page=${this.state.currentPage+1}&per_page=10`, 'setNextCommits');
    }

    async onClickNewer() {
        await this.setState({currentPage: this.state.currentPage-1});
        await this.fetchPaginatedCommits();
        console.log(this.props.reduxState);
    }

    async onClickOlder() {
        await this.setState({currentPage: this.state.currentPage+1});
        await this.fetchPaginatedCommits();
        console.log(this.props.reduxState);
    }

    componentDidMount() {
        console.log(this.props.reduxState);
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
                    
					<View style={{flexDirection:'row', justifyContent:'center', margin:20}}>
						<Button
                            // disabled={this.state.reduxState.prevCommits}
                            style={{margin: 5}} iconLeft
                            onPress={() => {this.onClickNewer()}}
                        >
							<Icon name='arrow-back'/>
							<Text>Newer</Text>
						</Button>
						<Button
                            // disabled={this.state.reduxState.nextCommits}
                            style={{margin: 5}} iconRight
                            onPress={() => {this.onClickOlder()}}
                        >
							<Text>Older</Text>
							<Icon name='arrow-forward'/>
						</Button>
					</View>
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
        setPrevCommits: (payload) => dispatch(setPrevCommits(payload)),
        setCommits: (payload) => dispatch(setCommits(payload)),
        setNextCommits: (payload) => dispatch(setNextCommits(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageCommits);