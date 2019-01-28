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
import {QuestionCollectif} from "./screens/QuestionCollectif";
import {QuestionCollectifParrallel} from "./screens/QuestionCollectifParrallel";
const Routes = createStackNavigator({
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    QuestionCollectif:{screen:QuestionCollectif},
    QuestionCollectifParrallel:{screen:QuestionCollectifParrallel}
});

const App = createAppContainer(Routes);

export default App;
