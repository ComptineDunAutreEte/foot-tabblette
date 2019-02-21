import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import MainTitle from "../../components/title/MainTitleComponent";
import SubTitleComponent from "../../components/title/SubTitleComponent";

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
                    <SubTitleComponent title={"Votre classement général"}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={styles.tableColumn}><Text style={styles.tableHeader}>Position</Text></View>
                        <View style={styles.tableColumn}><Text style={styles.tableHeader}>Pseudo</Text></View>
                        <View style={styles.tableColumn}><Text style={styles.tableHeader}>Équipe</Text></View>
                        <View style={styles.tableColumn}><Text style={styles.tableHeader}>Temps de réponse moyen</Text></View>
                    </View>
                    {
                        this.mock.map((i) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <View style={styles.tableColumn}><Text style={styles.tableContent}>{i.position}</Text></View>
                                    <View style={styles.tableColumn}><Text style={styles.tableContent}>{i.pseudo}</Text></View>
                                    <View style={styles.tableColumn}><Text style={styles.tableContent}>{i.team}</Text></View>
                                    <View style={styles.tableColumn}><Text style={styles.tableContent}>{i.mediumResponseTime}</Text></View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.statsContainer}>
                    <SubTitleComponent title={"Classement général de votre équipe"}/>
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
        fontSize: 20
    },
    tableContent: {
        fontSize: 16,
    }
});