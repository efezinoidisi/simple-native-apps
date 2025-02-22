import Viewer from '@/components/Viewer';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('screen');

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle={'default'} backgroundColor={'#000000'} animated />
        <Viewer />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    
  },
  text: {
    fontSize: 20,
  },
});
