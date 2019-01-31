import React from "react";

import { Dimensions, Text, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import BaseScreen from "./BaseScreen";
import { Ionicons } from '@expo/vector-icons';
import { ButtonGroup, Button } from 'react-native-elements';
import { initParty, login } from "../services/WebsocketService";
import { Keyboard } from 'react-native';
import MainTitle from "../components/title/MainTitleComponent";
import { User } from "../model/user";
import UserService from "../services/UserService";
import { channels } from "../model/channels";

export default class LoginScreen extends BaseScreen {

    static navigationOptions = {
        title: 'Welcome',
        header: null,
        left: null,
    };

    constructor() {
        super();
        this.state = {
            titleText: "Footboard",
            logged: "",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            selectedIndex: 0,
            isEmptyPseudo: true
        };
        this.updateIndex = this.updateIndex.bind(this);
        this.isEmptyPseudo = this.isEmptyPseudo.bind(this);
    }

    render() {
        initParty((game) => {
            console.log("init party");
            console.log(game);
            this.setState({game: game})
        });

        const {game} = this.state;


        if (game === undefined) {
            return (
                <View style={styles.topView}>
                    <Text>Loading...</Text>
                </View>
            );

        } else {
            const buttons = [game.teams[0].name, game.teams[1].name];
            const {selectedIndex, isUserAdd, isEmptyPseudo} = this.state;

            const errorLoginMessage = "Erreur, la team est pleine";

            return (
                <View style={styles.topView}>

                    <MainTitle title={"Bienvenue sur FootBoard !"}/>

                    <Text>Veuillez choisir une team et entrer votre pseudo.</Text>

                    <KeyboardAvoidingView behavior="padding" style={{flex: 1, width: this.state.width / 6}}>

                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={selectedIndex}
                            buttons={buttons}
                            containerStyle={{height: 100}}
                            style={styles.teamsButtons}
                        />

                        <TextInput
                            style={styles.inputText}
                            onChangeText={(pseudo) => {
                                this.setState({isEmptyPseudo: false});
                                this.setState({pseudo});

                                if (pseudo === "") {
                                    this.isEmptyPseudo(true);
                                }
                            }}
                            value={this.state.text}
                            placeholder={"Pseudo"}
                            onEndEditing={this.clearFocus}
                        />
                        <Button
                            buttonStyle={styles.sendButton}
                            title='Commencer la partie !'
                            icon={
                                <Ionicons name="md-arrow-forward" size={32} color="white" style={styles.icon}/>
                            }
                            disabled={isEmptyPseudo}
                            iconRight
                            onPress={() => {
                                this.pseudo = this.state.pseudo;
                                this.team = buttons[this.state.selectedIndex];
                                this.login(this.team, this.pseudo);
                            }}
                        />
                    </KeyboardAvoidingView>





                </View>
            );
        }
    }

    login(team, pseudo) {
        const user = new User();
        user.pseudo = pseudo;
        user.team = team;
        this.userService.setUser(user);

        login((isUserAdd) => {
            console.log(isUserAdd);
            this.setState({isUserAdd: isUserAdd});
            this.props.navigation.navigate("Wait")
        }, user);

        Keyboard.dismiss();
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
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
        backgroundColor: 'powderblue',
        alignItems: 'center'
    },
    inputView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    inputText: {
        height: 80,
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 40
    },
    icon: {
        paddingLeft: 15,
    },
    teamsButtons: {},
    sendButton: {
        padding: 10,
        marginTop: 10
    }
});
