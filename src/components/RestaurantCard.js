import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { colors } from '../styles';

export default function RestaurantCard({ venue }) {
  return (
    <View style={styles.card}>
      {/* Image or placeholder */}
      {venue.photoUrl && (
        <Image
          source={{ uri: venue.photoUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{venue.name}</Text>
        <View style={styles.tagsRow}>
          {venue.cuisines?.map((c) => (
            <View key={c} style={styles.tagChip}>
              <Text style={styles.tagText}>{c}</Text>
            </View>
          ))}
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{venue.distance} km</Text>
          <Text style={styles.meta}>⭐ {venue.rating}</Text>
          <Text style={styles.meta}>{'$'.repeat(venue.price || 1)}</Text>
        </View>
        {venue.badges?.length > 0 && (
          <View style={styles.badgesRow}>
            {venue.badges.map((b) => (
              <Text key={b} style={styles.badge}>
                {b}
              </Text>
            ))}
          </View>
        )}
        {venue.popularDish && (
          <Text style={styles.popularDish}>🍽 {venue.popularDish}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: colors.white,
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  meta: {
    marginRight: 10,
    color: colors.gray,
    fontSize: 13,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  badge: {
    fontSize: 11,
    backgroundColor: colors.green,
    color: colors.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 4,
    marginBottom: 2,
  },
  popularDish: {
    marginTop: 6,
    fontStyle: 'italic',
    color: colors.darkGray,
  },
});