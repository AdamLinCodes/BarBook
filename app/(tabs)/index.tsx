import { Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

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

      <ThemedText type='default'>
        Welcome back to your own personal Barbook, filled with over a hundred cocktail 
        recipes. This app uses TheCocktailDB API for all its information and is built 
        using React Native. If you want to learn more about the developer or contribute 
        to the code, below I’ve linked my LinkedIn as well as the source code for this 
        project. Cheers everyone <ThemedText type='title'>🍻</ThemedText>
      </ThemedText>

      <ThemedView style={styles.linkContainer}>
        <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/adam-lin-7314ab19a/')}>
          <Image
            source={require('@/assets/images/linkedin.png')}
            style={styles.link}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://github.com/AdamLinCodes/BarBook')}>
          <Image
            source={require('@/assets/images/github.png')}
            style={styles.link}
          />
        </TouchableOpacity>
      </ThemedView>

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
  linkContainer: {
    flexDirection: 'row', // Aligns children (images) in a row
  },
  link: {
    height:75,
    width:75,
    marginHorizontal: 10,
  }
});
