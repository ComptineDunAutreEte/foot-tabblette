import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getSocket} from "../services/WebsocketService";


export class QuestionCollectifV2 extends Component {
    constructor() {
        super();
        this.state = {
            situaton : []
        };
        getSocket().on('ask-question-collectif-request-v2', (message)=>this.setState({situation : message}))
    }

    getCircles(){

    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.right}>
                </View>
                <View style={styles.left}>
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