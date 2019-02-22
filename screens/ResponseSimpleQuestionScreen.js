import React from "react";
import { Dimensions, ImageBackground, PixelRatio, StyleSheet, View } from 'react-native';
import BaseScreen from "./BaseScreen";
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from "../components/HeaderComponent";
import Text from "react-native-elements/src/text/Text";
import Colors from "../constants/Colors";

export class ResponseSimpleQuestionScreen extends BaseScreen {

    static navigationOptions = {
        title: 'Welcome',
        header: (
            <HeaderComponent pseudo={this.pseudo}/>
        ),
    };

    constructor(props) {
        super(props);

        const {navigation} = this.props;
        this.isCorrectPlayerResponse = navigation.getParam('isCorrectPlayerResponse');
        this.anecdote = navigation.getParam('anecdote');
    }

    render() {
        let content;

        if (this.isCorrectPlayerResponse === true) {
            content = <Text style={{fontSize: 30, color: "green"}}>Vous avez bien répondu à la question ! Vous pourrez
                déplacer votre pion sur la table.</Text>
        } else {
            content =
                <Text style={{fontSize: 30, color: "red"}}>Vous n'avez pas bien répondu à la question ! Vous ne pourrez
                    pas déplacer votre pion sur la table.</Text>
        }

        setTimeout(() => {
            this.props.navigation.navigate("Home");
        }, 10000);

        return (

            <View style={styles.container}>
                <ImageBackground
                    resizeMode={'cover'}
                    style={{flex: 1, width: "100%", height: "100%"}}
                    source={require('../assets/bg_foot.jpg')}>

                    <View style={styles.contentView}>
                        <View style={styles.form}>
                            {content}

                            <Text style={{fontSize: 30, marginTop: 20}}>
                                Anecdote : {this.anecdote}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARK_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: (Dimensions.get('window').width * PixelRatio.get()) / 2,
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderColor: '#eee',
        borderRadius: 5,
        borderWidth: 1,
    },
    text: {
        fontSize: 30,
        color: Colors.DARK_GREEN
    },
});