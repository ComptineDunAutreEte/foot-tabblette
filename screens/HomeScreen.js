import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import BaseScreen from "./BaseScreen";

class HomeScreen extends BaseScreen {
    constructor(props) {
        super(props);
    }

    click() {
        const dataObj = {
            action: 'click'
        };

        console.log("clicked");

        this.socket.emit('data', dataObj);
    }
    render() {
        const {navigate} = this.props.navigation;

        return (

            <View style={styles.container}>

                <TouchableOpacity onPress={() => this.click()}><Text style={styles.text}>Clique</Text></TouchableOpacity>

                <Button
                    title="LoginScreen"
                    onPress={() => navigate('Login')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30
    }
});


export default HomeScreen;