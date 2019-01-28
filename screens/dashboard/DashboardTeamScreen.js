import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import MainTitle from "../../components/title/MainTitleComponent";

export default class DashboardTeamScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MainTitle title={"Statistiques de votre équipe"}/>
                <Text>Perso</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});