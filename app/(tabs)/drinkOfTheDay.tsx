import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { DrinkCardFull } from '@/components/DrinkCardFull';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DrinkType } from '@/constants/Types';
import { ThemedText } from '@/components/ThemedText';

export default function TabThreeScreen() {

	const [drink, setDrink] = useState<DrinkType | null>(null);

	useEffect(() => {
		// Fetch data from the API
		axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
			.then(response => {
				setDrink(response.data.drinks[0]);
			})
			.catch(error => {
				console.error("Error fetching data: ", error);
			});
	}, []);

	if (!drink) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Loading...</Text>

			</View>
		);
	}
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<Image
					source={require('@/assets/images/barshelf.jpg')}
					style={styles.barshelfLogo}
				/>
			}
		>
			
			<ThemedText type='title'>Todays Drink of the day is...</ThemedText>

			<DrinkCardFull drink={drink}/>

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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
