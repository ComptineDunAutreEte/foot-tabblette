import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import BaseScreen from "./BaseScreen";
import Colors from "../constants/Colors";
import { Button } from "react-native-elements";
import { menuFields } from "../constants/dashboard/MenuFields";
import DashboardPersoScreen from "./dashboard/DashboardPersoScreen";
import DashboardTeamScreen from "./dashboard/DashboardTeamScreen";
import DashboardGeneralScreen from "./dashboard/DashboardGeneralScreen";
import { dashboardDataRequest, send } from "../services/WebsocketService";

export default class DashboardScreen extends BaseScreen {

    constructor(props) {
        super(props);

        this.state = {
            selectedStats: 'team',
            dashboardDatas: null
        };

        send("dashboard-request", {request: true});
        dashboardDataRequest((datas) => {
            console.log("datas", datas);
            this.setState({dashboardDatas: datas});
        });

    }

    render() {

        if (this.state.dashboardDatas === null) {
            console.log("null");
            return (
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        } else {
            console.log("not null");
            return (
                <View style={styles.container}>
                    <View style={styles.menu}>
                        {
                            menuFields.map((menu) => {
                                return (
                                    <Button key={menu.key}
                                            buttonStyle={this.state.selectedStats === menu.key ? styles.buttonMenuSelected : styles.buttonMenu}
                                            onPress={() => {
                                                this.setState({selectedStats: menu.key})
                                            }}
                                            title={menu.label}
                                            titleStyle={this.state.selectedStats === menu.key ? styles.buttonMenuSelectedText : styles.buttonMenuText}/>
                                );
                            })
                        }
                    </View>

                    <View style={styles.statistiques}>{this._handleView()}</View>
                </View>
            );
        }
    }

    _handleView() {
        let view = null;

        console.log("dashboardDatas", this.state.dashboardDatas);

        switch (this.state.selectedStats) {
            case "perso":
                view = <DashboardPersoScreen persoDatas={this.state.dashboardDatas.perso} />;
                break;
            case "team":
                view = <DashboardTeamScreen teamDatas={this.state.dashboardDatas.team} />;
                break;
            case "general":
                view = <DashboardGeneralScreen/>;
                break;
        }

        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    text: {
        fontSize: 30
    },
    menu: {
        width: 170,
        backgroundColor: Colors.MEDIUM_BLUE,
    },
    buttonMenu: {
        borderRadius: 0,
        padding: 10,
        backgroundColor: Colors.MEDIUM_BLUE,
        borderLeftWidth: 3,
        borderColor: Colors.MEDIUM_BLUE,
    },
    buttonMenuText: {
        color: Colors.WHITE,
        textAlign: 'left',
        width: '100%'
    },
    buttonMenuSelected: {
        backgroundColor: Colors.DARK_BLUE,
        borderLeftWidth: 3,
        borderColor: Colors.LIGHT_BLUE
    },
    buttonMenuSelectedText: {
        color: Colors.WHITE,
        textAlign: 'left',
        width: '100%',
    },
    statistiques: {
        flex: 1,
        padding: 15,
    }
});
