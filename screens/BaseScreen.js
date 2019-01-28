import React from "react";
const Orientation = require('react-native-orientation');
import AppConfiguration from "../config/app.config";
import io from 'socket.io-client';


export default class BaseScreen extends React.Component {

    constructor(props) {
        super(props);

        /*this.socket = io(AppConfiguration.serverUrl);

        this.socket.on('data', (data) => {
            console.log('Data recieved from server', data);
        });*/
    }

    componentDidMount() {
        //StatusBar.setHidden(true, "fade");
        Orientation.addOrientationListener(() => Orientation.lockToPortrait());
        Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE_LEFT);
    }

    componentWillUnmount() {
        Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE_LEFT);
    }
}