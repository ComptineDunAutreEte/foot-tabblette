import React from "react";
import { ImageBackground, StyleSheet, View } from 'react-native';
import BaseScreen from "./BaseScreen";
import { getSocket, reset, waitingScreen , getUser} from "../services/WebsocketService";
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { send } from "../services/WebsocketService";
import HeaderComponent from "../components/HeaderComponent";
import Text from "react-native-elements/src/text/Text";
import Colors from "../constants/Colors";

export class HomeScreen extends BaseScreen {

    static navigationOptions = {
        title: 'Welcome',
        header: (
            <HeaderComponent pseudo={this.pseudo}/>
        ),
    };

    constructor(props) {
        super(props);
        this.width = this.state.width;
    }

    render() {
        const {navigate} = this.props.navigation;

        getSocket().on('navigate', (url) => navigate(url));

        waitingScreen((response) => {
            if (response.isReady === true) {
                navigate("Wait");
            }

        });

        return (
            <View style={styles.container}>
                <ImageBackground
                    resizeMode={'cover'}
                    style={{justifyContent: 'center',alignItems: 'center',flex: 1, width: "100%", height: "100%"}}
                    source={require('../assets/bg_foot.jpg')}>
                    <View style={styles.contentView}>
                        <View style={styles.form}>
                            <Text style={styles.text}>En attente d'instructions de la table</Text>
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
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderColor: '#eee',
        borderRadius: 5,
        borderWidth: 1,
    },
    text: {
        fontSize: 50,
        color: Colors.DARK_GREEN,
        textAlign:'center'
    },
    buttonStyle: {
        height: 30,
        width: 200,
        backgroundColor: Colors.DARK_GREEN,
        marginTop: 10
    }
});