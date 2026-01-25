import React from 'react';
import { StyleSheet, View } from 'react-native';
import Landing from './screens/landing';

export default function index() {

  return (
    <View style={styles.container}>
      <Landing />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },

})

