import React from "react";
import { Modal, StyleSheet, Text, View } from 'react-native';
import Colors from "../constants/Colors";
import { Dimensions, PixelRatio } from 'react-native'
import { Button } from 'react-native-elements';
import DashboardScreen from "../screens/DashboardScreen";
import GameService from "../services/GameService";
import SimpleAsyncStorageService from "../services/SimpleAsyncStorageService";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.width = Dimensions.get('window').width * PixelRatio.get();
        this.height = Dimensions.get('window').height * PixelRatio.get();
        this.simpleAsyncStorageService = new SimpleAsyncStorageService();
        this.gameService = new GameService();
        this.state = {
            pseudo: null,
            modalVisible: false,
            isInGame: false,
            playerLevel: null,
            playerTeam: null,
        }
    }

    componentDidMount() {
        this.simpleAsyncStorageService.get('pseudo').then((pseudo) => {
            this.setState({
                pseudo: pseudo
            })
        });

        this.simpleAsyncStorageService.get('playerLevel').then((level) => {
            this.setState({
                playerLevel: level
            })
        });

        this.simpleAsyncStorageService.get('team').then((team) => {
            this.setState({
                playerTeam: team
            })
        });

        this.gameService.isInGame().then((isInGame) => {
            this.setState({
                isInGame: isInGame
            })
        })
    }

    componentWillUnmount() {
        this.setModalVisible(false);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const {pseudo, playerLevel, playerTeam} = this.state;

        return (
            <View style={styles.header}>
                <View style={{flexGrow: 1}}>
                    <Text style={styles.headerTitle}>FOOTBOARD</Text>
                </View>
                <View style={styles.menu}>
                    <Button
                        buttonStyle={styles.buttonMenu}
                        title={"Statistiques"}
                        titleStyle={styles.buttonTextMenu}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    />
                </View>
                <View style={styles.profil}>
                    <Text style={{fontSize: 16}}>Pseudo : {pseudo}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon icon={faCircle} style={playerTeam === 'Rouge' ? {marginRight: 10, color: 'red'} : {marginRight: 10, color: 'blue'}} size={15}/>
                        <Text style={playerTeam === 'Rouge' ? {fontSize: 16, color: 'red'} : {fontSize: 16, color: 'blue'}}>
                            Équipe : {playerTeam}
                        </Text>
                    </View>

                </View>

                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.headerModalTitle}>
                                Statistiques
                            </Text>
                        </View>
                        <View style={{alignItems: "center", marginRight: 20, marginTop: 10}}>
                            <Button
                                title={"Fermer les statistiques"}
                                onPress={() => {
                                    this.setModalVisible(false);
                                }}
                                buttonStyle={styles.buttonMenu}
                                titleStyle={styles.buttonTextMenu}
                            />
                        </View>
                    </View>
                    <View style={{marginTop: 22, flex: 1,}}>
                        <DashboardScreen/>
                    </View>
                </Modal>
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
        width: "100%",
    },
    headerTitle: {
        color: Colors.DARK_GREEN,
        fontSize: 25,
        backgroundColor: "#fff",
    },
    headerModalTitle: {
        color: Colors.DARK_GREEN,
        fontSize: 25,
        backgroundColor: "#fff",
        alignItems: "center",
        marginLeft: 20,
        marginTop: 10
    },
    menu: {
        backgroundColor: "#fff",
        alignItems: "center",
        flexGrow: 1
    },
    profil: {
        backgroundColor: "#fff",
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    buttonMenu: {
        backgroundColor: Colors.DARK_GREEN,
        width: 200,
        padding: 5,
        borderRadius: 5,
    },
    buttonTextMenu: {
        fontWeight: "bold",
        color: Colors.WHITE,
        padding: 15,
        fontSize: 16
    }
});

export default HeaderComponent;