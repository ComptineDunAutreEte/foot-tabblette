import React from "react";
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

export default class DashboardHistoryScreen extends React.Component {

    constructor(props) {
        super(props);

        this.sections = this.props.history;

        this.state = {
            activeSections: [],
            collapsed: true,
            multipleSelect: false,
        };
    }

    render() {
        const { multipleSelect, activeSections } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingTop: 30 }}>
                    <Accordion
                        activeSections={activeSections}
                        sections={this.sections}
                        touchableComponent={TouchableOpacity}
                        expandMultiple={multipleSelect}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        duration={400}
                        onChange={this.setSections}
                    />
                </ScrollView>
            </View>
        );
    }

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {

        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.activeHeader : styles.inactiveHeader]}
                transition="backgroundColor"
            >
                { this.displayIcon(section) }
                <Text style={styles.headerText}>Question {section.questionNumber} : {section.question}</Text>
            </Animatable.View>
        );
    };

    displayIcon(section) {
        if (section.userResponseId === null) {
            return (<FontAwesomeIcon icon={faQuestion} style={{color: "#e64a19"}} size={20} />);
        } else {
            if (section.isGoodResponse) {
                return (<FontAwesomeIcon icon={faCheck} style={{color: "#43a047"}} size={20} />);
            } else {
                return (<FontAwesomeIcon icon={faTimes} style={{color: "#e64a19"}} size={20} />);
            }
        }
    }

    renderContent(section, _, isActive) {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.activeContent : styles.inactiveContent]}
                transition="backgroundColor"
            >
                {
                    section.responses.map((response) => {
                        return (
                            <Animatable.Text animation={isActive ? 'ease-in-out' : undefined}>
                                <Text style={[
                                    {fontSize: 14},
                                    response.isValid ?
                                        (section.userResponseId === response.id ? {color: "green", fontWeight: "bold"} : {color: "green", fontWeight: "normal"}) :
                                        (section.userResponseId === response.id ? {color: "red", fontWeight: "bold"} : {color: "black", fontWeight: "normal"})
                                ]}>{response.response}</Text>
                            </Animatable.Text>


                        )
                    })
                }
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9"
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        flexDirection: 'row',
    },
    headerText: {
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5
    },
    activeHeader: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"

    },
    inactiveHeader: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    },
    activeContent: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    },
    inactiveContent: {

    },

    validResponse: {
        color: "green",
        fontWeight: "bold"
    },
    invalidResponse: {
        color: "red",
    },
    neutralResponse: {
        color: "black"
    }
});