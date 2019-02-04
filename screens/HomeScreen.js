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

export class HomeScreen extends BaseScreen {

    static navigationOptions = {
        title: 'Welcome',
        header: (
            <HeaderComponent pseudo={this.pseudo} />
        ),
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        // getSocket().on('navigate', (url) => navigate(url));

        waitingScreen((response) => {

            if (response.isReady === true) {
                console.log("ready");
                navigate("Wait");
            }

        });

        return (
            <View style={styles.container}>

                <Text>Attendez</Text>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30
    },
    buttonStyle: {
        height: 80,
        width: 200,
        marginTop: 10
    }
});