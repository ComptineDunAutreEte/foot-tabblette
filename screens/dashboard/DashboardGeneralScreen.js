import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import MainTitle from "../../components/title/MainTitleComponent";

export default class DashboardGeneralScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Perso</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9"
    }
});