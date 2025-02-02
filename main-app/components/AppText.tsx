import { Text, type TextProps } from 'react-native';

export function AppText({ style, ...otherProps }: TextProps) {
  return <Text style={[{ fontFamily: 'Roboto' }, style]} {...otherProps} />;
}
