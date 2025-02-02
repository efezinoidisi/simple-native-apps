import { AppText } from '@/components/AppText';
import { Link } from 'expo-router';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Image
          source={require('@/assets/images/coding.jpg')}
          style={[styles.image, { width }]}
        />
        <View style={styles.linkContainer}>
          <AppText style={styles.text}>Simple Native App</AppText>

          <Link
            target='_blank'
            href={'https://github.com/efezinoidisi/simple-native-app'}
            style={[styles.link, { backgroundColor: '#ae8f60' }]}
          >
            Project Github
          </Link>
          <Link
            target='_blank'
            href={'http://hng.tech/hire/react-native-developers'}
            style={[styles.link, { backgroundColor: '#3A4A3F' }]}
          >
            Hire React Native Devs
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#EAE2D3',
  },
  image: {
    height: 200,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    marginBlock: 10,
    color: '#3A4A3F',
  },
  link: {
    color: '#f6f2f1',
    paddingBlock: 12,
    paddingInline: 20,
    borderRadius: 10,
    fontSize: 16,
    width: 240,
    textAlign: 'center',
  },
  linkContainer: {
    alignItems: 'center',
    gap: 10,
    flex: 0.8,
    justifyContent: 'center',
  },
});
