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
        color: "#000",
        fontSize: 40,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: "bold"
    }
});
