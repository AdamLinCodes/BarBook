import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrinkType } from '@/constants/Types';

interface DrinkCardFullProps {
    drink: DrinkType;
}

export function DrinkCardFull({ drink }: DrinkCardFullProps) {
    const ingredients = Array.from({ length: 15 }, (_, i) => ({
        ingredient: drink[`strIngredient${i + 1}` as keyof DrinkType],
        measure: drink[`strMeasure${i + 1}` as keyof DrinkType],
    })).filter(item => item.ingredient);
    
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>{drink.strDrink}</Text>
            <View style={styles.divider} />
            <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
            <Text style={styles.glass}>Served in a {drink.strGlass}</Text>
            <Text style={styles.instructions}>
                <Text style={{ fontWeight: 'bold' }}>NB. </Text>
                {drink.strInstructions}
            </Text>
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            {ingredients.map((item, index) => (
                <Text key={index}> {index + 1}) {item.measure} {item.ingredient}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE1BB',
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
    instructions: {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 16,
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
});
