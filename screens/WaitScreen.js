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

                        }}
                    />
                </View>
            );
        } else {
            console.log("user ready");
            this.userService.getUser().then((user) => {
                user.isReady = true;
                this.userService.setUser(user);
                confirmReady((response) => {
                    if (response.isEverybodyReady) {
                        this.props.navigation.navigate("Question", {question: response.question});
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
        backgroundColor: '#F5FCFF'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 30,
        fontSize: 35
    }
});
