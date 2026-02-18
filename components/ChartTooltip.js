import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const ChartTooltip = ({ visible, data, onClose, onViewEvolution }) => {
  if (!visible || !data) return null;

  const { date, myRate, compsetAvg, variance, rank, event } = data;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
        <View
          style={styles.tooltip}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.tooltipHeader}>
              <View>
                <Text style={styles.tooltipDate}>{date}</Text>
                {event && (
                  <View style={styles.eventBadge}>
                    <Icon name="star" size={12} color="#f59e0b" />
                    <Text style={styles.eventText} numberOfLines={1}>
                      {event}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon name="close" size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.tooltipContent}>
              {myRate !== null ? (
                <>
                  <View style={styles.tooltipRow}>
                    <Text style={styles.tooltipLabel}>My Rate</Text>
                    <Text style={styles.tooltipValue}>${myRate}</Text>
                  </View>
                  {variance !== null && (
                    <View style={styles.tooltipRow}>
                      <Text style={styles.tooltipLabel}>Variance</Text>
                      <Text
                        style={[
                          styles.tooltipVariance,
                          variance > 0 ? styles.variancePositive : styles.varianceNegative,
                        ]}
                      >
                        {variance > 0 ? '+' : ''}{variance}
                      </Text>
                    </View>
                  )}
                  {rank !== null && (
                    <View style={styles.tooltipRow}>
                      <Text style={styles.tooltipLabel}>Rank</Text>
                      <Text style={styles.tooltipValue}>#{rank}</Text>
                    </View>
                  )}
                </>
              ) : (
                <Text style={styles.soldOutText}>Sold Out</Text>
              )}

              {compsetAvg && (
                <View style={styles.tooltipRow}>
                  <Text style={styles.tooltipLabel}>Compset Avg.</Text>
                  <Text style={styles.tooltipValue}>${compsetAvg}</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.evolutionButton}
              onPress={onViewEvolution}
              activeOpacity={0.7}
            >
              <Icon name="show-chart" size={16} color="#2563eb" />
              <Text style={styles.evolutionButtonText}>View Rate Evolution</Text>
              <Icon name="chevron-right" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    width: isLargeScreen ? 320 : 280,
    maxWidth: width - 32,
    backgroundColor: '#ffffff',
    borderRadius: isLargeScreen ? 16 : 12,
    padding: isLargeScreen ? 20 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: isLargeScreen ? 16 : 12,
    paddingBottom: isLargeScreen ? 12 : 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tooltipDate: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  eventBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  eventText: {
    fontSize: isLargeScreen ? 12 : 11,
    color: '#f59e0b',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  tooltipContent: {
    marginBottom: isLargeScreen ? 16 : 12,
  },
  tooltipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isLargeScreen ? 10 : 8,
  },
  tooltipLabel: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
  },
  tooltipValue: {
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  tooltipVariance: {
    fontSize: isLargeScreen ? 14 : 12,
    fontWeight: '600',
  },
  variancePositive: {
    color: '#ef4444',
  },
  varianceNegative: {
    color: '#10b981',
  },
  soldOutText: {
    fontSize: isLargeScreen ? 16 : 14,
    color: '#f59e0b',
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: isLargeScreen ? 8 : 6,
  },
  evolutionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: isLargeScreen ? 12 : 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 8,
  },
  evolutionButtonText: {
    flex: 1,
    fontSize: isLargeScreen ? 14 : 12,
    color: '#2563eb',
    fontWeight: '500',
  },
});

export default ChartTooltip;
