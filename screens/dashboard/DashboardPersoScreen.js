import React from "react";
import { Dimensions, Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import {
    VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryLine, VictoryPie,
    VictoryTheme, VictoryAnimation, VictoryPolarAxis, VictoryGroup, VictoryArea
} from "victory-native";
import Colors from "../../constants/Colors";
import SubTitleComponent from "../../components/title/SubTitleComponent";
import CategoryDetailComponent from "../../components/dashboard/CategoryDetailComponent";

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

        this.characterData = [
            {"Culture générale": 10, "Arbitrage": 42, "Stratégie offensive": 27, "Stratégie défensive": 70},
            {"Culture générale": 62, "Arbitrage": 38, "Stratégie offensive": 93, "Stratégie défensive": 46},
        ];

        this.categories = [
            {
                key: "Culture générale",
            },
            {
                key: "Arbitrage",
            },
            {
                key: "Stratégie offensive"
            },
            {
                key: "Stratégie défensive"
            }
        ];

        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            data: this.processData(this.characterData),
            maxima: this.getMaxima(this.characterData)
        };


        this.nQuestions = [];
        for (let i = 1; i < this.dataOne.length + 1; i++) {
            this.nQuestions.push(i.toString());
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.stats}>

                    <View style={styles.responseTime}>
                        <SubTitleComponent title={"Temps de réponse par questions"}/>
                        <VictoryChart height={250} theme={VictoryTheme.material}>

                            <VictoryLabel x={10} y={230} style={styles.label} text={"Temps en secondes"} angle={-90}/>
                            <VictoryLabel x={200} y={190} style={styles.label} text={"Numéro de question"}/>

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
                                categories={{x: this.nQuestions}}
                                labels={(datum) => datum.y}
                                labelComponent={<VictoryLabel renderInPortal dy={20}/>}
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
                                categories={{x: this.nQuestions}}
                                labels={(datum) => datum.y}
                                labelComponent={<VictoryLabel renderInPortal dy={20}/>}
                                data={this.dataTwo}
                            />

                            <VictoryLegend
                                x={this.state.width / 2 - 50} y={0}
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                style={{border: {stroke: "#eee"}, title: {fontSize: 20}}}
                                data={[
                                    {name: "Personnel", symbol: {fill: "tomato"}},
                                    {name: "Moyenne des autres utilisateurs", symbol: {fill: "gold"}}
                                ]}
                            />
                        </VictoryChart>
                    </View>

                    <View style={styles.container2}>
                        <View style={styles.leftBottomContainer}>

                            <SubTitleComponent title={"Détail par catégories"}/>

                            {
                                this.categories.map((cat) => {
                                    return (
                                        <CategoryDetailComponent key={cat.key} pastilleColor={"#000"} text={cat.key}/>
                                    )
                                })
                            }


                        </View>
                        <View style={styles.rightBottom}>
                            <SubTitleComponent title={"Pourcentage de bonnes réponses"}/>
                            <VictoryChart polar width={400} height={460} theme={VictoryTheme.material}>

                                <VictoryLegend
                                    x={10} y={0}
                                    centerTitle
                                    orientation="horizontal"
                                    gutter={20}
                                    style={{border: {stroke: "#eee"}, title: {fontSize: 20}}}
                                    data={[
                                        {name: "Personnel", symbol: {fill: "tomato"}},
                                        {name: "Moyenne des autres utilisateurs", symbol: {fill: "gold"}}
                                    ]}
                                />

                                <VictoryGroup colorScale={["tomato", "gold"]}
                                              style={{data: {fillOpacity: 0.2, strokeWidth: 2}}}>
                                    {this.state.data.map((data, i) => {
                                        return <VictoryArea key={i} data={data}/>;
                                    })}
                                </VictoryGroup>
                                {
                                    Object.keys(this.state.maxima).map((key, i) => {
                                        return (
                                            <VictoryPolarAxis
                                                key={i} dependentAxis style={axisStyle}
                                                tickLabelComponent={
                                                    <VictoryLabel labelPlacement="vertical"/>
                                                }
                                                labelPlacement="perpendicular"
                                                axisValue={i + 1} label={key}
                                                tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                                                tickValues={[0.25, 0.5, 0.75, 1]}
                                            />
                                        );
                                    })
                                }
                                <VictoryPolarAxis
                                    labelPlacement="parallel"
                                    tickFormat={() => ""}
                                    style={{
                                        axis: {stroke: "none"},
                                        grid: {stroke: "grey", opacity: 0.5}
                                    }}
                                />

                            </VictoryChart>
                        </View>
                    </View>


                </ScrollView>
            </View>
        )
    }

    _renderItem = ({ item }) => <Text>{item.email}</Text>

    getMaxima(data) {
        const groupedData = Object.keys(data[0]).reduce((memo, key) => {
            memo[key] = data.map((d) => d[key]);
            return memo;
        }, {});
        return Object.keys(groupedData).reduce((memo, key) => {
            memo[key] = 100;
            return memo;
        }, {});
    }

    processData(data) {
        const maxByGroup = this.getMaxima(data);
        const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return {x: key, y: d[key] / maxByGroup[key]};
            });
        };
        return data.map((datum) => makeDataArray(datum));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stats: {
        flex: 1,
        // flexDirection: 'column',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
    },
    responseTime: {
        backgroundColor: '#fff',
        padding: 10,
        borderColor: '#eee',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
    },
    leftBottomContainer: {
        width: '40%',
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    rightBottom: {
        width: '60%',
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
    label: {
        color: "#555"
    },
});

const axisStyle = {
    axisLabel: {padding: 30},
    axis: {stroke: "none"},
    grid: {
        stroke: "grey",
        strokeWidth: 0.25,
        opacity: 0.5
    }
};