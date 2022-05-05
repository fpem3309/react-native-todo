import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from './colors';
import { Calendar } from 'react-calendar';

const touchtest = () => {
    Alert.alert("touch");
}
const Nav = () => {

    return (
        <View>
            <TouchableOpacity onPress={() => touchtest()}>
                <Text style={styles.test}>nav</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => touchtest()}>
                <Text style={styles.test}>nav2</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => touchtest()}>
                <Text style={styles.test}>nav3</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    test: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
});

export default Nav;