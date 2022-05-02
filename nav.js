import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from './colors';

const touchtest = () => {
    Alert.alert("touch");
}
const Nav = () => {

    return (
        <View>
            <TouchableOpacity onPress={() => touchtest()}>
                <Text style={styles.test}>nav</Text>
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