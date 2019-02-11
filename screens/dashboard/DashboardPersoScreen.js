import React from "react";
import { Dimensions, Text, View, StyleSheet, ScrollView } from 'react-native';
import {
    VictoryBar, VictoryChart, VictoryLabel, VictoryLegend,
    VictoryTheme, VictoryPolarAxis, VictoryGroup, VictoryArea, VictoryAxis
} from "victory-native";
import SubTitleComponent from "../../components/title/SubTitleComponent";
import CategoryDetailComponent from "../../components/dashboard/CategoryDetailComponent";
import { categories } from "../../model/categories";
import { responseLevels } from "../../model/response-levels";

export default class DashboardPersoScreen extends React.Component {

    constructor(props) {
        super(props);

        const persoDatas = this.props.persoDatas;

        const userResponses = persoDatas.userResponses;
        const generalResponses = persoDatas.generalResponses;

        this.userDatas = this.retrieveResponses(userResponses);
        this.generalDatas = this.retrieveResponses(generalResponses);

        this.goodResponsesByCategories = [[], []];

        categories.forEach((category) => {
            this.goodResponsesByCategories[0].push({
                category: category.key,
                goodResponses: 0,
                totalQuestions: 0
            });
            this.goodResponsesByCategories[1].push({
                category: category.key,
                goodResponses: 0,
                totalQuestions: 0
            })
        });

        this.averageResponsesTime = 0;
        this.totalQuestions = 0;
        this.goodResponses = 0;
        this.tickValues = [];

        userResponses.forEach((userResponse, i) => {
            const cat = this.goodResponsesByCategories[0].find((c) => c.category === userResponse.category);
            cat.totalQuestions++;
            if (userResponse.isGoodResponse) {
                cat.goodResponses++;
                this.goodResponses++;
            }

            this.averageResponsesTime += userResponse.responseTime;
            this.totalQuestions++;
            this.tickValues.push(i + 1);
        });

        if (this.totalQuestions > 0) {
            this.averageResponsesTime /= this.totalQuestions;
        }

        this.averageResponsesTime = Math.round(this.averageResponsesTime * 10) / 10;
        this.goodResponsesPercentage = this.goodResponses * 100 / this.totalQuestions;
        this.responsesLevels = this.getUserLevel(this.goodResponsesPercentage);
        this.userLevel = this.responsesLevels.level;
        this.userColorLevel = this.responsesLevels.color;
        this.chartWidth = this.generalDatas.length > 20 ? Dimensions.get('window').width + 200 : Dimensions.get('window').width;

        generalResponses.forEach((generalResponse) => {
            const cat = this.goodResponsesByCategories[1].find((c) => c.category === generalResponse.category);
            cat.totalQuestions++;
            if (generalResponse.isGoodResponse) {
                cat.goodResponses++;
            }
        });

        this.characterDatas = [{}, {}];
        this.goodResponsesByCategories[0].forEach((data) => {
            if (data.totalQuestions > 0) {
                this.characterDatas[0][data.category] = parseInt((data.goodResponses * 100) / data.totalQuestions);
            } else {
                this.characterDatas[0][data.category] = 0;
            }
        });

        this.goodResponsesByCategories[1].forEach((data) => {
            if (data.totalQuestions > 0) {
                this.characterDatas[1][data.category] = parseInt((data.goodResponses * 100) / data.totalQuestions);
            } else {
                this.characterDatas[1][data.category] = 0;
            }
        });

        generalResponses.forEach((generalResponse) => {
            const cat = this.goodResponsesByCategories[1].find((c) => c.category === generalResponse.category);
            cat.totalQuestions++;
            if (generalResponse.isGoodResponse) {
                cat.goodResponses++;
            }
        });

        this.categories = categories;

        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            data: this.processData(this.characterDatas),
            maxima: this.getMaxima(this.characterDatas)
        };

        this.nQuestions = [];
        for (let i = 1; i < this.userDatas.length + 1; i++) {
            this.nQuestions.push(i.toString());
        }
    }

    retrieveResponses(responses) {
        let datas = [];

        responses.forEach((response, i) => {
            datas.push({
                x: i + 1,
                y: response.responseTime
            });
        });

        return datas;
    }

    getUserLevel(goodResponsesPercentage) {
        return responseLevels.find((l) => {
            return l.min <= goodResponsesPercentage && l.max >= goodResponsesPercentage;
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.stats}>

                    <View style={styles.infosTop}>
                        <View style={styles.bloc1}>
                            <Text style={styles.statTextBloc}>{this.averageResponsesTime} s</Text>
                            <Text style={{textAlign: "center"}}>Temps moyen</Text>
                        </View>

                        <View style={styles.bloc2}>
                            <Text style={styles.statTextBloc}>{this.goodResponses} / {this.totalQuestions}</Text>
                            <Text style={{textAlign: "center"}}>Bonnes réponses</Text>
                        </View>

                        <View style={{
                            flexGrow: 1,
                            backgroundColor: this.userColorLevel,
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
                            }}>{this.userLevel}</Text>
                            <Text style={{textAlign: "center", color: "#fff"}}>Votre niveau</Text>
                        </View>
                    </View>

                    <View style={styles.responseTime}>
                        <SubTitleComponent title={"Temps de réponse par questions"}/>

                        <ScrollView horizontal={true}>
                            <VictoryChart theme={VictoryTheme.material} domain={{x: [0, this.generalDatas.length + 1]}} width={this.chartWidth} height={350}>
                                <VictoryAxis tickValues={this.tickValues} label="Numéro de question" offsetY={49} style={{ axisLabel: {padding: 30} }}/>
                                <VictoryAxis label="Temps de réponses en secondes" dependentAxis offsetX={50} style={{ axisLabel: {padding: 30} }} />

                                <VictoryGroup offset={12} style={{data: {width: 10}}} colorScale={["tomato", "gold"]}>
                                    <VictoryBar data={this.userDatas} labels={(d) => `${d.y}`}/>
                                    <VictoryBar data={this.generalDatas} labels={(d) => `${d.y}`} />
                                </VictoryGroup>

                                <VictoryLegend
                                    x={this.state.width / 2 - 150} y={0}
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
                        </ScrollView>
                    </View>

                    <View style={styles.container2}>
                        <View style={styles.leftBottomContainer}>

                            <SubTitleComponent title={"Détail par catégories"}/>

                            {
                                this.categories.map((category) => {
                                    const myStatistique = this.goodResponsesByCategories[0].find((s) => s.category === category.key);

                                    if (myStatistique) {
                                        return (
                                            <CategoryDetailComponent
                                                key={category.key}
                                                pastilleColor={category.color}
                                                categoryTitle={category.key}
                                                goodResponses={myStatistique.goodResponses}
                                                totalQuestions={myStatistique.totalQuestions}
                                            />
                                        );
                                    }
                                })
                            }
                        </View>
                        <View style={styles.rightBottom}>
                            <SubTitleComponent title={"Pourcentage de bonnes réponses"}/>
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
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
                                </VictoryChart>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

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
        padding: 20,
        backgroundColor: "#f9f9f9"
    },
    stats: {
        flex: 1,
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
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
    bloc3: {},
    statTextBloc: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10,
    },
    responseTime: {
        backgroundColor: '#fff',
        padding: 20,
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
        padding: 20,
        marginRight: 10,
        borderRadius: 5,
    },
    rightBottom: {
        width: '60%',
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 20,
        paddingBottom: -30,
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