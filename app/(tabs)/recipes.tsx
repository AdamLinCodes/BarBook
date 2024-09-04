import { StyleSheet, Image, View, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import AlcoholSelector from '@/components/AlcoholSelector';
import SearchBar from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';

export default function TabFourScreen() {

  async function handleSearch(query: string): Promise<void> {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();

      if (data.drinks) {
        console.log('Search results:', data.drinks);
      } else {
        Alert.alert('No results found');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      Alert.alert('An error occurred while searching. Please try again.');
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/barshelf.jpg')}
          style={styles.barshelfLogo}
        />
      }>

      <ThemedText type="title">Pick your poison 🍸</ThemedText>

      <SearchBar placeholder="Search items..." onSearch={handleSearch} />

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
