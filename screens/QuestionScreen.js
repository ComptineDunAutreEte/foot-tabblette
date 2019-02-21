import React from "react";
import BaseScreen from "./BaseScreen";
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
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
            <HeaderComponent pseudo={this.pseudo}/>
        ),
    };

    constructor(props) {
        super(props);

        const {navigation} = this.props;
        this.question = navigation.getParam('question');
        this.questionCounter = navigation.getParam('questionCounter');
        this.maxTimer = navigation.getParam('maxTimer');
        this.history = navigation.getParam('history');
        console.log(this.history);

        this.state = {
            selectedResponse: null,
            timer: this.maxTimer,
            isQuestionSent: false,
            percentage: 100
        };
    }

    componentDidMount() {
        const intervalTimer = 100;
        const intervalRatio = (1000 / intervalTimer);
        const virtualMaxTimer = this.maxTimer * intervalRatio;
        let virtualTimer = virtualMaxTimer;

        this.interval = setInterval(() => {
            virtualTimer--;
            const barPercentage = virtualTimer * 100 / virtualMaxTimer;
            const realTimer = Math.round(virtualTimer / intervalRatio * 10) / 10;
            this.setState({timer: realTimer});
            this.setState({percentage: barPercentage});
        }, intervalTimer);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        const {state} = this.props.navigation;

        const userDatas = {
            questionId: this.question.id,
            userResponse: this.state.selectedResponse,
            userResponseTime: this.maxTimer - this.state.timer
        };

        if (this.state.timer === 0 && this.state.isQuestionSent === false) {
            clearInterval(this.interval);
            this.sendResponse(userDatas)
        }

        return (
            <View style={styles.container}>
                <ImageBackground
                    resizeMode={'cover'}
                    style={{width: "100%", height: "100%", flexDirection: 'row', padding: 20}}
                    source={require('../assets/bg_foot.jpg')}>
                    <View style={styles.stats}>
                        <SubTitleComponent title={"Statistiques de la partie"}/>
                        <Text>Stats</Text>
                    </View>
                    <View style={styles.main}>
                        <View style={{alignItems: 'center'}}>
                            <MainTitle title={"Question " + this.questionCounter}/>
                            <SubTitleComponent title={this.question.question}/>
                        </View>

                        <View style={styles.blocResponse}>
                            {
                                this.question.responses.map((response) => {
                                    return (
                                        <Button key={response.id}
                                                buttonStyle={this.state.selectedResponse === response.id ? styles.buttonPressed : styles.buttonResponse}
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
                                    disabled={this.state.selectedResponse === null || this.state.isQuestionSent === true}
                                    title={"Valider votre réponse"}
                                    onPress={() => {
                                        clearInterval(this.interval);
                                        this.setState({isQuestionSent: true});
                                        console.log(userDatas);
                                        this.sendResponse(userDatas);
                                    }}/>
                        </View>

                        <View style={styles.timerBg}>
                            <View style={{position: "absolute", zIndex: 11, padding: 10}}>
                                <Text style={{color: "#fff", fontSize: 20}}>Temps restant : {this.state.timer}</Text>
                            </View>
                            <View style={{
                                height: 38,
                                position: "absolute",
                                zIndex: 10,
                                backgroundColor: Colors.DARK_GREEN,
                                width: `${this.state.percentage}%`,
                                borderRadius: 10,
                            }}>
                                <Text style={{color: Colors.DARK_GREEN}}>.</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    sendResponse(data) {
        console.log("ask simple question");
        send("ask-simple-question", data);

        getSimpleQuestionResponse((response) => {
            this.props.navigation.navigate("ResponseSimpleQuestion", {
                isCorrectPlayerResponse: response.isCorrectPlayerResponse
            });
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARK_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
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
        borderColor: Colors.MEDIUM_GREEN,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 20,
        width: 250,
    },
    buttonTextResponse: {
        color: Colors.DARK_GREEN,
        fontSize: 25,
    },
    buttonPressed: {
        backgroundColor: Colors.MEDIUM_GREEN,
        paddingLeft: 20,
        borderColor: Colors.MEDIUM_GREEN,
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
    },
    timerBg: {
        width: 400,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: Colors.LIGHT_GREEN,
        borderRadius: 10,
        borderColor: Colors.DARK_GREEN,
        borderWidth: 1,
        marginTop: 30,
        height: 40,
    },
});

