import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import BottomSheet from './BottomSheet';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const RateEvolutionSheet = ({ visible, onClose, date, dateData }) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  // Sample dates for navigation (7 days around the selected date)
  const dateOptions = [
    '10 Feb, Tue',
    '11 Feb, Wed',
    '12 Feb, Thu',
    '13 Feb, Fri',
    '14 Feb, Sat',
    '15 Feb, Sun',
    '16 Feb, Mon',
  ];

  // Find current date index
  const currentDateIndex = dateOptions.findIndex((d) => d === date) || 3;

  // Sample rate evolution data (lead time) - only for subscriber property
  // Data points from -30 days to 0 days (check-in day)
  const evolutionData = {
    labels: ['-30', '-20', '-10', '0'],
    datasets: [
      {
        data: [450, 505, 559, dateData?.myRate || 668],
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const handlePreviousDate = () => {
    if (selectedDateIndex > 0) {
      setSelectedDateIndex(selectedDateIndex - 1);
    }
  };

  const handleNextDate = () => {
    if (selectedDateIndex < dateOptions.length - 1) {
      setSelectedDateIndex(selectedDateIndex + 1);
    }
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const currentDate = dateOptions[selectedDateIndex] || date || '13 Feb, Fri';

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Rate Evolution"
      height={isLargeScreen ? 600 : 500}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Date Navigation Header */}
          <View style={styles.dateHeader}>
            <TouchableOpacity
              style={styles.dateNavButton}
              onPress={handlePreviousDate}
              disabled={selectedDateIndex === 0}
            >
              <Icon
                name="chevron-left"
                size={isLargeScreen ? 28 : 24}
                color={selectedDateIndex === 0 ? '#d1d5db' : '#1f2937'}
              />
            </TouchableOpacity>
            <View style={styles.dateHeaderContent}>
              <Text style={styles.dateText}>{currentDate}</Text>
              <Text style={styles.dateSubtitle}>
                View rate trends across different lead times for selected Check-in Date
              </Text>
            </View>
            <TouchableOpacity
              style={styles.dateNavButton}
              onPress={handleNextDate}
              disabled={selectedDateIndex === dateOptions.length - 1}
            >
              <Icon
                name="chevron-right"
                size={isLargeScreen ? 28 : 24}
                color={selectedDateIndex === dateOptions.length - 1 ? '#d1d5db' : '#1f2937'}
              />
            </TouchableOpacity>
          </View>

          {/* Summary Section */}
          <View style={styles.summarySection}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>My Rate</Text>
              <Text style={styles.summaryValue}>
                ${dateData?.myRate || '668'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Compset Avg.</Text>
              <Text style={styles.summaryValue}>
                ${dateData?.compsetAvg || '582'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Position</Text>
              <Text style={styles.summaryValue}>#1 of 4</Text>
            </View>
          </View>

          {/* Chart Section - Only Subscriber Property */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Rate Evolution (Lead Time)</Text>
            <View style={styles.chartContainer}>
              <View style={styles.chartWithLabels}>
                {/* Y-axis Label */}
                <View style={styles.yAxisLabelContainer}>
                  <Text style={styles.yAxisLabel}>Rates ($)</Text>
                </View>
                
                <View style={styles.chartWrapper}>
                  <LineChart
                    data={evolutionData}
                    width={width - (isLargeScreen ? 120 : 100)}
                    height={isLargeScreen ? 280 : 220}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                    withInnerLines={false}
                    withOuterLines={true}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                    withDots={true}
                    withShadow={false}
                    formatYLabel={(value) => {
                      const num = parseInt(value);
                      return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
                    }}
                  />
                  
                </View>
              </View>
              
              {/* X-axis Label - Below chart */}
              <View style={styles.xAxisLabelContainer}>
                <Text style={styles.xAxisLabel}>Lead-in Period</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: isLargeScreen ? 24 : 20,
    paddingBottom: isLargeScreen ? 20 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dateNavButton: {
    width: isLargeScreen ? 48 : 40,
    height: isLargeScreen ? 48 : 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dateHeaderContent: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: isLargeScreen ? 16 : 12,
  },
  dateText: {
    fontSize: isLargeScreen ? 20 : 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  dateSubtitle: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: isLargeScreen ? 24 : 20,
    paddingBottom: isLargeScreen ? 24 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: isLargeScreen ? 13 : 12,
    color: '#6b7280',
    marginBottom: isLargeScreen ? 10 : 8,
  },
  summaryValue: {
    fontSize: isLargeScreen ? 22 : 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  chartSection: {
    marginBottom: isLargeScreen ? 24 : 20,
  },
  chartTitle: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: isLargeScreen ? 20 : 16,
  },
  chartContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: isLargeScreen ? 16 : 12,
    padding: isLargeScreen ? 20 : 16,
  },
  chartWithLabels: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yAxisLabelContainer: {
    width: isLargeScreen ? 80 : 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: isLargeScreen ? 12 : 8,
  },
  yAxisLabel: {
    fontSize: isLargeScreen ? 14 : 12,
    fontWeight: '600',
    color: '#6b7280',
    writingDirection: 'ltr',
  },
  chartWrapper: {
    flex: 1,
  },
  chart: {
    borderRadius: 8,
  },
  xAxisLabelContainer: {
    alignItems: 'center',
    marginTop: isLargeScreen ? 8 : 4,
    marginLeft: isLargeScreen ? 80 : 70,
  },
  xAxisLabel: {
    fontSize: isLargeScreen ? 14 : 12,
    fontWeight: '600',
    color: '#6b7280',
  },
});

export default RateEvolutionSheet;
