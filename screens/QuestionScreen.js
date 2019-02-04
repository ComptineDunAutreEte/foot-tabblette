import React from "react";
import BaseScreen from "./BaseScreen";
import {StyleSheet, Text, View } from 'react-native';
import HeaderComponent from "../components/HeaderComponent";
import SubTitleComponent from "../components/title/SubTitleComponent";
import MainTitle from "../components/title/MainTitleComponent";
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";
import { getSimpleQuestion, getSimpleQuestionResponse, send } from "../services/WebsocketService";

export default class QuestionScreen extends BaseScreen {

    static navigationOptions = {
        title: 'Welcome',
        header: (
            <HeaderComponent pseudo={this.pseudo} />
        ),
    };

    constructor(props) {
        super(props);

        // this.gameService.setIsInGame(true);

        this.state = {
            selectedResponse: null,
        };

        const { navigation } = this.props;
        this.question = navigation.getParam('question');
        console.log("question", this.question);
    }


    render() {
        const { state } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.stats}>
                    <SubTitleComponent title={"Statistiques de la partie"} />
                    <Text>Stats</Text>
                </View>
                <View style={styles.main}>
                    <View style={{alignItems: 'center'}}>
                        <MainTitle title={"Question 1"} />
                        <SubTitleComponent title={this.question.question}/>
                    </View>

                    <View style={styles.blocResponse}>
                        {
                            this.question.responses.map((response) => {
                                return (
                                    <Button key={response.id} buttonStyle={this.state.selectedResponse === response.id ? styles.buttonPressed : styles.buttonResponse}
                                            onPress={() => {
                                                this.setState({selectedResponse: response.id})
                                            }}
                                            title={response.response}
                                            titleStyle={this.state.selectedResponse === response.id ? styles.buttonTextPressed : styles.buttonTextResponse}/>
                                );
                            })
                        }
                    </View>

                    <View style={styles.blocValidate}>
                        <Button buttonStyle={styles.buttonValidate}
                                disabled={this.state.selectedResponse === null}
                                title={"Valider votre réponse"}
                        onPress={() => {
                            console.log(this.question.id);

                            console.log(this.state.selectedResponse);

                            const data = {
                                questionId: this.question.id,
                                userResponse: this.state.selectedResponse
                            };

                            send("ask-simple-question", data);

                            getSimpleQuestionResponse((response) => {
                                console.log("response", response);
                            })
                        }} />
                    </View>
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.DARK_BLUE,
        padding: 15,
        flexDirection: 'row',
        flex: 1,
    },
    stats: {
        width: 250,
        padding: 15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.DARK_GREY,
        backgroundColor: Colors.WHITE
    },
    main: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.DARK_GREY,
        backgroundColor: Colors.WHITE,
        padding: 15
    },
    blocResponse: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
    },
    buttonResponse: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.MEDIUM_BLUE,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 20,
        width: 250,
    },
    buttonTextResponse: {
        color: Colors.DARK_BLUE,
        fontSize: 25,
    },
    buttonPressed: {
        backgroundColor: Colors.MEDIUM_BLUE,
        paddingLeft: 20,
        borderColor: Colors.MEDIUM_BLUE,
        borderWidth: 1,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 20,
        width: 250,
    },
    buttonTextPressed: {
        fontSize: 25,
        color: Colors.WHITE,
    },
    blocValidate: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignContent: 'center',
        marginTop: 20
    },
    buttonValidate: {
        backgroundColor: Colors.MEDIUM_GREEN,
        padding: 10
    }
});

