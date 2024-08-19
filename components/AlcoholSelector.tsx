import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

const alcoholTypes = [
  { name: 'Vodka', icon: 'wine-outline' },
  { name: 'Rum', icon: 'beer-outline' },
  { name: 'Tequila', icon: 'bottle-outline' },
  { name: 'Whiskey', icon: 'glass-outline' },
  { name: 'Gin', icon: 'wine-outline' },
];

interface DrinkSummary {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

export default function AlcoholSelector() {
  const [drinks, setDrinks] = useState<{ [key: string]: DrinkSummary[] }>({});

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
              <Collapsible key={drink.idDrink} title={drink.strDrink}>
                <ThemedText>{drink.strDrink}</ThemedText>
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
});
