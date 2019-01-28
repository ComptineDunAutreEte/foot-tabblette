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

console.disableYellowBox = true;

const Routes = createStackNavigator({
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    QuestionCollectif: {screen: QuestionCollectif},
    QuestionCollectifParrallel: {screen: QuestionCollectifParrallel},
    Dashboard: {screen: DashboardScreen}
});

const App = createAppContainer(Routes);

export default App;
