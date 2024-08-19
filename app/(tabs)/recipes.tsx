import { StyleSheet, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import AlcoholSelector from '@/components/AlcoholSelector';

export default function TabFourScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/barshelf.jpg')}
          style={styles.barshelfLogo}
        />
      }>

      <AlcoholSelector/>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  barshelfLogo: {
    height: 250,
    width: 480,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
