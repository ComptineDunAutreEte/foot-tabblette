import React, {Component} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {getSocket} from "../services/WebsocketService";

import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

var SQUARE_DIMENSIONS = 100;


export class QuestionCollectifParrallel extends Component {
    constructor(props) {
        super(props);
        super(props);
        this.state = {
            pan:[], // inits to zero
            pansView:[]
        };
        //pan: new Animated.ValueXY()
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                //alert('len: '.this.state.pan.length);
                //this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                //this.state.pan.setValue({x: 0, y: 0})

            },
            onPanResponderMove: (event, gesture) => {

                //this.state.pan.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                this.state.pan.push({x: event.nativeEvent.locationX, y:event.nativeEvent.locationY});
                this.forceUpdate();
            }
        });


    }

    componentWillMount() {

    }

    selection(item) {
        alert(item.reponse);
    }

    handleCancel = () => {
        this.setState({dialog_opened: false});
    };

    handleSoumettre = () => {
        answer_template.answer = this.state.reponse;
        getSocket().emit('question-collectif', answer_template);
        this.setState({dialog_opened: false});
        this.setState({answered: 'end'});
    };

    getPans(){
        var payments = [];
        for(let i of this.state.pan){
            payments.push(
                <Circle
                    {...this.panResponder.panHandlers}
                    x={i.x-45}
                    y={i.y-45}
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="blue"
                    strokeWidth="2.5"
                    fill="green"/>
            )
        }
        return payments;
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.right}>

                </View>
                <View style={styles.left} {...this.panResponder.panHandlers}>
                    <Svg style={{flex:1}}>
                        {this.getPans()}
                    </Svg>
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
    question: {textAlign: "center", fontSize: 40},
    tennisBall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'greenyellow',
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    square: {
        width: SQUARE_DIMENSIONS,
        height: SQUARE_DIMENSIONS,
        backgroundColor: 'blue'
    }
});