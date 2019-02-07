import React from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import HeaderComponent from "../components/HeaderComponent";
import { Button } from 'react-native-elements';
import BaseScreen from "./BaseScreen";
import { confirmReady, getSimpleQuestion, retrieveQuestion, send } from "../services/WebsocketService";
import Colors from "../constants/Colors";

export default class WaitScreen extends BaseScreen {

    static navigationOptions = {
        title: 'Welcome',
        header: (
            <HeaderComponent pseudo={this.pseudo}/>
        ),
    };

    constructor(props) {
        super(props);
        // this.gameService.setIsInGame(false);
    }


    render() {
        const {isUserReady} = this.state;

        if (!isUserReady) {
            return (
                <View style={styles.container}>
                    <Text style={styles.instructions}>Êtes-vous prêt(e) à jouer ?</Text>

                    <Button
                        buttonStyle={{
                            backgroundColor: Colors.WHITE,
                            width: 200,
                            padding: 20,
                            borderRadius: 5,
                        }}
                        title="C'est partit !"
                        titleStyle={{
                            color: Colors.DARK_BLUE,
                            fontSize: 20
                        }}

                        iconRight
                        onPress={() => {
                            this.setState({isUserReady: true});

                            send("ready", {
                                isReady: true,
                            });
                        }}
                    />
                </View>
            );
        } else {
            getSimpleQuestion((response) => {
                if (response.isEverybodyReady) {
                    this.props.navigation.navigate("Question", {
                        questionCounter: response.questionCounter,
                        question: response.question,
                        maxTimer: response.maxTimer
                    })
                }
            });

            return (
                <View style={styles.container}>
                    <Text style={styles.instructions}>Veuillez attendre que tout le monde soit prêt.</Text>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DARK_BLUE
    },
    instructions: {
        textAlign: 'center',
        color: "#fff",
        marginBottom: 30,
        fontSize: 35
    }
});
