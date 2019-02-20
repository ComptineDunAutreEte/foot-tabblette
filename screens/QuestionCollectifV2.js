import React, {Component} from 'react';
import {Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getSocket, send} from "../services/WebsocketService";
import {ProgressDialog} from 'react-native-simple-dialogs';
import {images} from "../model/images";
import Colors from "../constants/Colors";
import Overlay from 'react-native-modal-overlay';
export class QuestionCollectifV2 extends Component {
    static navigationOptions = {
        header: null,
        left: null,
    };

    constructor() {
        super();
        let width = Dimensions.get('window').width;
        let height = Dimensions.get('window').height;
        this.state = {
            situation: [],
            question: '',
            reponses: [],
            answered: 'play',
            reponse: '',
            progressVisible: false,
            hasBall: false,
            ball: null,
            fit_screen: false,
            origin_size: null,
            width: width,
            height: height,
            more_answer: null,
            lost: false,
            message: '',
            modalVisible:true
        };

        //send('ready-par','');

        getSocket().on('situation', (message) => {
            //console.log(message);
            if (message.data.screen.x !== this.state.width && message.data.screen.y !== this.state.height) {
                //console.log(width,' ',height);
                this.state.fit_screen = true;
                this.state.origin_size = message.data.screen;
                //console.log('fit_screen'+this.state.ratio);
            }
            for (let p of message.data.situations) {
                let newXY = this.newXY_(p);
                //console.log(newXY);
                p.pan = new Animated.ValueXY({x: newXY.x, y: newXY.y});
                //console.log('HELLO----',p);
                if (p.type === 'Ball') {
                    this.state.ball = p;
                }
            }

            this.setState({situation: message.data.situations});
            //send('answers-question-collectif-request-v2', '');
        });

        getSocket().on('answers', (message) => {
            //console.log(message);
            this.setState({question: message.question});
            for (let p of message.reponses) {
                if (p.moveTo !== null) {
                    for (let moveTo of p.moveTo) {
                        let newXY = this.newXY_(moveTo);
                        //console.log(newXY);
                        moveTo.pan = new Animated.ValueXY({x: newXY.x, y: newXY.y});
                    }
                }

            }
            this.setState({reponses: message.reponses});
        });

        getSocket().on('moveTo', (message) => {
            //console.log(message);
            this._answer(message.data);
        });

        getSocket().on('ready', (message) => {
            //console.log(message);
            //this._answer(message.data);
            this.setState({modalVisible: false});
        });

        getSocket().on('lost', (message) => {
            console.log('lost', message);
            setTimeout(() => {this.setState({modalVisible: true});
                this.setState({answered: 'end'});
                this.setState({message: message.data});
                this.setState({lost: true});
            }, 300);


        });

        getSocket().on('moreAnswer', (message) => {
            console.log('moreAnswer=========', message.data);
            this.setState({more_answer: message.data});
            //this._answer();
        });

        getSocket().on('wait-for-others', (message) => {
            console.log('wait-for-others', message);
            this.setState({progressVisible: true});
        });

        getSocket().on('all-answered', (message) => {
            console.log('all-answered', message);
            this.setState({progressVisible: false});
            //afficher ecran regarde la table.
        });
        //StatusBar.setHidden(true);
        //getSocket().emit('ask-question-collectif-request-v2', '');

    }

    newXY_(p) {
        let widthT;
        let heightT;
        if (this.state.fit_screen) {
            widthT = this.newXY(p.x, this.state.width, this.state.origin_size.x);
            heightT = this.newXY(p.y, this.state.height, this.state.origin_size.y);
        } else {
            widthT = p.x;
            heightT = p.y;
        }
        return {x: Math.floor(widthT), y: Math.floor(heightT)};
    }

    newXY(xyOld, sizeNew, sizeOld) {
        return (xyOld * sizeNew) / sizeOld;
    }


    getStyle(xy) {
        let tennisBall = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: xy.size,
            height: xy.size,
            zIndex: 3
        };
        return tennisBall;
    }

    getStyleZone(xy) {
        if (xy.type !== 'Ball') {
            let tennisBall = {
                zIndex: 1,
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 100,
                borderColor: 'white',
                borderStyle: 'dotted',
                borderWidth: 8,
                width: xy.size,
                height: xy.size
            };
            return tennisBall;
        }

        return {};

    }

    getText(xy) {
        return xy.name;
    }

    getZone(xy) {
        return xy.zone;
    }

    getSize(xy) {
        if (xy.zone === undefined) {
            return {
                fontSize: xy.size / 4, color: "blue",
                position: 'absolute', bottom: -20
            };
        }
        return {fontSize: xy.size / 3, color: "blue"};
    }


    getCircles() {
        let i = 0;
        let views = [];
        //console.log(this.state.situation);
        for (let xy of this.state.situation) {
            views.push(<Animated.View key={i + 'c'} style={[this.getStyle(xy), xy.pan.getLayout()]}>
                <Image
                    style={xy.style}
                    source={images[xy.image].uri}
                />
                <Text style={this.getSize(xy)}>{this.getText(xy)}</Text>
            </Animated.View>);
            i++;
        }
        for (let xy of this.state.reponses) {

            if (xy.moveTo !== null) {
                for (let moveTo of xy.moveTo) {
                    //console.log('hello ',moveTo);
                    views.push(<Animated.View key={i + 'c'} style={[this.getStyleZone(moveTo), moveTo.pan.getLayout()]}>
                        <Text style={this.getSize(moveTo)}>{this.getZone(moveTo)}</Text>
                    </Animated.View>);
                    i++;
                }
            }
        }
        return views;
    }

    _answer(answer) {
        console.log('moveTo--recu', answer);
        let pans_array = [];
        if (answer.moveTo !== null) {
            for (let moveTo of answer.moveTo) {
                for (let s of this.state.situation) {
                    if (s.uuid === moveTo.uuid) {
                        let newXY = this.newXY_(moveTo);
                        pans_array.push(Animated.spring(s.pan, {
                            toValue: {x: newXY.x, y: newXY.y},
                        }));
                    }
                }
            }
            this._animated_parrallel(pans_array);
        }
    }

    setSituation(moveTo) {

    }

    _animated_parrallel(array) {
        Animated.parallel(array).start();
    }

    getView() {
        let index = 1;
        if (this.state.answered === 'end') {
            if(this.state.lost){
                return <Text style={styles.text}>{this.state.message}</Text>
            }else{
                return <Text style={styles.text}>Vous avez repondu: {'\n' + this.state.reponse}</Text>
            }
        } else if (this.state.answered === 'play') {
            let views = [];
            for(let item of this.state.reponses){
                views.push(<TouchableOpacity
                    key={'key'+index}
                    style={styles.container}
                    onPress={() => {
                        this.setState({answered: 'end'});
                        //this._answer(item);
                        this.setState({reponse: item.reponse});
                        send('answered', item);
                        //send('answer-par',item);
                    }}>
                    <Text adjustsFontSizeToFit={true} style={styles.text}>{item.reponse}</Text>
                </TouchableOpacity>);
                index++;
            }
            if(this.state.more_answer !== null){
                views.push(<TouchableOpacity
                    key={'key'+index}
                    style={styles.container}
                    onPress={() => {
                        this.setState({answered: 'end'});
                        this.setState({reponse: this.state.more_answer.reponse});
                        send('answered', this.state.more_answer);
                    }}>
                    <Text adjustsFontSizeToFit={true} style={styles.text}> <Text style={{fontWeight: 'bold'}}>Nouvelle réponse: </Text>{'\n'+this.state.more_answer.reponse}</Text>
                </TouchableOpacity>)
            }

            return views;
        } else {
            return <Text style={styles.text}>Attendez votre tour</Text>;
        }
    }

    getModalView() {
        return <Text style={{fontSize:100}}>Regardez la table!</Text>;
    }

    render() {

        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Overlay visible={this.state.modalVisible}
                         animationType="zoomIn" containerStyle={{backgroundColor: Colors.DARK_BLUE}}
                         animationDuration={500}>
                    {this.getModalView()}
                </Overlay>
                <ProgressDialog
                    activityIndicatorSize={'large'}
                    visible={this.state.progressVisible}
                    messageStyle={styles.wait}
                    title="Vous avez terminé le questionnaire"
                    message="Veuillez attendre l'équipe Adverse..."
                />
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
                <ImageBackground imageStyle={{resizeMode: 'stretch'}} source={images.terrain3.uri} style={styles.left}>
                    {this.getCircles()}
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wait: {textAlign: "center", fontSize: 60},
    right: {flex: 1, backgroundColor: Colors.DARK_BLUE},
    left: {flex: 2, backgroundColor: 'skyblue'},
    blocText: {flex: 2},
    text: {textAlign: "center", fontSize: 30, color: Colors.DARK_BLUE, backgroundColor: 'white', marginBottom: 5},
    text1: {textAlign: "center", fontSize: 30},
    blocQuestion: {flex: 1},
    question: {textAlign: "center", fontSize: 40, backgroundColor: 'white', color: Colors.DARK_BLUE}
});