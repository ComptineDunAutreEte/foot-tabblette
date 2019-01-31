import React from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import HeaderComponent from "../components/HeaderComponent";
import { Button } from 'react-native-elements';
import BaseScreen from "./BaseScreen";
import { confirmReady, retrieveQuestion } from "../services/WebsocketService";

export default class WaitScreen extends BaseScreen {

    static navigationOptions = {
        title: 'Welcome',
        header: (
            <HeaderComponent pseudo={this.pseudo}/>
        ),
    };

    constructor(props) {
        super(props);
        this.gameService.setIsInGame(false);
    }


    render() {
        const {isUserReady} = this.state;

        if (!isUserReady) {
            return (
                <View style={styles.container}>
                    <Text style={styles.instructions}>Êtes-vous prêt(e) à jouer ?</Text>

                    <Button
                        buttonStyle={{
                            height: 80,
                            marginTop: 10
                        }}
                        title="C'est partit !"
                        iconRight
                        onPress={() => {
                            this.setState({isUserReady: true});

                            // TODO à virer en implémentant avec le serveur
                            this.props.navigation.navigate("Question", {
                                question: {
                                    category: categories.cultureG,
                                    type: "",
                                    difficulty: levels.easy,
                                    question: "Quelles sont les dimentions des cages ?",
                                    illustration: null,
                                    responses: [
                                        {
                                            id: 1,
                                            response: "Largeur : 7,32m Hauteur : 2,44m",
                                            isValid: true,
                                            time: null
                                        },
                                        {
                                            id: 2,
                                            response: "Largeur : 7m Hauteur : 2,5m",
                                            isValid: true,
                                            time: null
                                        },
                                        {
                                            id: 3,
                                            response: "Largeur : 7,51m Hauteur : 2,32m",
                                            isValid: false,
                                            time: null
                                        },
                                        {
                                            id: 4,
                                            response: "Largeur : 7,83m Hauteur : 2,6m",
                                            isValid: false,
                                            time: null
                                        },
                                    ]
                                }
                            });
                        }}
                    />
                </View>
            );
        } else {
            console.log("user ready");
            /*this.userService.getUser().then((user) => {
                user.isReady = true;
                this.userService.setUser(user);
                confirmReady((response) => {
                    if (response.isEverybodyReady) {
                        // this.props.navigation.navigate("Question", {question: response.question});
                        this.props.navigation.navigate("Question", {
                                question: {
                                    category: categories.cultureG,
                                    type: "",
                                    difficulty: levels.easy,
                                    question: "Quelles sont les dimentions des cages ?",
                                    illustration: null,
                                    responses: [
                                        {
                                            id: 1,
                                            response: "Largeur : 7,32m Hauteur : 2,44m",
                                            isValid: true,
                                            time: null
                                        },
                                        {
                                            id: 2,
                                            response: "Largeur : 7m Hauteur : 2,5m",
                                            isValid: true,
                                            time: null
                                        },
                                        {
                                            id: 3,
                                            response: "Largeur : 7,51m Hauteur : 2,32m",
                                            isValid: false,
                                            time: null
                                        },
                                        {
                                            id: 4,
                                            response: "Largeur : 7,83m Hauteur : 2,6m",
                                            isValid: false,
                                            time: null
                                        },
                                    ]
                                }
                            });
                    }
                }, user);
            }).catch((error) => {
                // TODO Implement
            });


            return (
                <View style={styles.container}>
                    <Text style={styles.instructions}>Veuillez attendre que tout le monde soit prêt.</Text>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );*/
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
        backgroundColor: '#F5FCFF'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 30,
        fontSize: 35
    }
});
