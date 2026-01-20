import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function index() {

  return (
    <View style={styles.container}>
      <Text style={{
        fontFamily: 'Roboto_500Medium',
        fontSize: 36,
      }}>
        Everyone freedom th
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})

