import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '@/components/SearchBar';
import DrinkList from '@/components/DrinkList';

export default function TabTwoScreen() {
	const [drinks, setDrinks] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [bookmarked, setBookmarked] = useState<{ [key: string]: any }>({});

	useEffect(() => {
		const loadBookmarks = async () => {
			try {
				const savedBookmarks = await AsyncStorage.getItem('bookmarkedDrinks');

				if (savedBookmarks !== null) {
					setBookmarked(JSON.parse(savedBookmarks));
				}
			}
			catch (error) {
				console.error('Failed to load bookmarks from storage:', error);
			}
		};
		loadBookmarks();
	}, []);

	useEffect(() => {
		const saveBookmarks = async () => {
			if (Object.keys(bookmarked).length > 0) {
				try {
					await AsyncStorage.setItem('bookmarkedDrinks', JSON.stringify(bookmarked));
				}
				catch (error) {
					console.error('Failed to save bookmarks to storage:', error);
				}
			}
		};
		saveBookmarks();
	}, [bookmarked]);

	async function handleSearch(query: string): Promise<void> {
		setLoading(true);
		try {
			if (!query) {
				setDrinks([]);
			}
			else {
				const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
				const data = await response.json();

				if (data.drinks) {
					setDrinks(data.drinks);
				}
				else {
					Alert.alert('No results found');
					setDrinks([]);
				}
			}
		}
		catch (error) {
			console.error('Error fetching search results:', error);
			Alert.alert('An error occurred while searching. Please try again.');
		}
		finally {
			setLoading(false);
		}
	}

	const toggleBookmark = (drink: any) => {
		setBookmarked((prevBookmarks) => {
			const updatedBookmarks = { ...prevBookmarks };

			if (updatedBookmarks[drink.idDrink]) {
				delete updatedBookmarks[drink.idDrink];
			}
			else {
				updatedBookmarks[drink.idDrink] = drink;
			}

			return updatedBookmarks;
		});
	};

	return (
		<ThemedView style={{ padding: 20 }}>
			<ThemedText type="title" style={{ marginTop: 50, marginBottom: 20 }}>
				Search Our Database 🍸
			</ThemedText>

			<SearchBar placeholder="Search items..." onSearch={handleSearch} />

			<DrinkList drinks={drinks} loading={loading} bookmarked={bookmarked} onToggleBookmark={toggleBookmark} />
		</ThemedView>
	);
}