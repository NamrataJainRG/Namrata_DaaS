import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const MarketDemandChips = ({ onChipPress }) => {
  const metrics = [
    {
      id: 1,
      title: 'Demand Index',
      value: '50.43',
      change: '-1.86%',
      changeType: 'down',
      vs: 'vs. Last 1 Week',
      icon: 'bar-chart',
    },
    {
      id: 2,
      title: 'Market ADR',
      value: '$92.14',
      change: '-10.61%',
      changeType: 'down',
      vs: 'vs. Last 1 Week',
      icon: 'attach-money',
    },
    {
      id: 3,
      title: 'Market RevPAR',
      value: '$85.77',
      change: null,
      changeType: null,
      vs: null,
      icon: 'trending-up',
    },
    {
      id: 4,
      title: 'Market Occupancy',
      value: '69%',
      change: null,
      changeType: null,
      vs: null,
      icon: 'people',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Demand - Berlin</Text>
      <Text style={styles.subtitle}>Current market performance indicators</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {metrics.map((metric) => (
          <TouchableOpacity
            key={metric.id}
            style={styles.chip}
            onPress={() => onChipPress(metric)}
            activeOpacity={0.7}
          >
            <View style={styles.chipHeader}>
              <Icon name={metric.icon} size={18} color="#2563eb" />
              <Text style={styles.chipTitle}>{metric.title}</Text>
            </View>
            <Text style={styles.chipValue}>{metric.value}</Text>
            {metric.change && (
              <View style={styles.chipChange}>
                <Icon
                  name={metric.changeType === 'up' ? 'arrow-upward' : 'arrow-downward'}
                  size={12}
                  color={metric.changeType === 'up' ? '#10b981' : '#ef4444'}
                />
                <Text
                  style={[
                    styles.chipChangeText,
                    { color: metric.changeType === 'up' ? '#10b981' : '#ef4444' },
                  ]}
                >
                  {metric.change}
                </Text>
              </View>
            )}
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
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
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
    minWidth: 140,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chipTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  chipValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  chipChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipChangeText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default MarketDemandChips;
