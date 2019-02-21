import React from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import HeaderComponent from "../components/HeaderComponent";
import { Button } from 'react-native-elements';
import BaseScreen from "./BaseScreen";
import { confirmReady, getSimpleQuestion, reset, retrieveQuestion, send } from "../services/WebsocketService";
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
                    <ImageBackground
                        resizeMode={'cover'}
                        style={{flex: 1, width: "100%", height: "100%"}}
                        source={require('../assets/bg_foot.jpg')}>

                        <View style={styles.contentView}>
                            <View style={styles.form}>
                                <Text style={styles.text}>Êtes-vous prêt(e) à jouer ?</Text>

                                <Button
                                    buttonStyle={styles.buttonStyle}
                                    title="C'est parti !"
                                    titleStyle={{
                                        color: Colors.WHITE,
                                        fontSize: 30
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
                        </View>
                    </ImageBackground>
                </View>
            );
        } else {
            getSimpleQuestion((response) => {
                if (response.isEverybodyReady) {
                    this.props.navigation.navigate("Question", {
                        questionCounter: response.questionCounter,
                        question: response.question,
                        maxTimer: response.maxTimer,
                        history: response.history
                    })
                }
            });

            return (

                <View style={styles.container}>
                    <ImageBackground
                        resizeMode={'cover'}
                        style={{flex: 1, width: "100%", height: "100%"}}
                        source={require('../assets/bg_foot.jpg')}>

                        <View style={styles.contentView}>
                            <View style={styles.form}>
                                <Text style={styles.text}>Veuillez attendre que tout le monde soit prêt.</Text>

                                <ActivityIndicator size="large" color="#0000ff"/>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    instructions: {
        textAlign: 'center',
        color: "#fff",
        marginBottom: 30,
        fontSize: 35
    },
    container: {
        flex: 1,
        backgroundColor: Colors.DARK_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentView: {
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
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        marginBottom: 30,
        color: Colors.DARK_GREEN
    },
    buttonStyle: {
        height: 50,
        width: 300,
        backgroundColor: Colors.DARK_GREEN,
    }
});
