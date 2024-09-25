import { StyleSheet, Image, Alert, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabTwoScreen() {
  const [drinks, setDrinks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<{ [key: string]: any }>({});  // Store entire drink object

  // Load bookmarked drinks from AsyncStorage when the component mounts
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const savedBookmarks = await AsyncStorage.getItem('bookmarkedDrinks');

        if (savedBookmarks !== null) {
          const parsedBookmarks = JSON.parse(savedBookmarks);
          setBookmarked(parsedBookmarks);
        }
      }
      catch (error) {
        console.error('Failed to load bookmarks from storage:', error);
      }
    };
    loadBookmarks();
  }, []);

  // Save bookmarked drinks to AsyncStorage whenever it changes
  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        // Only save if bookmarked is not empty
        if (Object.keys(bookmarked).length > 0) {
          await AsyncStorage.setItem('bookmarkedDrinks', JSON.stringify(bookmarked));
        }
      }
      catch (error) {
        console.error('Failed to save bookmarks to storage:', error);
      }
    };
    saveBookmarks();
  }, [bookmarked]);

  async function handleSearch(query: string): Promise<void> {

    setLoading(true);  // Set loading to true when search starts

    try {
      if (query === "") {
        setDrinks([]);
      }
      else {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (data.drinks) {
          setDrinks(data.drinks);  // Populate the drinks state
        }
        else {
          Alert.alert('No results found');
          setDrinks([]);  // Empty the drinks state if no results
        }
      }
    }
    catch (error) {
      console.error('Error fetching search results:', error);
      Alert.alert('An error occurred while searching. Please try again.');
    }
    finally {
      setLoading(false);  // Set loading to false when search ends
    }
  }

  const toggleBookmark = (drink: any) => {
    setBookmarked((prevBookmarks) => {
      
      const updatedBookmarks = { ...prevBookmarks };

      if (updatedBookmarks[drink.idDrink]) {
        // If already bookmarked, remove the drink
        delete updatedBookmarks[drink.idDrink];
      } else {
        // Otherwise, add the full drink object
        updatedBookmarks[drink.idDrink] = drink;
      }

      return updatedBookmarks;
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />

      <View style={styles.cardInfo}>
        <Text style={styles.drinkName}>{item.strDrink}</Text>
        <Text>{item.strCategory}</Text>
      </View>

      <TouchableOpacity
        style={styles.bookmark}
        onPress={() => toggleBookmark(item)}
      >
        <Ionicons
          name={bookmarked[item.idDrink] ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={bookmarked[item.idDrink] ? 'gold' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Search Our Database 🍸</ThemedText>
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
    flexDirection: 'row', // Align the image and text horizontally
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
  cardInfo: {
    marginHorizontal: 10,
  },
  bookmark: {
    marginLeft: 'auto',
    marginVertical: 'auto',
  },
  image: {
    width: '20%',
    height: 75,
    borderRadius: 5,
  },
  drinkName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
