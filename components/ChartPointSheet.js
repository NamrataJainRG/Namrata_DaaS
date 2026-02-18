import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import BottomSheet from './BottomSheet';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ChartPointSheet = ({ visible, onClose, date, dateData }) => {
  // Sample rate evolution data for the selected date
  const evolutionData = {
    labels: ['-30', '-20', '-10', '0'],
    datasets: [
      {
        data: [55, 58, 62, 69],
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={`Rate Evolution - ${date || 'Selected Date'}`}
      height={500}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.summarySection}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Your Rate</Text>
              <Text style={styles.summaryValue}>
                ${dateData?.yourRate || '69'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Compset Avg.</Text>
              <Text style={styles.summaryValue}>
                ${dateData?.compsetAvg || '66'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Difference</Text>
              <Text
                style={[
                  styles.summaryValue,
                  {
                    color:
                      dateData?.yourRate > dateData?.compsetAvg
                        ? '#10b981'
                        : dateData?.yourRate < dateData?.compsetAvg
                        ? '#ef4444'
                        : '#6b7280',
                  },
                ]}
              >
                {dateData
                  ? `$${Math.abs(dateData.yourRate - dateData.compsetAvg)} ${
                      dateData.yourRate > dateData.compsetAvg ? '↑' : dateData.yourRate < dateData.compsetAvg ? '↓' : '='
                    }`
                  : '$3 ↑'}
              </Text>
            </View>
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Rate Evolution (Lead Time)</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={evolutionData}
                width={width - 80}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withInnerLines={false}
                withOuterLines={true}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                withDots={true}
                withShadow={false}
              />
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
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  chartSection: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  chart: {
    borderRadius: 8,
  },
});

export default ChartPointSheet;
