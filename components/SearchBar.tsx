import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (text: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (text: string) => {
    setSearchText(text);

    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`);
      const data = await response.json();

      if (data.drinks) {
        // Handle the response data here
        console.log('Search results:', data.drinks);
      } else {
        Alert.alert('No results found');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      Alert.alert('An error occurred while searching. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Search...'}
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
