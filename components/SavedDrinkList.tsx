import { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedDrinkList() {
    const [bookmarkedDrinks, setBookmarkedDrinks] = useState<{ [key: string]: any }>({});

    // Load saved drinks from AsyncStorage when component mounts
    useEffect(() => {
        const loadBookmarkedDrinks = async () => {
            try {
                const savedBookmarks = await AsyncStorage.getItem('bookmarkedDrinks');
                if (savedBookmarks) {
                setBookmarkedDrinks(JSON.parse(savedBookmarks));
                }
            }
            catch (error) {
                console.error('Failed to load bookmarks from storage:', error);
            }
        };
        loadBookmarkedDrinks();
    }, []);

    // Function to remove a saved drink
    const removeSavedDrink = async (drinkId: string) => {
        const updatedBookmarks = { ...bookmarkedDrinks };
        delete updatedBookmarks[drinkId]; // Remove the drink

        setBookmarkedDrinks(updatedBookmarks); // Update the state

        // Save the updated bookmarks back to AsyncStorage
        await AsyncStorage.setItem('bookmarkedDrinks', JSON.stringify(updatedBookmarks));
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
                onPress={() => removeSavedDrink(item.idDrink)}
            >
                <Ionicons name='trash-outline' size={24} color='red' />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {Object.keys(bookmarkedDrinks).length === 0 ? (
                <Text>No saved drinks</Text>
            ) : (
                <FlatList
                data={Object.values(bookmarkedDrinks)}
                keyExtractor={(item) => item.idDrink}
                renderItem={renderItem}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
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
