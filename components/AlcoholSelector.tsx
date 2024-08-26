import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { DrinkCard } from './DrinkCard';
import { DrinkType } from '@/constants/Types';

const alcoholTypes = [
  { name: 'Vodka', icon: 'wine-outline' },
  { name: 'Rum', icon: 'beer-outline' },
  { name: 'Tequila', icon: 'bottle-outline' },
  { name: 'Whiskey', icon: 'glass-outline' },
  { name: 'Gin', icon: 'wine-outline' },
];

export default function AlcoholSelector() {
  const [drinks, setDrinks] = useState<{ [key: string]: DrinkType[] }>({});
  const [selectedDrink, setSelectedDrink] = useState<{ [key: string]: DrinkType | null }>({});

  const fetchDrinks = (alcohol: string) => {
    if (drinks[alcohol]) return; // If drinks are already loaded, do nothing

    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`)
      .then((response) => {
        setDrinks((prevDrinks) => ({
          ...prevDrinks,
          [alcohol]: response.data.drinks,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  };

  const fetchDrinkDetails = (drinkId: string, alcohol: string) => {
    if (selectedDrink[drinkId]) return; // If drink details are already loaded, do nothing

    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
      .then((response) => {
        const drinkDetails = response.data.drinks[0];
        setSelectedDrink((prevSelectedDrink) => ({
          ...prevSelectedDrink,
          [drinkId]: drinkDetails,
        }));
      })
      .catch((error) => {
        console.error('Error fetching drink details: ', error);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.alcoholContainer}>
        {alcoholTypes.map((alcohol) => (
          <Collapsible
            key={alcohol.name}
            title={alcohol.name}
            onPress={() => fetchDrinks(alcohol.name)} // Pass the fetch function
          >
            {drinks[alcohol.name]?.map((drink) => (
              <Collapsible
                key={drink.idDrink}
                title={drink.strDrink}
                onPress={() => fetchDrinkDetails(drink.idDrink, alcohol.name)}
              >
                {selectedDrink[drink.idDrink] ? (
                  <DrinkCard drink={selectedDrink[drink.idDrink]!} />
                ) : (
                  <ThemedView style={styles.loadingContainer}>
                    <ThemedText>Loading...</ThemedText>
                  </ThemedView>
                )}
              </Collapsible>
            ))}
          </Collapsible>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  alcoholContainer: {
    marginBottom: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
