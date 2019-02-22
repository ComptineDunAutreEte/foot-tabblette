import React from "react";
import BaseScreen from "./BaseScreen";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderComponent from "../components/HeaderComponent";
import SubTitleComponent from "../components/title/SubTitleComponent";
import MainTitle from "../components/title/MainTitleComponent";
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";
import { getSimpleQuestionResponse, send } from "../services/WebsocketService";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { faTimes } from "@fortawesome/free-solid-svg-icons/index";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CategoryDetailComponent from "../components/dashboard/CategoryDetailComponent";
import { categories } from "../model/categories";

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

        this.state = {
            selectedResponse: null,
            timer: this.maxTimer,
            isQuestionSent: false,
            percentage: 100
        };

        this.questionCategory = categories.find((c) => c.key === this.question.category);
    }

    componentDidMount() {
        const intervalTimer = 100;
        const intervalRatio = (1000 / intervalTimer);
        const virtualMaxTimer = this.maxTimer * intervalRatio;
        let virtualTimer = virtualMaxTimer;
        console.log("componentDidMount")

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

        if (!this.question) {
            setTimeout(() => {
                this.props.navigation.navigate("Home");
            }, 5000);

            return (
                <View style={styles.container}>
                    <ImageBackground
                        resizeMode={'cover'}
                        style={{flex: 1, width: "100%", height: "100%"}}
                        source={require('../assets/bg_foot.jpg')}>

                        <View style={styles.contentView}>
                            <View style={styles.form}>
                                <Text style={styles.text}>Aucune question n'a été envoyé. Vous allez être redirigé vers la page d'accueiil.</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            )
        } else {
            const userDatas = {
                questionId: this.question.id,
                userResponse: this.state.selectedResponse,
                userResponseTime: this.maxTimer - this.state.timer
            };

            if (this.state.timer === 0) {
                console.log("itimer terminé");
                clearInterval(this.interval);

                if (this.state.isQuestionSent === false) {
                    console.log("envoi de la réponse");
                    this.sendResponse(userDatas);
                    this.setState({isQuestionSent: true});
                }
            }

            return (
                <View style={styles.container}>
                    <ImageBackground
                        resizeMode={'cover'}
                        style={{width: "100%", height: "100%", flexDirection: 'row', padding: 20}}
                        source={require('../assets/bg_foot.jpg')}>
                        <View style={styles.stats}>
                            <SubTitleComponent title={"Statistiques de la partie"}/>
                            <ScrollView>
                                {
                                    (this.history.length > 0) ? (
                                        this.history.map((h) => {
                                            return (
                                                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#ddd", paddingBottom: 15, marginBottom: 15}}>
                                                    {this.displayIcon(h)}<Text style={{fontSize: 18}}>Question {h.questionNumber}</Text>
                                                </View>
                                            );
                                        })
                                    ): <Text>Il n'y a pas encore d'historique de questions.</Text>
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.main}>
                            <View style={{alignItems: 'center'}}>
                                <MainTitle title={"Question " + this.questionCounter}/>
                                <Text style={{fontSize: 25, color: this.questionCategory.color, fontWeight: "bold", marginBottom: 20, marginTop: 20}}>Catégorie : {this.questionCategory.key}</Text>

                                <MainTitle title={this.question.question}/>
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
    }

    displayIcon(question) {
        if (question.userResponseId === null) {
            return (<FontAwesomeIcon icon={faQuestion} style={{color: "#e64a19", marginRight: 10}} size={20}/>);
        } else {
            if (question.isGoodResponse) {
                return (<FontAwesomeIcon icon={faCheck} style={{color: "#43a047", marginRight: 10}} size={20}/>);
            } else {
                return (<FontAwesomeIcon icon={faTimes} style={{color: "#e64a19", marginRight: 10}} size={20}/>);
            }
        }
    }

    sendResponse(data) {
        send("ask-simple-question", data);

        getSimpleQuestionResponse((response) => {
            console.log("yop");
            this.props.navigation.navigate("ResponseSimpleQuestion", {
                isCorrectPlayerResponse: response.isCorrectPlayerResponse,
                anecdote: this.question.anecdote
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

