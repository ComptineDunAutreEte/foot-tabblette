import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import MainTitle from "../../components/title/MainTitleComponent";

export default class DashboardGeneralScreen extends React.Component {

    constructor(props) {
        super(props);

        this.mock = [
            {
                position: 1,
                pseudo: "Jean",
                team: "Rouge",
                mediumResponseTime: 3.5
            }
        ]
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statsContainer}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={styles.tableColumn}><Text style={styles.tableHeader}>Position</Text></View>
                        <View style={styles.tableColumn}><Text>Pseudo</Text></View>
                        <View style={styles.tableColumn}><Text>Équipe</Text></View>
                        <View style={styles.tableColumn}><Text>Temps de réponse moyen</Text></View>
                    </View>
                    {
                        this.mock.map((i) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <View style={styles.tableColumn}><Text>{i.position}</Text></View>
                                    <View style={styles.tableColumn}><Text>{i.pseudo}</Text></View>
                                    <View style={styles.tableColumn}><Text>{i.team}</Text></View>
                                    <View style={styles.tableColumn}><Text>{i.mediumResponseTime}</Text></View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.statsContainer}>
                    <Text>Perso</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
        flexDirection: 'row',
        justifyContent: 'center',
    },
    statsContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        margin: 6
    },
    tableColumn: {
        flexGrow: 1
    },
    tableHeader: {
        fontWeight: "bold",
        fontSize: 23
    }
});