import React, {Component} from 'react';
import {Animated, TextInput, Button, PanResponder, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {getSocket} from "../services/WebsocketService";
var SQUARE_DIMENSIONS = 100;
import uid from 'uuid/v4';


export class QuestionCollectifParrallel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            _XY: [],
            color: '#03a9f4',
            size:100,
            text:'',
            type:'Player'
        };


        //pan: new Animated.ValueXY()
        this._panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => {
                    return true
                },
                onMoveShouldSetPanResponder: () => false,
                onStartShouldSetPanResponderCapture: () => { return false},
                onMoveShouldSetPanResponderCapture: () => false,
                onPanResponderTerminationRequest: () => true,
                onShouldBlockNativeResponder: () => false,
            // Creates a function to handle the movement and set offsets
            onPanResponderRelease: (e, gestureState) => {
                //this.createPans(e.nativeEvent.locationX, e.nativeEvent.locationY);
                let xy = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY};
                xy.color = this.state.color;
                xy.moveTo = new Animated.ValueXY({x: xy.x-50, y: xy.y-50});
this.createPans(xy.x-this.state.size/2, xy.y-this.state.size/2);
                this.addXY(xy);
                //console.log(JSON.stringify(xy));
            }
        });
        this.addPlayer.bind(this);
        this.addXY.bind(this);

    }

    addPlayer(player) {
        this.setState({
            players: [...this.state.players, player]
        });
    }

    addXY(coor) {
        this.setState({
            _XY: [...this.state._XY, coor]
        });
    }

    async writeToFile() {
        let players = [];

        for(let player of this.state.players){
            let newPlayer = this.createObject(player);
            players.push(newPlayer);
        }
        this.setState({text: JSON.stringify(players)});
    }

    createObject(player){
        let newPlayer ={};
        newPlayer.color = player.color;
        newPlayer.x = player._animatedValueX;
        newPlayer.y = player._animatedValueY;
        newPlayer.size = player.size;
        newPlayer.uuid = player.uuid;
        newPlayer.type=  player.type;
        return newPlayer;
    }

    async onlyMoveObject() {
        let players = [];

        for(let player of this.state.players){
            if(player.move){
                let newPlayer = this.createObject(player);
                players.push(newPlayer);
            }
        }
        this.setState({text: JSON.stringify(players)});
    }


    createPans(x, y) {
        let player = {};
        player.x = x;
        player.y = y;
        player.name = "";
        player.type = this.state.type;
        player.move = false;
        player.size = this.state.size;
        player.color = this.state.color;
        player.pan = new Animated.ValueXY({x: x, y: y});
        player.uuid = uid();
        player._animatedValueX = x;
        player._animatedValueY = y;

        player.pan.x.addListener((value) => {player._animatedValueX = value.value;});
        player.pan.y.addListener((value) => player._animatedValueY = value.value);
        //pan: new Animated.ValueXY()
        player._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                player.pan.setOffset({x:player._animatedValueX, y: player._animatedValueY});
                player.pan.setValue({x: 0, y: 0}); //Initial value
            },
            onPanResponderMove: Animated.event([
                null, {dx: player.pan.x, dy: player.pan.y}
            ]), // Creates a function to handle the movement and set offsets
            onPanResponderRelease: (e, gesture) => {
                //console.log(player.pan.__getValue());
                player.move = true;
                this.forceUpdate();
                player.pan.flattenOffset(); // Flatten the offset so it resets the default positioning
            }
        });
        //player.pan.flattenOffset();

        //this.addPlayer(player);
        //alert(JSON.stringify(player));
       // this.forceUpdate();
       /// alert(this.state.players);*/
        this.addPlayer(player);
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
/*
    getPans() {
        var players = [];
        for (player of this.state._XY) {
            // alert(JSON.stringify(player));

            let pan = new Animated.ValueXY(player);
            pan.flattenOffset();
            pan.setValue(player);
            players.push(<Animated.View style={
                [{transform: [{translateY: player.y}, {translateX: player.x}]}]} key={JSON.stringify(player)}
                                        style={[styles.square, pan.getLayout()]}
            />);
        }

        return players;
    }*/

    getColor(xy){
        let tennisBall = {
            position:'absolute',
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

    removeBall(xy){
        alert('hello');
        var array = [...this.state._XY]; // make a separate copy of the array
        var index = array.indexOf(xy);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({_XY: array});
        }
    }

    getText(xy){
        return xy._animatedValueX+' '+xy._animatedValueY;
    }

    getCircle() {
        let circles = [];
        let i = 1;
        for (let xy of this.state.players) {
            //console.log(xy);
            circles.push(
                <Animated.View key={i+'c'} style={[this.getColor(xy), xy.pan.getLayout()]} {...xy._panResponder.panHandlers}>
<Text>{this.getText(xy)}</Text>
                </Animated.View>);
            i++;
        }
        return circles;
    }

    moveToAll() {
        for (let xy of this.state._XY) {
            Animated.spring(xy.moveTo, {
                toValue: {x: 0, y: 0},
            }).start()
        }
    }

    removeFalse(){
        for(let p of this.state.players){
            p.move = false;
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View key={'10'} style={styles.right}>
                    <Button title="Blue" key={'1'} onPress={() => this.setState({color: '#03a9f4'})}> </Button>

                    <Button key={'2'} onPress={() => this.setState({color: '#ff5722'})} title="Red" > </Button>

                    <Button key={'6'} onPress={() => this.setState({color: 'white'})} title="white" ></Button>
                    <Button key={'4'} onPress={() => this.setState({size:100})} title="100" > </Button>

                    <Button key={'5'} onPress={() => this.setState({size:50})} title="50" > </Button>

                    <Button key={'8'} onPress={() => this.setState({type:'Ball'})} title="Ball" > </Button>
                    <Button key={'9'} onPress={() => this.setState({type:'Player'})} title="Player" > </Button>
                    <Button key={'3'} onPress={() => this.moveToAll()} title="MoveTo" > </Button>

                    <Button key={'11'} onPress={() => this.writeToFile()} title="Save" > </Button>
                    <Button key={'7'} onPress={() => this.onlyMoveObject()} title="SaveMove" > </Button>

                    <Button key={'12'} onPress={() => this.setState({players:[]})} title="ReMove" > </Button>
                    <Button key={'13'} onPress={() => this.removeFalse()} title="MoveFalse" > </Button>
                    <TextInput
                        multiline = {true}
                        style={{flex:1, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />

                </View>
                <View key={'15'} style={styles.left} {...this._panResponder.panHandlers}>
                    {this.getCircle()}
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
        position:'absolute',
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
    }, button: {
        paddingTop: 24,
        paddingBottom: 24,
    },
    buttonText: {
        fontSize: 24,
        color: '#333',
    }
});