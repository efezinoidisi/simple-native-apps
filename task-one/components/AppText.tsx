import { Text, type TextProps } from 'react-native';

export function AppText({ style, ...otherProps }: TextProps) {
  return (
    <Text
      style={[{ fontFamily: 'Roboto', fontSize: 16, color: '#1B1D1A' }, style]}
      {...otherProps}
    />
  );
}
