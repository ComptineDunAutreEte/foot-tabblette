import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SubTitleComponent extends React.Component {
    render() {
        return (
            <Text h2 style={styles.container}>{this.props.title}</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        color: "#000",
        fontSize: 25,
        marginBottom: 15,
        fontWeight: "bold"
    }
});
