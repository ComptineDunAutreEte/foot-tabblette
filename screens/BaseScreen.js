import React from "react";
const Orientation = require('react-native-orientation');
import { StatusBar } from 'react-native';
import UserService from "../services/UserService";
import PseudoService from "../services/PseudoService";
import GameService from "../services/GameService";

export default class BaseScreen extends React.Component {

    static navigationOptions = {
        header: null,
        left: null,
    };

    state = {
        spinner: false
    };

    constructor(props) {
        super(props);
        this.pseudoService = new PseudoService();
        this.gameService = new GameService();
        this.pseudo = null
    }

    componentDidMount() {
        Orientation.addOrientationListener(() => Orientation.lockToPortrait());
        Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE_LEFT);
        StatusBar.setHidden(true);
    }

    componentWillUnmount() {
        Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE_LEFT);
        StatusBar.setHidden(false);
    }
}