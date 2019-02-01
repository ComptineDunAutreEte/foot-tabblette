import React from "react";
import { StyleSheet, View } from 'react-native';
import BaseScreen from "./BaseScreen";
import { getSocket, reset } from "../services/WebsocketService";
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { send, setNavigation } from "../services/WebsocketService";
import { categories } from "../model/categories";
import { levels } from "../model/levels";
import HeaderComponent from "../components/HeaderComponent";

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