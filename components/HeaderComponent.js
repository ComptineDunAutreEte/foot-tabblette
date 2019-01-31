import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";

class HeaderComponent extends React.Component {

    render() {
        let content;

        if (this.props.pseudo) {
            content = <Text sytle={styles.headerTitle}>Bienvenue { this.props.pseudo } !</Text>;
        } else {
            content = <Text sytle={styles.headerTitle}>FOOTBOARD</Text>
        }

        return (
            <View style={styles.header}>
                <View style={styles.logo}>{content}</View>
                <View style={styles.menu}>{content}</View>
                <View style={styles.profil}>{content}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        fontSize: 20,
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
        flexDirection: 'row',
        width: "100%"

    },
    headerTitle: {
        color: "#ffffff",
        fontSize: 25,
        backgroundColor: "#000",
        width: "33%",
    },
    menu: {
        width: "33%",
        backgroundColor: "#000"
    },
    profil: {
        width: "33%",
        backgroundColor: "#000"
    }
});


export default HeaderComponent;