import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DrinkCard({ drink, isBookmarked, onToggleBookmark }: { drink: any, isBookmarked: boolean, onToggleBookmark: () => void }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />

            <View style={styles.cardInfo}>
                <Text style={styles.drinkName}>{drink.strDrink}</Text>
                <Text>{drink.strCategory}</Text>
            </View>

            <TouchableOpacity style={styles.bookmark} onPress={onToggleBookmark}>
                <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={isBookmarked ? 'gold' : 'gray'}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
