import React from "react";

import {KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native';
import BaseScreen from "./BaseScreen";
import {Ionicons} from '@expo/vector-icons';
import {Button, ButtonGroup} from 'react-native-elements';
import {getSocket, getUser, seconnecte, send, setNavigation} from "../services/WebsocketService";


export default class LoginScreen extends BaseScreen {
    constructor() {
        super();
        this.state = {
            titleText: "Footboard",
            selectedIndex: 0,
        };
        this.updateIndex = this.updateIndex.bind(this);

        getSocket().on('login', message => this.handler(message));

    }

    handler(message) {

        if (message.status === 1) {
            //this.props.navigation.navigate('Home');
        }
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    connecte(team, pseudo) {
        getUser().pseudo = pseudo;
        let obj = {
            type:'tablet',
            id: getUser().uuid,
            team: team.split(" ")[1]
        };
        send('login', obj);
    }

    render() {
        const buttons = ['Team A', 'Team B'];
        const {selectedIndex} = this.state;
        const { navigate } = this.props.navigation;
        getSocket().on('navigate',(url)=>navigate(url));
        return (
            <View style={styles.topView}>
                <KeyboardAvoidingView behavior="padding" style={{flex: 1, width: this.state.width / 6}}>

                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 100}}
                    />
                    <TextInput
                        style={{
                            height: 80,
                            marginTop: 5,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            fontSize: 40
                        }}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder={"Pseudo"}
                        onEndEditing={this.clearFocus}
                    />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        title='Loggin'
                        icon={
                            <Ionicons name="md-arrow-forward" size={32} color="white"/>
                        }
                        iconRight
                        onPress={() => {
                            this.connecte(buttons[this.state.selectedIndex], this.state.text);
                            //this.getImage();
                            //navigate('QuestionCollectif');
                        }}
                    />
                </KeyboardAvoidingView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
        fontSize: 100,
        flex: 1
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    topView: {
        flex: 1,
        backgroundColor: 'powderblue',
        alignItems: 'center'
    },
    inputView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    buttonStyle: {
        height: 80,
        marginTop: 10
    }
});

