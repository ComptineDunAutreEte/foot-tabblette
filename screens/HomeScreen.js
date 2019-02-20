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

        getSocket().on('navigate', (url) => navigate(url));

        waitingScreen((response) => {

            if (response.isReady === true) {
                console.log("ready");
                navigate("Wait");
            }

        });

        return (
            <View style={styles.container}>
                <Text style={styles.text}>En attente d'instructions de la table</Text>

                <Button
                    buttonStyle={styles.buttonStyle}
                    title='Reset Server'
                    iconRight
                    onPress={() => {
                        reset();
                    }}
                />
                <Button
                    buttonStyle={styles.buttonStyle}
                    title='Question collectif v2'
                    iconRight
                    onPress={() => {
                        //send('question-collectif-request-v2', 'request');
                        navigate('QuestionCollectifV2');
                    }}
                />

                <Button
                    buttonStyle={styles.buttonStyle}
                    title='Question collectif (parralèle)'
                    iconRight
                    onPress={() => {
                        //send('question-collectif-request-v2', 'request');
                        navigate('QuestionCollectifParrallel');
                    }}
                />


                <Button
                    buttonStyle={styles.buttonStyle}
                    title='QuestionCollectif'
                    iconRight
                    onPress={() => {
                        send('question-collectif-request', 'request');
                        //navigate('QuestionCollectif');
                    }}
                />

                <Button buttonStyle={styles.buttonStyle} title={"Question simple"} onPress={() => {
                    navigate("Wait");
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARK_BLUE,
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
    }
});