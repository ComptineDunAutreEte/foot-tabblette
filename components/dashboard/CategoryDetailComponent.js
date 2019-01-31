import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
    Circle as SVGCircle,
} from 'react-native-svg';

export default class CategoryDetailComponent extends React.Component {

    constructor(props) {
        super(props);

        this.pastilleColor = this.props.pastilleColor;
    }
    render() {
        return (
            <View style={styles.category}>
                <View style={styles.pastilleColor}><Text>.</Text></View>
                <View style={styles.stats}>
                    <View style={styles.catName}><Text>{this.props.text}</Text></View>
                    <View><Text>{this.props.text}</Text></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    category: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    pastilleColor: {
        width: 35,
        height: 35,
        backgroundColor: "#000",
        marginRight: 10,
        borderRadius: 100
    },
    stats: {

    },
    catName: {
        fontWeight: "bold"
    }
});
