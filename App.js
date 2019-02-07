/**
 * Vendor imports
 */
import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

/**
 * App imports
 */
import {HomeScreen} from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { QuestionCollectif } from "./screens/QuestionCollectif";
import { QuestionCollectifV2 } from "./screens/QuestionCollectifV2";
import { QuestionCollectifParrallel } from "./screens/QuestionCollectifParrallel";
import DashboardScreen from "./screens/DashboardScreen";
import { YellowBox } from 'react-native';
import QuestionScreen from "./screens/QuestionScreen";
import WaitScreen from "./screens/WaitScreen";
import { ResponseSimpleQuestionScreen } from "./screens/ResponseSimpleQuestionScreen";
/*YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);*/
console.disableYellowBox = true;

const Routes = createStackNavigator({
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    QuestionCollectif: {screen: QuestionCollectif},
    QuestionCollectifV2: {screen: QuestionCollectifV2},
    QuestionCollectifParrallel: {screen: QuestionCollectifParrallel},
    Dashboard: {screen: DashboardScreen},
    Question: {screen: QuestionScreen},
    Wait: {screen: WaitScreen},
    ResponseSimpleQuestion: {screen: ResponseSimpleQuestionScreen}
});
const App = createAppContainer(Routes);

export default App;
