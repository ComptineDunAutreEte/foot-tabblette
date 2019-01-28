import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import BaseScreen from "./BaseScreen";
import HeaderComponent from "../components/HeaderComponent";
import Colors from "../constants/Colors";
import { Button } from "react-native-elements";
import {menuFields} from "../constants/dashboard/MenuFields";

export default class DashboardScreen extends BaseScreen {

    static navigationOptions = {
        header: (
            <HeaderComponent pseudo={this.pseudo} />
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedStats: 'perso',
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.menu}>
                    {
                        menuFields.map((menu) => {
                            console.log(menu);

                            return (
                                <Button key={menu.key} buttonStyle={this.state.selectedStats === menu.key ? styles.buttonMenuSelected : styles.buttonMenu}
                                        onPress={() => {
                                            this.setState({selectedStats: menu.key})
                                        }}
                                        title={menu.label}
                                        titleStyle={this.state.selectedStats === menu.key ? styles.buttonMenuSelectedText : styles.buttonMenuText}/>
                            );
                        })
                    }
                </View>
                <View style={styles.statistiques}><Text>Hello</Text></View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 30
    },
    menu: {
        width: 200,
        backgroundColor: Colors.MEDIUM_BLUE,
    },
    buttonMenu: {
        borderRadius: 0,
        padding: 10,
        backgroundColor: Colors.MEDIUM_BLUE
    },
    buttonMenuText: {
        color: Colors.WHITE,
        textAlign: 'left',
    },
    buttonMenuSelected: {
        backgroundColor: Colors.DARK_BLUE
    },
    buttonMenuSelectedText: {
        color: Colors.WHITE,
        textAlign: 'left',
    },
    statistiques: {
        flex: 1,
        padding: 15,
    }
});

