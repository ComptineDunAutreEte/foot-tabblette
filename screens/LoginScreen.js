import React from "react";

import {Dimensions, Text,Image, KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native';
import BaseScreen from "./BaseScreen";
import {Ionicons} from '@expo/vector-icons';
import {ButtonGroup, Button} from 'react-native-elements';
import {seconnecte, sedeconnecte, getImage, reset } from "../services/WebsocketService";
import {Keyboard} from 'react-native';

export default class LoginScreen extends BaseScreen {
    constructor() {
        super();
        this.state = {
            titleText: "Footboard",
            logged:"",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            selectedIndex: 0,
            img:''
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    connecte(team, pseudo){
        let obj = {
            pseudo: pseudo,
            team: team.split(" ")[1]
        };
        sedeconnecte(obj);
        seconnecte(message => {this.setState({logged:message})} ,obj);
        Keyboard.dismiss();
    }

    getImage(){
        getImage((data)=>this.setState({img:data}));
    }


    render() {
        const buttons = ['Team A', 'Team B'];
        const {selectedIndex} = this.state;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.topView}>
                <KeyboardAvoidingView behavior="padding" style={{flex: 1, width:this.state.width/6}}>

                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 100}}
                    ></ButtonGroup>
                    <TextInput
                        style={{height: 80, marginTop:5, borderColor: 'gray', borderWidth: 1, borderRadius:5, fontSize: 40}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder={"Pseudo"}
                        onEndEditing={this.clearFocus}
                    />
                    <Button
                        buttonStyle={{
                            height: 80,
                            marginTop:10
                        }}
                        title='Loggin'
                        icon={
                            <Ionicons name="md-arrow-forward" size={32} color="white" />
                        }
                        iconRight
                        onPress={() => {
                            this.connecte(buttons[this.state.selectedIndex], this.state.text);
                            //this.getImage();
                            navigate('QuestionCollectif');
                        }}
                    />
                    <Button
                        buttonStyle={{
                            height: 80,
                            marginTop:10
                        }}
                        title='Reset Server'
                        iconRight
                        onPress={() => {
                            reset();
                        }}
                    />
                    <Button
                        buttonStyle={{
                            height: 80,
                            marginTop:10
                        }}
                        title='Question collectif (parralèle)'
                        iconRight
                        onPress={() => {
                            navigate('QuestionCollectifParrallel');
                        }}
                    />
                    <Image style={{width: 50, height: 50}} source={{uri: this.state.img}}/>

                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
        fontSize: 100,
        flex:1
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    topView: {
        flex: 1,
        backgroundColor: 'powderblue',
        alignItems: 'center'
    },
    inputView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        alignItems: 'center'
    }
});

