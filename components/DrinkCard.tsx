import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';

interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string | null;
    strTags: string | null;
    strVideo: string | null;
    strCategory: string;
    strIBA: string | null;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strInstructionsES: string | null;
    strInstructionsDE: string | null;
    strInstructionsFR: string | null;
    strInstructionsIT: string | null;
    "strInstructionsZH-HANS": string | null;
    "strInstructionsZH-HANT": string | null;
    strDrinkThumb: string;
    strIngredient1: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strIngredient11: string | null;
    strIngredient12: string | null;
    strIngredient13: string | null;
    strIngredient14: string | null;
    strIngredient15: string | null;
    strMeasure1: string | null;
    strMeasure2: string | null;
    strMeasure3: string | null;
    strMeasure4: string | null;
    strMeasure5: string | null;
    strMeasure6: string | null;
    strMeasure7: string | null;
    strMeasure8: string | null;
    strMeasure9: string | null;
    strMeasure10: string | null;
    strMeasure11: string | null;
    strMeasure12: string | null;
    strMeasure13: string | null;
    strMeasure14: string | null;
    strMeasure15: string | null;
    strImageSource: string | null;
    strImageAttribution: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
}

// Define the DrinkCard component
export function DrinkCard() {
    const [drink, setDrink] = useState<Drink | null>(null);

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
        <View style={styles.cardContainer}>
            <Card.Title>{drink.strDrink}</Card.Title>
            <Card.Divider />
            <Image
                source={{ uri: drink.strDrinkThumb }}
                style={styles.image}
            />
            <Text style={styles.glass}>Glass: {drink.strGlass}</Text>
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            {drink.strIngredient1 && <Text>- {drink.strMeasure1} {drink.strIngredient1}</Text>}
            {drink.strIngredient2 && <Text>- {drink.strMeasure2} {drink.strIngredient2}</Text>}
            {drink.strIngredient3 && <Text>- {drink.strMeasure3} {drink.strIngredient3}</Text>}
            {/* Add more ingredients if necessary */}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20, // Adjust this value for more or less rounded corners
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
    },
    glass: {
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    ingredientsTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
