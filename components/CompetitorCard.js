import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const CompetitorCard = ({ competitor, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.competitorInfo}>
          <Text
            style={[
              styles.competitorName,
              competitor.isMyProperty && styles.myPropertyName,
              competitor.isCompset && styles.compsetName,
            ]}
            numberOfLines={1}
          >
            {competitor.name}
          </Text>
          {competitor.rank && (
            <View style={styles.rankBadge}>
              <Icon name="leaderboard" size={14} color="#2563eb" />
              <Text style={styles.rankText}>Rank {competitor.rank}</Text>
            </View>
          )}
          {competitor.isMyProperty && (
            <View style={styles.myPropertyBadge}>
              <Icon name="hotel" size={14} color="#2563eb" />
              <Text style={styles.myPropertyBadgeText}>My Property</Text>
            </View>
          )}
          {competitor.isCompset && (
            <View style={styles.compsetBadge}>
              <Icon name="trending-up" size={14} color="#6b7280" />
              <Text style={styles.compsetBadgeText}>Average</Text>
            </View>
          )}
        </View>
        {competitor.isLowest && (
          <View style={styles.lowestIndicator}>
            <View style={styles.lowestDot} />
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        {competitor.status === 'sold-out' ? (
          <View style={styles.soldOutContainer}>
            <Icon name="block" size={20} color="#9ca3af" />
            <Text style={styles.soldOutText}>Sold Out</Text>
          </View>
        ) : (
          <>
            <View style={styles.rateRow}>
              <Text style={styles.rateLabel}>Rate</Text>
              <Text style={styles.rateValue}>${competitor.rate}</Text>
            </View>
            {competitor.variance !== null && competitor.variance !== undefined && (
              <View style={styles.varianceRow}>
                <Text style={styles.varianceLabel}>Variance</Text>
                <Text
                  style={[
                    styles.varianceValue,
                    competitor.isMyProperty
                      ? // For My Property: positive (higher than compset) = good (green), negative (lower) = bad (red)
                        competitor.variance > 0
                        ? styles.variancePositive
                        : competitor.variance < 0
                        ? styles.varianceNegative
                        : styles.varianceNeutral
                      : // For competitors: positive (higher than my rate) = bad (red), negative (lower) = good (green)
                        competitor.variance > 0
                        ? styles.varianceNegative
                        : competitor.variance < 0
                        ? styles.variancePositive
                        : styles.varianceNeutral,
                  ]}
                >
                  {competitor.variance > 0 ? '+' : ''}{competitor.variance}
                </Text>
              </View>
            )}
          </>
        )}
      </View>

      <TouchableOpacity style={styles.evolutionButton}>
        <Icon name="show-chart" size={16} color="#2563eb" />
        <Text style={styles.evolutionButtonText}>View Evolution</Text>
        <Icon name="chevron-right" size={16} color="#6b7280" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  myPropertyName: {
    color: '#2563eb',
    fontWeight: '700',
  },
  compsetName: {
    color: '#6b7280',
    fontWeight: '600',
  },
  myPropertyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
    gap: 4,
  },
  myPropertyBadgeText: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '600',
  },
  compsetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
    gap: 4,
  },
  compsetBadgeText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  competitorInfo: {
    flex: 1,
  },
  competitorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 4,
  },
  rankText: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '600',
  },
  lowestIndicator: {
    width: 12,
    height: 12,
  },
  lowestDot: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#10b981',
  },
  cardContent: {
    marginBottom: 12,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rateLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  rateValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  varianceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  varianceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  varianceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  variancePositive: {
    color: '#10b981', // Green for negative variance (competitor lower = good for us)
  },
  varianceNegative: {
    color: '#ef4444', // Red for positive variance (competitor higher = bad for us)
  },
  varianceNeutral: {
    color: '#6b7280',
  },
  soldOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  soldOutText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  evolutionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    gap: 8,
  },
  evolutionButtonText: {
    flex: 1,
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
});

export default CompetitorCard;
