import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, Animated } from 'react-native';
import BaseScreen from "./BaseScreen";
import Colors from "../constants/Colors";
import { menuFields } from "../constants/dashboard/MenuFields";
import DashboardPersoScreen from "./dashboard/DashboardPersoScreen";
import DashboardTeamScreen from "./dashboard/DashboardTeamScreen";
import DashboardGeneralScreen from "./dashboard/DashboardGeneralScreen";
import { dashboardDataRequest, send } from "../services/WebsocketService";
import { TabView, SceneMap } from 'react-native-tab-view';
import DashboardNoDatasScreen from "./dashboard/DashboardNoDatasScreen";
import DashboardHistoryScreen from "./dashboard/DashboardHistoryScreen";

export default class DashboardScreen extends BaseScreen {

    constructor(props) {
        super(props);

        this.state = {
            selectedStats: 'history',
            dashboardDatas: null,
            index: 0,
            routes: menuFields
        };

        send("dashboard-request", {request: true});
        dashboardDataRequest((datas) => {
            this.setState({dashboardDatas: datas});
        });

    }

    render() {
        if (this.state.dashboardDatas === null) {
            return (
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        } else {
            return (

                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        history: this.state.dashboardDatas.history.length === 0 ? this.emptyDatasScreen : this.historyScreen,
                        perso: this.state.dashboardDatas.perso.userResponses.length === 0 ? this.emptyDatasScreen : this.persoScreen,
                        team: this.teamScreen,
                        general: this.generalScreen,
                    })}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({index})}
                    initialLayout={{width: Dimensions.get('window').width}}
                />


            );
        }
    }

    historyScreen = () => (
        <DashboardHistoryScreen history={this.state.dashboardDatas.history} />
    );

    persoScreen = () => (
        <DashboardPersoScreen persoDatas={this.state.dashboardDatas.perso}/>
    );

    teamScreen = () => (
        <DashboardTeamScreen teamDatas={this.state.dashboardDatas.team}/>
    );

    generalScreen = () => (
        <DashboardGeneralScreen />
    );

    emptyDatasScreen = () => (
        <DashboardNoDatasScreen/>
    );

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    return (
                        <TouchableOpacity
                            style={this.state.index === i ? styles.tabItemSelected : styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={this.state.index === i ? styles.textSelected : styles.text}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    text: {
        fontSize: 20,
        color: "#fff"
    },
    textSelected: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.MEDIUM_BLUE
    },
    tabItemSelected: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.DARK_BLUE,
    }
});
