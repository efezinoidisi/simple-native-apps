import { decrypt, encrypt } from '@/utils';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppText } from './AppText';
import InputField from './InputField';

const UserInputForm = () => {
  const defaultFormValues = {
    plainText: '',
    secretKey: '',
  };

  const defaultResult = {
    heading: '',
    body: '',
  };

  const [formData, setFormData] = useState(defaultFormValues);

  const [error, setError] = useState('');

  const [result, setResult] = useState(defaultResult);

  const handleInputChange = (name: string, value: string) => {
    if (error) {
      setError('');
    }

    if (result) {
      setResult(defaultResult);
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleValidation = () => {
    if (!formData.plainText || !formData.secretKey) {
      setError('Plain text and Secret key are Required!');

      return false;
    }

    return true;
  };

  const handleEncryption = () => {
    const isValid = handleValidation();

    console.log(isValid);

    if (!isValid) return;

    const encryptedText = encrypt(formData.plainText, formData.secretKey);
    setResult({
      heading: 'Encrypted Text:',
      body: encryptedText,
    });
  };

  const handleDecryption = () => {
    const isValid = handleValidation();

    if (!isValid) return;

    const decryptedText = decrypt(formData.plainText, formData.secretKey);
    setResult({
      heading: 'Decrypted Text:',
      body: decryptedText,
    });
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(result.body);
  };

  const handleReset = () => {
    setFormData(defaultFormValues);
    setError('');
    setResult(defaultResult);
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={{ position: 'relative', height: 55 }}>
        {error ? <AppText style={styles.error}>{error}</AppText> : null}
      </View>
      <View
        style={{
          borderWidth: 1,
          marginInline: 14,
          marginBlock: 10,
          borderRadius: 6,
          padding: 10,
          marginTop: 15,
        }}
      >
        <InputField
          label='Plain text'
          value={formData.plainText}
          onChangeText={(text) => handleInputChange('plainText', text)}
          placeholder='Enter any text here'
        />
        <InputField
          label='Secret key'
          value={formData.secretKey}
          onChangeText={(text) => handleInputChange('secretKey', text)}
          placeholder='Enter your secret key'
        />

        <View style={{ flexDirection: 'row', marginBlock: 10, gap: 6 }}>
          <TouchableOpacity
            onPress={handleEncryption}
            style={[styles.button, { backgroundColor: '#97D6DF' }]}
          >
            <Text style={styles.buttonText}>Encrypt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDecryption}
            style={[styles.button, { backgroundColor: '#68121127' }]}
          >
            <Text style={styles.buttonText}>Decrypt</Text>
          </TouchableOpacity>
        </View>
      </View>

      {result.body ? (
        <View style={{ marginInline: 14, marginBottom: 20 }}>
          <View style={{ alignSelf: 'flex-end' }}>
            <TouchableOpacity
              onPress={handleReset}
              style={[styles.button, styles.reset]}
            >
              <AppText style={{ color: '#ffffff' }}>Reset</AppText>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 25 }}>
            <AppText style={styles.resultHeading}>{result.heading}</AppText>

            <View>
              <TouchableOpacity
                onPress={copyToClipboard}
                style={[styles.button, styles.copy]}
              >
                <AppText style={{ color: 'rgba(0,0,0,0.5)' }}>copy</AppText>
              </TouchableOpacity>

              <AppText style={styles.resultBody}>{result.body}</AppText>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default UserInputForm;

const styles = StyleSheet.create({
  button: {
    width: '49%',
    borderWidth: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  error: {
    textAlign: 'center',
    backgroundColor: 'rgba(255, 63, 26,0.4)',
    margin: 10,
    padding: 10,
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    borderRadius: 6,
  },
  copy: {
    alignSelf: 'flex-start',
    width: 'auto',
    paddingBlock: 2,
    paddingInline: 6,
    position: 'absolute',
    top: -18,
    right: 0,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  resultBody: {
    width: 'auto',
    textAlign: 'center',
    marginTop: 10,
    padding: 5,
    backgroundColor: '#ffffff',
  },
  reset: {
    backgroundColor: '#1b1d1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBlock: 15,
  },
  resultHeading: {
    fontWeight: 700,
  },
});
