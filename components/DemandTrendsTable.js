import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const DemandTrendsTable = ({ onDatePress }) => {
  // Event details mapped to dates
  const eventDetails = {
    'Feb 10': {
      title: 'Scientific Conference of the Association of Environmental Law Lecturers in Middle East and North Afr',
      startDate: 'Mon, 09 Feb \'26',
      endDate: 'Tue, 10 Feb \'26',
    },
    'Feb 11': {
      title: 'Scientific Conference of the Association of Environmental Law Lecturers in Middle East and North Afr',
      startDate: 'Mon, 09 Feb \'26',
      endDate: 'Tue, 10 Feb \'26',
    },
    'Feb 12': {
      title: 'WN Conference Abu Dhabi \'24',
      startDate: 'Wed, 11 Feb \'26',
      endDate: 'Thu, 12 Feb \'26',
    },
    'Feb 13': {
      title: 'WN Conference Abu Dhabi \'24',
      startDate: 'Wed, 11 Feb \'26',
      endDate: 'Thu, 12 Feb \'26',
    },
    'Feb 14': {
      title: 'World Conference on Science Engineering and Technology',
      startDate: 'Fri, 13 Feb \'26',
      endDate: 'Sat, 14 Feb \'26',
    },
    'Feb 15': {
      title: 'World Conference on Science Engineering and Technology',
      startDate: 'Fri, 13 Feb \'26',
      endDate: 'Sat, 14 Feb \'26',
    },
    'Feb 19': {
      title: 'Abu Dhabi Cultural Festival',
      startDate: 'Mon, 19 Feb \'26',
      endDate: 'Tue, 20 Feb \'26',
    },
    'Feb 22': {
      title: 'International Business Summit',
      startDate: 'Thu, 22 Feb \'26',
      endDate: 'Fri, 23 Feb \'26',
    },
    'Feb 23': {
      title: 'International Business Summit',
      startDate: 'Thu, 22 Feb \'26',
      endDate: 'Fri, 23 Feb \'26',
    },
    'Feb 24': {
      title: 'International Business Summit',
      startDate: 'Thu, 22 Feb \'26',
      endDate: 'Fri, 23 Feb \'26',
    },
  };

  // Table data based on the chart data
  const tableData = [
    { date: 'Feb 10', demand: 'Very High', demandValue: 85, demandIndex: 68.4, myADR: 450, marketADR: 500, airTravellers: 701, hasEvent: true, event: eventDetails['Feb 10'] },
    { date: 'Feb 11', demand: 'Very High', demandValue: 85, demandIndex: 68.4, myADR: 480, marketADR: 530, airTravellers: 650, hasEvent: true, event: eventDetails['Feb 11'] },
    { date: 'Feb 12', demand: 'Very High', demandValue: 85, demandIndex: 68.4, myADR: 520, marketADR: 570, airTravellers: 600, hasEvent: true, event: eventDetails['Feb 12'] },
    { date: 'Feb 13', demand: 'Very High', demandValue: 85, demandIndex: 68.4, myADR: 550, marketADR: 600, airTravellers: 550, hasEvent: true, event: eventDetails['Feb 13'] },
    { date: 'Feb 14', demand: 'Very High', demandValue: 85, demandIndex: 68.4, myADR: 540, marketADR: 590, airTravellers: 500, hasEvent: true, event: eventDetails['Feb 14'] },
    { date: 'Feb 15', demand: 'Very High', demandValue: 85, demandIndex: 68.4, myADR: 530, marketADR: 580, airTravellers: 450, hasEvent: true, event: eventDetails['Feb 15'] },
    { date: 'Feb 16', demand: 'High', demandValue: 62, demandIndex: 65.2, myADR: 401, marketADR: 338, airTravellers: 400, hasEvent: false, event: null },
    { date: 'Feb 17', demand: 'High', demandValue: 65, demandIndex: 64.8, myADR: 510, marketADR: 560, airTravellers: 380, hasEvent: false, event: null },
    { date: 'Feb 18', demand: 'High', demandValue: 65, demandIndex: 64.5, myADR: 500, marketADR: 550, airTravellers: 360, hasEvent: false, event: null },
    { date: 'Feb 19', demand: 'High', demandValue: 65, demandIndex: 64.2, myADR: 490, marketADR: 540, airTravellers: 350, hasEvent: true, event: eventDetails['Feb 19'] },
    { date: 'Feb 20', demand: 'High', demandValue: 65, demandIndex: 63.9, myADR: 485, marketADR: 535, airTravellers: 340, hasEvent: false, event: null },
    { date: 'Feb 21', demand: 'High', demandValue: 65, demandIndex: 63.6, myADR: 480, marketADR: 530, airTravellers: 330, hasEvent: false, event: null },
    { date: 'Feb 22', demand: 'High', demandValue: 65, demandIndex: 63.3, myADR: 475, marketADR: 525, airTravellers: 320, hasEvent: true, event: eventDetails['Feb 22'] },
    { date: 'Feb 23', demand: 'High', demandValue: 65, demandIndex: 63.0, myADR: 470, marketADR: 520, airTravellers: 310, hasEvent: true, event: eventDetails['Feb 23'] },
    { date: 'Feb 24', demand: 'High', demandValue: 65, demandIndex: 62.7, myADR: 460, marketADR: 510, airTravellers: 300, hasEvent: true, event: eventDetails['Feb 24'] },
  ];

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Low':
        return '#3b82f6';
      case 'Normal':
        return '#60a5fa';
      case 'High':
        return '#ef4444';
      case 'Very High':
        return '#f97316';
      default:
        return '#e5e7eb';
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={[styles.cell, styles.headerCell, styles.dateColumn]}>
            <Text style={styles.headerText}>Date</Text>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.demandColumn]}>
            <Text style={styles.headerText}>Demand</Text>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.rateColumn]}>
            <Text style={styles.headerText}>My ADR</Text>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.rateColumn]}>
            <Text style={styles.headerText}>Market ADR</Text>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.rateColumn]}>
            <Text style={styles.headerText}>Air Travellers</Text>
          </View>
        </View>

        {/* Data Rows */}
        {tableData.map((row, rowIndex) => (
          <TouchableOpacity
            key={rowIndex}
            style={styles.dataRow}
            onPress={() => onDatePress && onDatePress(row)}
            activeOpacity={0.7}
          >
            <View style={[styles.cell, styles.dateColumn, styles.dataCell]}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{row.date}</Text>
                {row.hasEvent && (
                  <Icon name="star" size={14} color="#f59e0b" style={styles.eventIcon} />
                )}
              </View>
            </View>
            <View style={[styles.cell, styles.demandColumn, styles.dataCell]}>
              <View style={styles.demandContainer}>
                <View
                  style={[
                    styles.demandBadge,
                    { backgroundColor: getDemandColor(row.demand) },
                  ]}
                >
                  <Text style={styles.demandText}>{row.demand}</Text>
                </View>
                <Text style={styles.demandValue}>{row.demandValue}</Text>
              </View>
            </View>
            <View style={[styles.cell, styles.rateColumn, styles.dataCell, styles.myADRCell]}>
              <Text style={styles.myADRText}>${row.myADR}</Text>
            </View>
            <View style={[styles.cell, styles.rateColumn, styles.dataCell]}>
              <Text style={styles.rateText}>${row.marketADR}</Text>
            </View>
            <View style={[styles.cell, styles.rateColumn, styles.dataCell]}>
              <Text style={styles.rateText}>{row.airTravellers}</Text>
            </View>
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
    minWidth: 100,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  demandColumn: {
    minWidth: 120,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  rateColumn: {
    minWidth: 110,
    borderRightWidth: 1,
    borderRightColor: '#f3f4f6',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  eventIcon: {
    marginLeft: 4,
  },
  demandContainer: {
    alignItems: 'center',
    gap: 4,
  },
  demandBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 80,
  },
  demandText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  demandValue: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  myADRText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
  },
  rateText: {
    fontSize: 13,
    color: '#4b5563',
    textAlign: 'center',
    fontWeight: '500',
  },
  myADRCell: {
    backgroundColor: '#eff6ff',
  },
});

export default DemandTrendsTable;
