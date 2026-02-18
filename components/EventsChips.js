import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const EventsChips = ({ onEventPress }) => {
  const events = [
    {
      id: 1,
      title: 'Berlin International Film Festival',
      date: "Wed, 11 Feb '26 - Sat, 21 Feb '26",
      distance: '3 days',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Events and Holidays</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.chip}
            onPress={() => onEventPress(event)}
            activeOpacity={0.7}
          >
            <Icon name="event" size={20} color="#2563eb" />
            <View style={styles.chipContent}>
              <Text style={styles.chipTitle}>{event.title}</Text>
              <Text style={styles.chipDate}>{event.date}</Text>
              <View style={styles.distanceBadge}>
                <Icon name="schedule" size={12} color="#f59e0b" />
                <Text style={styles.distanceText}>{event.distance} away</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  chip: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
  },
  chipContent: {
    flex: 1,
    marginLeft: 12,
  },
  chipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  chipDate: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  distanceText: {
    fontSize: 11,
    color: '#f59e0b',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default EventsChips;
