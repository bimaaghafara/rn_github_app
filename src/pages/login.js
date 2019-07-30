import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

// UI
import { Container, Content, Text, Item, Input, Label, Button, Icon } from 'native-base';

//navigation
import { Actions } from 'react-native-router-flux';

// redux
import { connect } from 'react-redux';
import { setUsername } from '../redux/actions';

class PageLogin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: ''
		}
	}

	onChangeUsername = (text) => {
		this.setState({ username: text })
	}

	onPressNext = () => {
		Actions.PagePassword();
		this.props.setUsername(this.state.username);
	}

	render() {
		return (
			<Container>
				<Content padder>
					<Text style={styles.messageText}>
						Please enter your github username and click next to continue!
					</Text>
					<Item stackedLabel>
						<Label>Username</Label>
						<Input onChange={this.onChangeUsername} />
					</Item>
					<Button
						iconRight
						style={styles.nextButton}
						disabled={!this.state.username}
						onPress={this.onPressNext}>
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
		setUsername: (payload) => dispatch(
			setUsername(payload)
		)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);

const styles = StyleSheet.create({
	messageText: { marginVertical: 20 },
	nextButton: { alignSelf: 'center', margin: 30 }
});