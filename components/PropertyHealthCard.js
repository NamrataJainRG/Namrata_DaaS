import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const PropertyHealthCard = ({ onChannelPress }) => {
  const channels = [
    {
      name: 'Booking.com',
      ranking: '196 of 500',
      reviews: '6.0 out of 10',
      parity: '--',
      logo: 'B',
      logoColor: '#003580',
    },
    {
      name: 'MakeMyTrip',
      ranking: '304 of 500',
      reviews: '3.1 out of 10',
      parity: '--',
      logo: 'M',
      logoColor: '#E60012',
    },
    {
      name: 'Expedia',
      ranking: '245 of 500',
      reviews: '7.2 out of 10',
      parity: '98%',
      logo: 'E',
      logoColor: '#FF8000',
    },
    {
      name: 'Agoda',
      ranking: '189 of 500',
      reviews: '6.5 out of 10',
      parity: '95%',
      logo: 'A',
      logoColor: '#FF6600',
    },
  ];

  // Calculate card width for 2x2 grid
  const horizontalPadding = isLargeScreen ? 64 : 32;
  const gap = isLargeScreen ? 16 : 12;
  const cardWidth = (width - horizontalPadding - gap) / 2;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Property Health Score</Text>
          <Text style={styles.subtitle}>Channel performance and parity monitoring</Text>
        </View>
      </View>

      <View style={styles.channelsContainer}>
        {channels.map((channel, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.channelCard, { width: cardWidth }]}
            onPress={() => onChannelPress(channel)}
            activeOpacity={0.7}
          >
            <View style={[styles.channelLogo, { backgroundColor: channel.logoColor }]}>
              <Text style={styles.channelLogoText}>{channel.logo}</Text>
            </View>
            <Text style={styles.channelName}>{channel.name}</Text>
            
            <View style={styles.metricsContainer}>
              <View style={styles.metricRow}>
                <Icon name="leaderboard" size={isLargeScreen ? 14 : 12} color="#6b7280" />
                <View style={styles.metricContent}>
                  <Text style={styles.metricLabel}>Ranking</Text>
                  <Text style={styles.metricValue}>{channel.ranking}</Text>
                </View>
              </View>
              
              <View style={styles.metricRow}>
                <Icon name="star" size={isLargeScreen ? 14 : 12} color="#6b7280" />
                <View style={styles.metricContent}>
                  <Text style={styles.metricLabel}>Reviews</Text>
                  <Text style={styles.metricValue}>{channel.reviews}</Text>
                </View>
              </View>
              
              <View style={styles.metricRow}>
                <Icon name="security" size={isLargeScreen ? 14 : 12} color="#6b7280" />
                <View style={styles.metricContent}>
                  <Text style={styles.metricLabel}>Parity</Text>
                  <Text style={[
                    styles.metricValue,
                    channel.parity !== '--' && { color: channel.parity >= '95%' ? '#10b981' : '#f59e0b' }
                  ]}>
                    {channel.parity}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: isLargeScreen ? 32 : 16,
    marginBottom: isLargeScreen ? 32 : 24,
  },
  header: {
    marginBottom: isLargeScreen ? 16 : 12,
  },
  title: {
    fontSize: isLargeScreen ? 24 : 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: isLargeScreen ? 16 : 13,
    color: '#6b7280',
  },
  channelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: isLargeScreen ? 16 : 12,
  },
  channelCard: {
    backgroundColor: '#ffffff',
    borderRadius: isLargeScreen ? 16 : 12,
    padding: isLargeScreen ? 16 : 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  channelLogo: {
    width: isLargeScreen ? 48 : 40,
    height: isLargeScreen ? 48 : 40,
    borderRadius: isLargeScreen ? 12 : 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isLargeScreen ? 12 : 10,
  },
  channelLogoText: {
    color: '#ffffff',
    fontSize: isLargeScreen ? 20 : 18,
    fontWeight: 'bold',
  },
  channelName: {
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: isLargeScreen ? 12 : 10,
  },
  metricsContainer: {
    gap: isLargeScreen ? 10 : 8,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: isLargeScreen ? 8 : 6,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontSize: isLargeScreen ? 11 : 10,
    color: '#6b7280',
    marginBottom: 2,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: isLargeScreen ? 13 : 12,
    fontWeight: '600',
    color: '#1f2937',
  },
});

export default PropertyHealthCard;
