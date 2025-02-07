import { AppText } from '@/components/AppText';
import UserInputForm from '@/components/UserInputForm';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Index() {
  const formData = useState({
    plainText: '',
    secretKey: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <AppText style={styles.text}>
          Data Encryption and Decryption App
        </AppText>

        <AppText style={{ textAlign: 'center' }}>
          Encrypt and decrypt data securely
        </AppText>

        <UserInputForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#E8EBF3',
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    marginBlock: 10,
    width: '90%',
    marginInline: 'auto',
  },
});
