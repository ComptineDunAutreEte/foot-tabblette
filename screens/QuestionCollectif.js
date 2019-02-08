import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getSocket, send} from "../services/WebsocketService";
import Dialog from "react-native-dialog";
import Overlay from 'react-native-modal-overlay';

const answer_template = {
    team: "Team_A",
    pseudo: "Alex",
    answer: {
        key: 'third_question_bb1',
        reponse: 'Il devrait se placer près du joueur A',
        id: 'bb',
        next: 'bb1a'
    }
};


export class QuestionCollectif extends Component {
    constructor() {
        super();
        this.state = {
            img: '',
            question: "Question",
            reponses: [],
            dialog_opened: false,
            reponse: {},
            answered: 'wait',//play, end,
            modalVisible: true,
            modalReady: false
        };
        //send('question-collectif-ready','');
        //send('questionn', '');
        getSocket().on('ready-screen-par' , (data) => {
            console.log('ready-screen');
            this.setState({modalReady: true});
            this.forceUpdate();
        });

        getSocket().on('wait-screen' , (data) => {
           // console.log('ready-screen');
            // this.setState({dialog_opened: true});
            //this.state.dialog_opened

            setTimeout(() => {this.setState({modalVisible: true});
                this.setState({modalVisible: true});
                this.setState({modalReady: false});
            }, 1000);

            this.forceUpdate();
            console.log('wait-screen');
        });

        getSocket().on('question-screen' , (data) => {
            console.log('question-screen');
            this.setState({modalVisible: false});
        });

        getSocket().on('question-collectif-img', (data) => {
            this.setState({img: data.data});
            console.log('question-collectif-img');
        });
        getSocket().on('question-collectif-par', (question) => {
            console.log('question-collectif-par', question);
            if (question !== null) {
                this.setState({question: question.question});
                this.setState({reponses: question.reponses});
                this.setState({answered: 'play'});
            }
            //alert(JSON.stringify(question));
        });
        /*getSocket().on('question-collectif-waiting', (message) => {
            this.setState({answered: 'wait'});
            //alert(JSON.stringify(question));
        })*/

    }

    onClose = () => this.setState({modalVisible: false});

    getView() {
        if (this.state.answered === 'end') {
            return <Text style={styles.text}>Vous avez repondu: {'\n' + this.state.reponse.reponse}</Text>
        } else if (this.state.answered === 'play') {
            return this.state.reponses.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.container}
                    onPress={() => {
                        this.setState({reponse: item});
                        this.setState({dialog_opened: true});
                        //this.setState({answered: 'end'});
                    }}>
                    {

                        index % 2 === 0 ? <Text adjustsFontSizeToFit={true} style={styles.text}>
                            {item.reponse}
                        </Text> : <Text adjustsFontSizeToFit={true} style={styles.text1}>
                            {item.reponse}
                        </Text>

                    }

                </TouchableOpacity>))
        } else {
            return <Text style={styles.text}>Attendez votre tour</Text>
        }
    }

    selection(item) {
        alert(item.reponse);
    }

    handleCancel = () => {
        this.setState({dialog_opened: false});
    };

    handleSoumettre = () => {
        //answer_template.answer = this.state.reponse;
        send('question-collectif-seq-answer', this.state.reponse);
        //getSocket().emit('question-collectif-answer', answer_template);
        this.setState({dialog_opened: false});
        this.setState({answered: 'end'});
    };

    getModalView() {
        if (!this.state.modalReady) {
            return <Text style={styles.wait_msg}>Regardez la table!</Text>;
        }
        return (<TouchableOpacity onPress={() => send('ready-seq','')} style={styles.asBut}>
            <Text style={styles.wait_msg}>Je suis prêt</Text>
        </TouchableOpacity>);
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Overlay visible={this.state.modalVisible}
                         animationType="zoomIn" containerStyle={{backgroundColor: 'white'}}
                         animationDuration={500}>
                    {this.getModalView()}
                </Overlay>
                <Dialog.Container visible={this.state.dialog_opened}>
                    <Dialog.Title>Vous avez répondu</Dialog.Title>
                    <Dialog.Description>
                        {this.state.reponse.reponse ? this.state.reponse.reponse : ''}
                    </Dialog.Description>
                    <Dialog.Button label="Soumettre la réponse" onPress={this.handleSoumettre}/>
                    <Dialog.Button label="Annuler" onPress={this.handleCancel}/>
                </Dialog.Container>
                <View style={styles.right}>
                    <View style={styles.blocQuestion}>
                        <Text style={styles.question}>
                            {this.state.question}
                        </Text>
                    </View>
                    <View style={styles.blocText}>
                        {
                            this.getView()
                        }
                    </View>

                </View>
                <View style={styles.left}>
                    <Image style={{
                        flex: 1
                    }} resizeMode="stretch" source={{uri: this.state.img}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    asBut: {
        backgroundColor: 'powderblue', padding: 50, borderRadius: 50, shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5
    },
    wait_msg: {fontSize: 150},
    right: {flex: 1, backgroundColor: 'powderblue'},
    left: {flex: 2, backgroundColor: 'skyblue'},
    blocText: {flex: 2},
    text: {textAlign: "center", fontSize: 30, backgroundColor: 'white'},
    text1: {textAlign: "center", fontSize: 30},
    blocQuestion: {flex: 1},
    question: {textAlign: "center", fontSize: 40}
});