import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { faFutbol } from "@fortawesome/free-solid-svg-icons/faFutbol";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default class CategoryDetailComponent extends React.Component {

    constructor(props) {
        super(props);

        this.pastilleColor = this.props.pastilleColor;
    }

    render() {
        return (
            <View style={styles.category}>
                <View style={{
                    width: 35,
                    height: 35,
                    backgroundColor: this.pastilleColor,
                    marginRight: 10,
                    borderRadius: 100
                }}>

                    <FontAwesomeIcon icon={faFutbol} style={{color: this.pastilleColor}} size={30} />

                </View>
                <View style={styles.stats}>
                    <View style={styles.catName}>
                        <Text style={{color: this.pastilleColor, fontWeight: "bold"}}>
                            {this.props.categoryTitle}
                        </Text>
                    </View>
                    <View>
                        <Text style={{color: "#555"}}>Bonnes réponses : {this.props.goodResponses} / {this.props.totalQuestions}</Text>
                    </View>
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
    stats: {},
    catName: {
        fontWeight: "bold"
    }
});
