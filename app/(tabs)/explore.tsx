import { StyleSheet, Image, Alert, View, Text, ActivityIndicator, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [drinks, setDrinks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSearch(query: string): Promise<void> {
    setLoading(true);  // Set loading to true when search starts
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();

      if (data.drinks) {
        setDrinks(data.drinks);  // Populate the drinks state
      } else {
        Alert.alert('No results found');
        setDrinks([]);  // Empty the drinks state if no results
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      Alert.alert('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);  // Set loading to false when search ends
    }
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
      <Text style={styles.drinkName}>{item.strDrink}</Text>
      <Text>{item.strCategory}</Text>
      <Text>{item.strInstructions}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Saved Drinks 🍸</ThemedText>
      <SearchBar placeholder="Search items..." onSearch={handleSearch} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={drinks}
          keyExtractor={(item) => item.idDrink}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No drinks found</Text>}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginTop: 50,
    marginBottom: 20
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  drinkName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
