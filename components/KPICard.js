import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const KPICard = ({ title, value, change, changeType, vs, sparkline, color }) => {
  // Calculate card width for 2x2 grid: (screen width - horizontal padding - gap between cards) / 2
  const horizontalPadding = isLargeScreen ? 64 : 32; // 32px on each side
  const gap = isLargeScreen ? 16 : 12; // gap between cards
  const calculatedWidth = (width - horizontalPadding - gap) / 2;
  // Ensure cards don't exceed a reasonable max width to force wrapping
  const cardWidth = Math.min(calculatedWidth, isLargeScreen ? 600 : 400);
  
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      
      <Text style={styles.cardValue}>{value}</Text>
      
      {change && (
        <View style={styles.changeRow}>
          <Icon
            name={changeType === 'up' ? 'arrow-upward' : changeType === 'down' ? 'arrow-downward' : 'remove'}
            size={isLargeScreen ? 14 : 12}
            color={
              changeType === 'up' ? '#10b981' : changeType === 'down' ? '#ef4444' : '#6b7280'
            }
          />
          <Text
            style={[
              styles.changeText,
              {
                color:
                  changeType === 'up' ? '#10b981' : changeType === 'down' ? '#ef4444' : '#6b7280',
              },
            ]}
          >
            {change} {vs}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: isLargeScreen ? 12 : 10,
    padding: isLargeScreen ? 14 : 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexShrink: 0,
    flexGrow: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isLargeScreen ? 8 : 6,
  },
  cardTitle: {
    fontSize: isLargeScreen ? 12 : 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: isLargeScreen ? 24 : 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: isLargeScreen ? 8 : 6,
  },
  sparklineContainer: {
    height: isLargeScreen ? 32 : 28,
    marginBottom: isLargeScreen ? 8 : 6,
    justifyContent: 'center',
  },
  sparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: isLargeScreen ? 32 : 28,
    gap: 2,
  },
  sparklineBar: {
    flex: 1,
    borderRadius: 2,
    minHeight: 3,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  changeText: {
    fontSize: isLargeScreen ? 11 : 10,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default KPICard;
