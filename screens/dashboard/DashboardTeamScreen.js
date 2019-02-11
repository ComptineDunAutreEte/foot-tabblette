import React from "react";
import { Text, View, StyleSheet, ScrollView, PixelRatio, Dimensions } from 'react-native';
import MainTitle from "../../components/title/MainTitleComponent";
import {
    VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryLine,
    VictoryTheme
} from "victory-native";
import SubTitleComponent from "../../components/title/SubTitleComponent";

export default class DashboardTeamScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        };

        console.log("teamDatas", this.props.teamDatas);

        this.aResponses = this.props.teamDatas.aResponses;
        this.bResponses = this.props.teamDatas.bResponses;

        this.aTimes = [];
        this.bTimes = [];
        this.tickValues = [];
        this.aTeamTotalScore = 0;
        this.bTeamTotalScore = 0;

        this.aTeamTotalScoreGraph = [
            {x: 0, y: 0}
        ];
        this.bTeamTotalScoreGraph = [
            {x: 0, y: 0}
        ];

        this.aResponses.forEach((response, i) => {
            this.aTimes.push({
                x: i + 1,
                y: response.responseTime
            });
            this.tickValues.push(i + 1);
            this.aTeamTotalScore += response.nGoodResponses;

            this.aTeamTotalScoreGraph.push({
                x: i + 1,
                y: this.aTeamTotalScore
            })
        });

        for (let i = 0; i < this.aTeamTotalScore; i++) {
            this.tickScoreY += i;
        }

        this.bResponses.forEach((response, i) => {
            this.bTimes.push({
                x: i + 1,
                y: response.responseTime
            });
            this.bTeamTotalScore += response.nGoodResponses;

            this.bTeamTotalScoreGraph.push({
                x: i + 1,
                y: this.bTeamTotalScore
            })
        });

        this.chartWidth = this.bTimes.length > 20 ? Dimensions.get('window').width + 200 : Dimensions.get('window').width;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.stats}>
                    <View style={styles.infosTop}>
                        <View style={styles.bloc1}>
                            <Text style={{
                                fontSize: 30,
                                textAlign: "center",
                                marginBottom: 10,
                                fontWeight: "bold"
                            }}>Score : {this.aTeamTotalScore}</Text>
                            <Text style={{textAlign: "center"}}>Votre team</Text>
                        </View>

                        <View style={styles.bloc2}>
                            <Text style={{
                                fontSize: 30,
                                textAlign: "center",
                                marginBottom: 10,
                            }}>Score : {this.bTeamTotalScore}</Text>
                            <Text style={{textAlign: "center"}}>Team adverse</Text>
                        </View>

                        <View style={{
                            flexGrow: 1,
                            backgroundColor: (this.aTeamTotalScore > this.bTeamTotalScore) ? "#43a047" : "#e64a19",
                            borderColor: '#eee',
                            borderWidth: 1,
                            padding: 15,
                            borderRadius: 5,
                        }}>
                            <Text style={{
                                fontSize: 30,
                                textAlign: "center",
                                marginBottom: 10,
                                fontWeight: "bold",
                                color: "#fff"
                            }}>{(this.aTeamTotalScore > this.bTeamTotalScore) ? "Bravo !!" : "Rien n'est joué"}</Text>
                            <Text style={{
                                textAlign: "center",
                                color: "#fff"
                            }}>{(this.aTeamTotalScore > this.bTeamTotalScore) ? "Vous êtes en tête !" : "Resaisissez-vous !"}</Text>
                        </View>
                    </View>

                    <View style={styles.responseTime}>
                        <SubTitleComponent title={"Évolution du score au cours de la partie"}/>

                        <VictoryChart height={350} theme={VictoryTheme.material} domain={{y: [0, this.aTeamTotalScore > this.bTeamTotalScore ? this.aTeamTotalScore + 1 : this.bTeamTotalScore + 1]}}>
                            <VictoryAxis tickValues={this.tickValues} label="Numéro de question" offsetY={49}
                                         style={{axisLabel: {padding: 30}}}/>
                            <VictoryAxis label="Score" dependentAxis offsetX={50}
                                         style={{axisLabel: {padding: 30}}}/>
                            <VictoryLine data={this.aTeamTotalScoreGraph} style={{data: {stroke: "magenta"}}}/>
                            <VictoryLine data={this.bTeamTotalScoreGraph} style={{data: {stroke: "cyan"}}}/>

                            <VictoryLegend
                                x={this.state.width / 2 - 150} y={0}
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                style={{border: {stroke: "#eee"}, title: {fontSize: 20}}}
                                data={[
                                    {name: "Votre team", symbol: {fill: "magenta"}},
                                    {name: "Team adverse", symbol: {fill: "cyan"}}
                                ]}
                            />
                        </VictoryChart>
                    </View>

                    <View style={styles.responseTime}>
                        <SubTitleComponent title={"Temps de réponse par questions"}/>

                        <ScrollView horizontal={true}>
                            <VictoryChart theme={VictoryTheme.material} domain={{x: [0, this.aTimes.length + 1]}} width={this.chartWidth} height={350}>
                                <VictoryAxis tickValues={this.tickValues} label="Numéro de question" offsetY={49} style={{axisLabel: {padding: 30}}}/>
                                <VictoryAxis label="Temps de réponses en secondes" dependentAxis offsetX={50} style={{axisLabel: {padding: 30}}}/>

                                <VictoryGroup offset={12} style={{data: {width: 10}}} colorScale={["magenta", "cyan"]}>
                                    <VictoryBar data={this.aTimes} labels={(d) => `${d._y}`}/>
                                    <VictoryBar data={this.bTimes} labels={(d) => `${d._y}`}/>
                                </VictoryGroup>

                                <VictoryLegend
                                    x={this.state.width / 2 - 150} y={0}
                                    centerTitle
                                    orientation="horizontal"
                                    gutter={20}
                                    style={{border: {stroke: "#eee"}, title: {fontSize: 20}}}
                                    data={[
                                        {name: "Votre team", symbol: {fill: "magenta"}},
                                        {name: "Team adverse", symbol: {fill: "cyan"}}
                                    ]}
                                />
                            </VictoryChart>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9"
    },
    stats: {
        flex: 1,
    },
    responseTime: {
        backgroundColor: '#fff',
        padding: 10,
        paddingRight: -20,
        borderColor: '#eee',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
    },
    infosTop: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
    },
    bloc1: {
        flexGrow: 1,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5
    },
    bloc2: {
        flexGrow: 1,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        borderRadius: 5
    },
});