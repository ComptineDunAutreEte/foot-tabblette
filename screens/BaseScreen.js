import React from "react";
const Orientation = require('react-native-orientation');
import { StatusBar } from 'react-native';
import UserService from "../services/UserService";

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
        this.userService = new UserService();
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