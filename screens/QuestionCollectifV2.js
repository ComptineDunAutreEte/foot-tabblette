import React, {Component} from 'react';
import {Animated, StyleSheet,TouchableOpacity, Text, View} from 'react-native';
import {getSocket} from "../services/WebsocketService";


export class QuestionCollectifV2 extends Component {
    constructor() {
        super();
        this.state = {
            situation: [],
            question:'',
            reponses:[],
            answered: 'play',
            reponse:''
        };
        getSocket().on('ask-question-collectif-request-v2', (message) => {
            //console.log(message);
            for (let p of message) {
                p.pan = new Animated.ValueXY({x: p.x, y: p.y});
            }
            this.setState({situation: message});
        });

        getSocket().on('answers-question-collectif-request-v2', (message) => {
            console.log(message);
            this.setState({question: message.question});
            this.setState({reponses:message.reponses});
        });
        getSocket().emit('ask-question-collectif-request-v2', '');

    }

    getStyle(xy) {
        let tennisBall = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: xy.color,
            borderRadius: 100,
            width: xy.size,
            height: xy.size,
        };
        return tennisBall;
    }

    getStyleZone(xy) {
        let tennisBall = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            borderRadius: 100,
            width: xy.size,
            height: xy.size,
        };
        return tennisBall;
    }

    getText(xy){
        return xy.name;
    }

    getCircles() {
        let i = 0;
        let views = [];
        //console.log(this.state.situation);
        for (let xy of this.state.situation) {
            views.push(<Animated.View key={i + 'c'} style={[this.getStyle(xy), xy.pan.getLayout()]}>
                <Text>{this.getText(xy)}</Text>
            </Animated.View>);
            i++;
        }
        return views;
    }

    getCirclesView(){
        let i = 0;
        let views = [];
        //console.log(this.state.situation);
        for (let xy of this.state.reponses) {
            if(xy.move !== null){
                for(let moveTo of xy.moveTo){
                    let pan = new Animated.ValueXY({x: moveTo.x, y:moveTo.y});
                    views.push(<Animated.View key={i + 'c'} style={[this.getStyle(xy), pan.getLayout()]}>
                        <Text>{this.getText(xy)}</Text>
                    </Animated.View>);
                    i++;
                }
            }
        }
        return views;
    }

    getView(){

    }

    _answer(answer){
        for(let s of this.state.situation){
            for(let moveTo of answer.moveTo)
            if(s.uuid === moveTo.uuid && s.moveTo !== null){
                Animated.spring(s.pan, {
                    toValue: {x: moveTo.x, y: moveTo.y},
                }).start()
            }
        }

    }

    getView(){
        if(this.state.answered === 'end'){
            return <Text style={styles.text}>Vous avez repondu: {'\n'+this.state.reponse.reponse}</Text>
        }else if(this.state.answered === 'play'){
            return this.state.reponses.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.container}
                    onPress={() => {this.setState({answered:'end'});this._answer(item); this.setState({reponse: item.reponse})}}>
                    {
                        index % 2 === 0 ? <Text adjustsFontSizeToFit={true} style={styles.text}>
                            {item.reponse}
                        </Text> : <Text adjustsFontSizeToFit={true} style={styles.text1}>
                            {item.reponse}
                        </Text>

                    }

                </TouchableOpacity>))
        }else{
            return <Text style={styles.text}>Attendez votre tour</Text>;
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
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
                    {this.getCircles()}
                    {this.getCirclesZone()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    right: {flex: 1, backgroundColor: 'powderblue'},
    left: {flex: 2, backgroundColor: 'skyblue'},
    blocText: {flex: 2},
    text: {textAlign: "center", fontSize: 30, backgroundColor: 'white'},
    text1: {textAlign: "center", fontSize: 30},
    blocQuestion: {flex: 1},
    question: {textAlign: "center", fontSize: 40}
});