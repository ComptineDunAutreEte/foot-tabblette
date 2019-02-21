import React from "react";
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import SubTitleComponent from "../../components/title/SubTitleComponent";
import { Table, Row, Rows } from 'react-native-table-component';
import SimpleAsyncStorageService from "../../services/SimpleAsyncStorageService";
import Colors from "../../constants/Colors";

export default class DashboardGeneralScreen extends React.Component {

    constructor(props) {
        super(props);

        this.simpleAsyncStorageService = new SimpleAsyncStorageService();

        this.state = {
            pseudo: null,
            tableHead: ['Position', 'Pseudo', 'Équipe', 'Bonnes réponses', 'Temps moyen'],
            tableData: []
        }
    }

    componentDidMount() {
        this.simpleAsyncStorageService.get('pseudo').then((pseudo) => {
            this.simpleAsyncStorageService.get('team').then((team) => {
                this.setState({
                    pseudo: pseudo,
                    tableData: [
                        ['1', 'Lurebrand', 'Rouge', 9, '1.4'],
                        ['2', 'Tlilliage', 'Rouge', 9, '1.9'],
                        ['3', 'Toto', 'Bleu', 9, '2.3'],
                        ['4', 'Brenmay_Du_06', 'Rouge', 9, '2.4'],
                        ['5', 'Tutu', 'Bleu', 8, '2.7'],
                        ['6', 'Vogal', 'Bleu', 8, '3.0'],
                        ['7', 'Eambugal', 'Bleu', 8, '4.5'],
                        ['8', 'Taeya', 'Rouge', 7, '3.4'],
                        ['9', 'Bolrod', 'Rouge', 7, '4.4'],
                        ['11', 'Pwenweth', 'Bleu', 7, '4.6'],
                        ['12', 'Minnarra', 'Rouge', 7, '4.9'],
                        ['13', pseudo, team, 6, '4.5'],
                        ['14', 'Ogagal', 'Rouge', 6, '4.6'],
                        ['15', 'Pwenweth', 'Bleu', 6, '4.8'],
                        ['16', 'Lurgnarb', 'Bleu', 6, '5.1'],
                        ['17', 'Pwenweth', 'Bleu', 5, '3.0'],
                        ['18', 'Arayrr', 'Rouge', 4, '7.9'],
                        ['19', 'Pwenweth', 'Bleu', 2, '9.4'],
                        ['20', 'Pwenweth', 'Rouge', 1, '14.3'],
                    ]
                });
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statsContainerLeft}>
                    <SubTitleComponent title={"Votre classement général"}/>

                    <Table borderStyle={{borderWidth: 2, borderColor: Colors.MEDIUM_GREEN}}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={[styles.text, {fontWeight: "bold", fontSize: 16}]}/>
                    </Table>
                    <ScrollView style={{marginTop: -1}}>
                        <Table borderStyle={{borderWidth: 2, borderColor: Colors.MEDIUM_GREEN}}>
                            {
                                this.state.tableData.map((data) => {
                                    if (data[1] === this.state.pseudo) {
                                        return (
                                            <Row data={data} style={styles.head} textStyle={styles.textBold}/>
                                        )
                                    } else {
                                        return (
                                            <Row data={data} textStyle={styles.text}/>
                                        )
                                    }

                                })
                            }
                        </Table>
                    </ScrollView>
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
    statsContainerLeft: {
        flexGrow: 2,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        margin: 6
    },
    statsContainerRight: {
        flexGrow: 1,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        margin: 6
    },
    head: {height: 40, backgroundColor: Colors.VERY_LIGHT_GREEN},
    text: {margin: 6},
    textBold: {margin: 6, fontWeight: "bold"}
});