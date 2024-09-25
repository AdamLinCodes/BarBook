import { StyleSheet, Image, View, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import SavedDrinkList from '@/components/SavedDrinkList';

export default function TabFourScreen() {

  return (
    <View>
      <Image
        source={require('@/assets/images/barshelf.jpg')}
        style={styles.barshelfLogo}
      />
      <ThemedText type="title">Saved Drinks 🍸</ThemedText>
      <ThemedText type="subtitle">This page, we need to figure out how to store the drink data locally on the device. It shouldn't be fetching everytime.</ThemedText>
      {/* <AlcoholSelector/> */}

      <SavedDrinkList></SavedDrinkList>
    </View>
  );
}

const styles = StyleSheet.create({
  barshelfLogo: {
    height: 250,
    width: 480,
    bottom: 0,
    left: 0,
  },
});
