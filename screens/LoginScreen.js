import React from "react";

import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import BaseScreen from "./BaseScreen";
import { Ionicons } from '@expo/vector-icons';
import { Button, ButtonGroup } from 'react-native-elements';
import { getSocket, getUser, seconnecte, send, setNavigation } from "../services/WebsocketService";
import Colors from "../constants/Colors";
import MainTitle from "../components/title/MainTitleComponent";
import Text from "react-native-elements/src/text/Text";


export default class LoginScreen extends BaseScreen {
    constructor() {
        super();
        this.state = {
            titleText: "Footboard",
            selectedIndex: 0,
            isEmptyPseudo: true
        };
        this.updateIndex = this.updateIndex.bind(this);
        this.isEmptyPseudo = this.isEmptyPseudo.bind(this);
        this.width = this.state.width;

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
            type: 'tablet',
            id: getUser().uuid,
            team: team.split(" ")[1]
        };
        send('login', obj);
    }

    render() {
        const buttons = ['Team A', 'Team B'];
        const {selectedIndex, isEmptyPseudo} = this.state;
        const {navigate} = this.props.navigation;
        getSocket().on('navigate', (url) => navigate(url));
        return (
            <View style={styles.topView}>
                <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>

                    <View style={styles.form}>

                        <MainTitle title={"Bienvenue sur FootBoard !"}/>
                        <Text style={{ marginBottom: 20, textAlign: "center"}}>Veuillez choisir une team et entrer votre pseudo.</Text>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={selectedIndex}
                            buttons={buttons}
                            containerStyle={{width: 300, height: 60}}
                        />
                        <TextInput
                            style={styles.loginInput}
                            onChangeText={(text) => {
                                this.isEmptyPseudo(false);


                                if (text === "") {
                                    this.isEmptyPseudo(true);
                                }
                            }}
                            value={this.state.text}
                            placeholder={"Pseudo"}
                            onEndEditing={this.clearFocus}
                        />
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title='Se connecter'

                            iconRight
                            onPress={() => {
                                this.connecte(buttons[this.state.selectedIndex], this.state.text);
                                //this.getImage();
                                //navigate('QuestionCollectif');
                            }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }

    isEmptyPseudo(isEmpty) {
        this.setState({isEmpty});
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontSize: 100,
        flex: 1
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    topView: {
        flex: 1,
        backgroundColor: Colors.DARK_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardAvoidingView: {
        flex: 1,
        width: this.width / 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderColor: '#eee',
        borderRadius: 5,
        borderWidth:1,

    },
    inputView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    buttonStyle: {
        padding: 5,
        borderRadius: 100,
    },
    loginInput: {
        marginTop: 15,
        marginBottom: 15,
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 20,
        padding: 5,
        width: this.width / 6
    }
});
