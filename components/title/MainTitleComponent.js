import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MainTitle extends React.Component {
    render() {
        return (
            <Text h1 style={styles.container}>{this.props.title}</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        color: "#43425D",
        fontSize: 30,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: "bold"
    }
});
