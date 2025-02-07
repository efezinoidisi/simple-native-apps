import { type ComponentProps } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppText } from './AppText';

type InputFieldProps = ComponentProps<typeof TextInput> & {
  label: string;
};

const InputField = ({ label, ...otherProps }: InputFieldProps) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <TextInput style={styles.input} {...otherProps} />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    borderRadius: 8,
    height: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: 600,
  },
});
