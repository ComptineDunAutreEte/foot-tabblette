import React from "react";
import {StyleSheet, View} from 'react-native';
import BaseScreen from "./BaseScreen";
import {getSocket, reset} from "../services/WebsocketService";
import {Ionicons} from '@expo/vector-icons';
import {Button} from 'react-native-elements';
import {send, setNavigation} from "../services/WebsocketService";

export class HomeScreen extends BaseScreen {
    constructor(props) {
        super();
    }

    render() {
        const { navigate } = this.props.navigation;
        getSocket().on('navigate',(url)=>navigate(url));
        return (

            <View style={styles.container}>
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
                        send('question-collectif-request-v2', 'request');
                        //navigate('QuestionCollectifV2');
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
                <Button buttonStyle={styles.buttonStyle} title={"Dashboard"} onPress={() => {
                    this.props.navigation.navigate("Dashboard")
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'powderblue',
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