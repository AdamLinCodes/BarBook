import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/negroni.jpg')}
          style={styles.negroniLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hey you!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText type="subtitle">Welcome back to your recipe book</ThemedText>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  negroniLogo: {
    height: 270,
    width: 480,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
