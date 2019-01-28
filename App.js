/**
 * Vendor imports
 */
import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

/**
 * App imports
 */
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { QuestionCollectif } from "./screens/QuestionCollectif";
import { QuestionCollectifParrallel } from "./screens/QuestionCollectifParrallel";
import DashboardScreen from "./screens/DashboardScreen";

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

const Routes = createStackNavigator({
    Dashboard: {screen: DashboardScreen},
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    QuestionCollectif: {screen: QuestionCollectif},
    QuestionCollectifParrallel: {screen: QuestionCollectifParrallel},
});

const App = createAppContainer(Routes);

export default App;
