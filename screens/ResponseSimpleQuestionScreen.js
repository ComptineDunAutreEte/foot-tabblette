import React from "react";
import { StyleSheet, View } from 'react-native';
import BaseScreen from "./BaseScreen";
import { getSocket, reset, waitingScreen } from "../services/WebsocketService";
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { send, setNavigation } from "../services/WebsocketService";
import { categories } from "../model/categories";
import { levels } from "../model/levels";
import HeaderComponent from "../components/HeaderComponent";
import Text from "react-native-elements/src/text/Text";
import Colors from "../constants/Colors";

export class ResponseSimpleQuestionScreen extends BaseScreen {

    static navigationOptions = {
        title: 'Welcome',
        header: (
            <HeaderComponent pseudo={this.pseudo} />
        ),
    };

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.isCorrectPlayerResponse = navigation.getParam('isCorrectPlayerResponse');
    }

    render() {
        let content;

        if (this.isCorrectPlayerResponse === true) {
            content = <Text style={{fontSize: 20, color: "green"}}>Vous avez bien répondu à la question ! Vous pourrez déplacer votre pion sur la table.</Text>
        } else {
            content = <Text style={{fontSize: 20, color: "red"}}>Vous n'avez pas bien répondu à la question ! Vous ne pourrez pas déplacer votre pion sur la table.</Text>
        }

        setTimeout(() => {
            this.props.navigation.navigate("Home");
        }, 4000);

        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    {content}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARK_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        color: "#fff"
    },
    buttonStyle: {
        height: 80,
        width: 200,
        marginTop: 10
    },
    main: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.DARK_GREY,
        backgroundColor: Colors.WHITE
    }
});