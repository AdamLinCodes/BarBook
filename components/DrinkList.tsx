import { FlatList, ActivityIndicator, Text } from 'react-native';
import DrinkCard from './DrinkCard';

interface DrinkListProps {
    drinks: any[];
    loading: boolean;
    bookmarked: { [key: string]: any };
    onToggleBookmark: (drink: any) => void;
}

export default function DrinkList({ drinks, loading, bookmarked, onToggleBookmark }: DrinkListProps) {
    const renderItem = ({ item }: { item: any }) => (
        <DrinkCard
            drink={item}
            isBookmarked={!!bookmarked[item.idDrink]}
            onToggleBookmark={() => onToggleBookmark(item)}
        />
    );

    return (
        <>
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
        </>
    );
}
