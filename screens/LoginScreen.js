import React from "react";

import { ImageBackground, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import BaseScreen from "./BaseScreen";
import { Ionicons } from '@expo/vector-icons';
import { Button, ButtonGroup } from 'react-native-elements';
import { getSocket, getUser, seconnecte, send } from "../services/WebsocketService";
import Colors from "../constants/Colors";
import MainTitle from "../components/title/MainTitleComponent";
import Text from "react-native-elements/src/text/Text";
import { userLevelsChoices } from "../model/user-levels";
import SubTitleComponent from "../components/title/SubTitleComponent";


export default class LoginScreen extends BaseScreen {
    constructor() {
        super();
        this.state = {
            titleText: "Footboard",
            selectedIndex: 0,
            isEmptyPseudo: true,
            userLevel: 1,
        };
        this.updateIndex = this.updateIndex.bind(this);
        this.isEmptyPseudo = this.isEmptyPseudo.bind(this);
        this.width = this.state.width;
    }

    handler(message) {
        if (message.status === 1) {
            this.props.navigation.navigate('Home');
        }
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {
        const buttons = ['Rouge', 'Bleu'];
        const {selectedIndex, isEmptyPseudo, userLevel} = this.state;
        const {navigate} = this.props.navigation;
        getSocket().on('navigate', (url) => navigate(url.data));
        return (
            <View style={styles.topView}>
                <ImageBackground
                    resizeMode={'cover'}
                    style={{flex: 1, width: "100%", height: "100%"}}
                    source={require('../assets/bg_foot.jpg')}>
                    <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>

                        <View style={styles.form}>

                            <MainTitle title={"Bienvenue sur FootBoard !"}/>
                            <Text style={{ marginBottom: 20, textAlign: "center"}}>Veuillez choisir une team et entrer votre pseudo.</Text>

                            <SubTitleComponent title={"Équipe"} />
                            <ButtonGroup
                                onPress={this.updateIndex}
                                selectedIndex={selectedIndex}
                                buttons={buttons}
                                containerStyle={{width: 330, height: 50, marginBottom: 20,}}
                                selectedButtonStyle={{backgroundColor: Colors.DARK_GREEN}}
                            />

                            <SubTitleComponent title={"Votre niveau en foot"} />
                            <ButtonGroup
                                onPress={(level) => {
                                    this.setState({userLevel: level})
                                }}
                                selectedIndex={userLevel}
                                buttons={userLevelsChoices}
                                containerStyle={{width: 330, height: 50}}
                                selectedButtonStyle={{backgroundColor: Colors.DARK_GREEN}}
                            />
                            <TextInput
                                style={styles.loginInput}
                                onChangeText={(text) => {
                                    this.isEmptyPseudo(false);
                                    this.setState({text});

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
                                titleStyle={styles.buttonTextMenu}
                                title='Se connecter'
                                disabled={this.state.isEmptyPseudo === true}
                                iconRight
                                onPress={() => {
                                    this.simpleAsyncStorageService.set('pseudo', this.state.text);
                                    this.simpleAsyncStorageService.set('team', buttons[this.state.selectedIndex]);
                                    this.simpleAsyncStorageService.set('playerLevel', userLevelsChoices[this.state.userLevel]);
                                    this.simpleAsyncStorageService.set('team', buttons[this.state.selectedIndex]);
                                    const infos = {
                                        team: buttons[this.state.selectedIndex],
                                        pseudo: this.state.text,
                                        userLevel: userLevelsChoices[this.state.userLevel]
                                    };
                                    this.connecte(infos);
                                }}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }


    connecte(infos) {
        getUser().pseudo = infos.pseudo;
        getUser().team = infos.team;
        let obj = {
            team: infos.team,
            pseudo: infos.pseudo,
            userLevel: infos.userLevel
        };

        send('login', obj);
    }

    isEmptyPseudo(isEmpty) {
        this.setState({isEmptyPseudo: isEmpty});
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
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
        backgroundColor: Colors.DARK_GREEN,
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
        borderRadius: 100,
        height: 50,
        backgroundColor: Colors.DARK_GREEN
    },
    buttonTextMenu: {
        fontWeight: "bold",
        color: Colors.WHITE,
        padding: 15,
        fontSize: 18
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
