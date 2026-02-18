import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const RateTrendsTable = ({ data, onDatePress }) => {
  const tableData = [
    { date: 'Feb 06', yourRate: 62, compsetAvg: 58, competitors: [62, 64, 55] },
    { date: 'Feb 07', yourRate: 64, compsetAvg: 60, competitors: [64, 66, 57] },
    { date: 'Feb 08', yourRate: 63, compsetAvg: 59, competitors: [63, 65, 56] },
    { date: 'Feb 09', yourRate: 65, compsetAvg: 61, competitors: [65, 67, 58] },
    { date: 'Feb 10', yourRate: 67, compsetAvg: 63, competitors: [67, 69, 60] },
    { date: 'Feb 11', yourRate: 66, compsetAvg: 62, competitors: [66, 68, 59] },
    { date: 'Feb 12', yourRate: 69, compsetAvg: 66, competitors: [69, 71, 62] },
  ];

  const competitorNames = [
    'City Hotel Gotland',
    'Hotel Alexander Plaza',
    'Comfort Hotel Auberge',
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={[styles.cell, styles.headerCell, styles.dateColumn]}>
            <Text style={styles.headerText}>Date</Text>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.rateColumn]}>
            <Text style={styles.headerText}>Your Rate</Text>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.rateColumn]}>
            <Text style={styles.headerText}>Compset Avg.</Text>
          </View>
          {competitorNames.map((name, index) => (
            <View key={index} style={[styles.cell, styles.headerCell, styles.rateColumn]}>
              <Text style={styles.headerText} numberOfLines={2}>
                {name}
              </Text>
            </View>
          ))}
        </View>

        {/* Data Rows */}
        {tableData.map((row, rowIndex) => (
          <TouchableOpacity
            key={rowIndex}
            style={styles.dataRow}
            onPress={() => onDatePress && onDatePress(row.date)}
            activeOpacity={0.7}
          >
            <View style={[styles.cell, styles.dateColumn, styles.dataCell]}>
              <Text style={styles.dateText}>{row.date}</Text>
            </View>
            <View style={[styles.cell, styles.rateColumn, styles.dataCell, styles.yourRateCell]}>
              <Text style={styles.yourRateText}>${row.yourRate}</Text>
            </View>
            <View style={[styles.cell, styles.rateColumn, styles.dataCell]}>
              <Text style={styles.rateText}>${row.compsetAvg}</Text>
            </View>
            {row.competitors.map((rate, compIndex) => (
              <View
                key={compIndex}
                style={[styles.cell, styles.rateColumn, styles.dataCell]}
              >
                <Text style={styles.rateText}>${rate}</Text>
              </View>
            ))}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  headerCell: {
    backgroundColor: '#f9fafb',
  },
  dataCell: {
    backgroundColor: '#ffffff',
  },
  dateColumn: {
    minWidth: 80,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  rateColumn: {
    minWidth: 100,
    borderRightWidth: 1,
    borderRightColor: '#f3f4f6',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  yourRateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
  },
  rateText: {
    fontSize: 13,
    color: '#4b5563',
    textAlign: 'center',
  },
  yourRateCell: {
    backgroundColor: '#eff6ff',
  },
});

export default RateTrendsTable;
