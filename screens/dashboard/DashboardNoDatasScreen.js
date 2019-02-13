import React from "react";
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from "react-native-elements/src/text/Text";
import MainTitle from "../../components/title/MainTitleComponent";

export default class DashboardNoDatasScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <MainTitle title={"Aucune donnée n'a été récolté pour le moment."}/>

                <Text style={{color: "#4D4F5C", fontSize: 18, marginTop: 15}}>
                    Il va falloir attendre de jouer pour visualiser vos statistiques !
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        alignItems: 'center',
        justifyContent: 'center',
    },
});