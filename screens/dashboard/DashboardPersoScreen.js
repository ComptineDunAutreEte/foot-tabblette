import React from "react";
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import MainTitle from "../../components/title/MainTitleComponent";
import { VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryLine, VictoryTheme } from "victory-native";
import Colors from "../../constants/Colors";
import SubTitleComponent from "../../components/title/SubTitleComponent";

export default class DashboardPersoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.dataOne = [
            {x: 1, y: 2},
            {x: 2, y: 4},
            {x: 3, y: 3.5},
            {x: 4, y: 6},
            {x: 5, y: 1},
            {x: 6, y: 13.2}
        ];

        this.dataTwo = [
            {x: 1, y: 5},
            {x: 2, y: 2},
            {x: 3, y: 6},
            {x: 4, y: 3.4},
            {x: 5, y: 2},
            {x: 6, y: 1}
        ];

        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        };


        this.categories = [];
        for (let i = 1; i < this.dataOne.length + 1; i++) {
            this.categories.push(i.toString());
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MainTitle title={"Statistiques personnelles"}/>

                <View style={styles.stats}>
                    <View style={styles.responseTime}>
                        <SubTitleComponent title={"Temps de réponse par questions"}/>
                        <VictoryChart width={this.state.width - 230} height={400}
                            theme={VictoryTheme.material}>

                            <VictoryLabel x={10} y={280} style={styles.label}
                                          text={"Temps en secondes"} angle={-90}
                            />

                            <VictoryLabel x={200} y={390} style={styles.label}
                                          text={"Numéro de question"}
                            />

                            <VictoryLine
                                style={{
                                    data: {stroke: "tomato", strokeWidth: 2},
                                    parent: {border: "1px solid #ccc"}
                                }}
                                animate={{
                                    duration: 2000,
                                    onLoad: {duration: 1000}
                                }}
                                interpolation="natural"
                                domain={{x: [1, this.dataOne.length], y: [0, 15]}}
                                categories={{x: this.categories}}
                                labels={(datum) => datum.y}
                                labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                                data={this.dataOne}
                            />

                            <VictoryLine
                                style={{
                                    data: {stroke: "gold", strokeWidth: 2},
                                    parent: {border: "1px solid #ccc"}
                                }}
                                animate={{
                                    duration: 2000,
                                    onLoad: {duration: 1000}
                                }}
                                interpolation="natural"
                                domain={{x: [1, this.dataTwo.length], y: [0, 15]}}
                                categories={{x: this.categories}}
                                labels={(datum) => datum.y}
                                labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                                data={this.dataTwo}
                            />

                            <VictoryLegend x={125} y={0}
                                           centerTitle
                                           orientation="horizontal"
                                           gutter={20}
                                           style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
                                           data={[
                                               { name: "Temps personnel", symbol: { fill: "tomato" } },
                                               { name: "Temps moyen", symbol: { fill: "gold" } }
                                           ]}
                            />
                        </VictoryChart>
                    </View>

                    <View style={styles.themeDetails}><Text>tutu</Text></View>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    stats: {
        // flex: 1,
        flexDirection: 'row',
    },
    responseTime: {
        backgroundColor: '#fff',
        marginRight: 10,
        padding: 20,
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    themeDetails: {
        width: 200,
        backgroundColor: '#000',
        marginLeft: 10,
    },
    label: {
        color: "#555"
    }
});