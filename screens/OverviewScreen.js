import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { MaterialIcons as Icon } from '@expo/vector-icons';

// Components
import KPICard from '../components/KPICard';
import FilterModal from '../components/FilterModal';
import KPIDetailSheet from '../components/KPIDetailSheet';
import PropertyHealthCard from '../components/PropertyHealthCard';
import MarketDemandChips from '../components/MarketDemandChips';
import EventsChips from '../components/EventsChips';
import ChartPointSheet from '../components/ChartPointSheet';
import RateTrendsTable from '../components/RateTrendsTable';
import AlertsSheet from '../components/AlertsSheet';
import LensChatbot from '../components/LensChatbot';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const OverviewScreen = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [kpiDetailVisible, setKpiDetailVisible] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [chartPointVisible, setChartPointVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('ADR');
  const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'
  const [alertsVisible, setAlertsVisible] = useState(false);
  const scrollViewRef = useRef(null);

  // KPI Cards Data
  const kpiCards = [
    {
      id: 1,
      title: 'Average Daily Rate',
      value: '$62',
      change: '0.9%',
      changeType: 'down',
      vs: 'vs Yesterday',
      sparkline: [45, 50, 48, 55, 60, 58, 62],
      color: '#2563eb',
    },
    {
      id: 2,
      title: 'Rate Parity Score',
      value: '95%',
      change: '10%',
      changeType: 'up',
      vs: 'vs Yesterday',
      sparkline: [80, 82, 85, 88, 90, 92, 95],
      color: '#10b981',
    },
    {
      id: 3,
      title: 'Price Positioning',
      value: '#5 out of 5',
      change: '0.0%',
      changeType: 'neutral',
      vs: 'vs Yesterday',
      sparkline: [80, 82, 85, 88, 90, 88, 85],
      color: '#f59e0b',
    },
    {
      id: 4,
      title: 'Event Impact',
      value: 'Christmas Market',
      change: null,
      changeType: null,
      vs: null,
      sparkline: [30, 35, 40, 45, 50, 55, 60],
      color: '#10b981',
    },
  ];

  // Rate Trends Chart Data - Next 7 days
  const rateTrendsData = {
    labels: ['Feb 06', 'Feb 07', 'Feb 08', 'Feb 09', 'Feb 10', 'Feb 11', 'Feb 12'],
    datasets: [
      {
        data: [62, 64, 63, 65, 67, 66, 69],
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [58, 60, 59, 61, 63, 62, 66],
        color: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Date data for clickable dates
  const dateDataMap = {
    'Feb 06': { yourRate: 62, compsetAvg: 58 },
    'Feb 07': { yourRate: 64, compsetAvg: 60 },
    'Feb 08': { yourRate: 63, compsetAvg: 59 },
    'Feb 09': { yourRate: 65, compsetAvg: 61 },
    'Feb 10': { yourRate: 67, compsetAvg: 63 },
    'Feb 11': { yourRate: 66, compsetAvg: 62 },
    'Feb 12': { yourRate: 69, compsetAvg: 66 },
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2563eb',
    },
  };

  const handleKPIPress = (kpi) => {
    setSelectedKPI(kpi);
    setKpiDetailVisible(true);
  };

  const handleChartPointPress = (date) => {
    const data = dateDataMap[date];
    if (data) {
      setSelectedDate(date);
      setSelectedDateData(data);
      setChartPointVisible(true);
    }
  };

  const handleChannelPress = (channel) => {
    // Navigate to channel detail or open modal
    console.log('Channel pressed:', channel);
  };

  const handleMetricChipPress = (metric) => {
    // Open explainer modal
    console.log('Metric chip pressed:', metric);
  };

  const handleEventPress = (event) => {
    // Open event detail sheet
    console.log('Event pressed:', event);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Sticky Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.openDrawer()}
            style={styles.headerButton}
          >
            <Icon name="menu" size={24} color="#1f2937" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Overview</Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              City Hotel Gotland
            </Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => setLensVisible(true)}
              style={styles.headerButton}
            >
              <Icon name="chat" size={22} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilterModalVisible(true)}
              style={styles.headerButton}
            >
              <Icon name="tune" size={22} color="#1f2937" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setAlertsVisible(true)}
            >
              <Icon name="notifications" size={22} color="#1f2937" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>13</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* KPI Cards Grid */}
          <View style={styles.kpiSection}>
            <Text style={styles.sectionTitle}>Key Metrics</Text>
            <View style={styles.kpiCardsContainer}>
              {kpiCards.map((kpi) => (
                <KPICard
                  key={kpi.id}
                  {...kpi}
                />
              ))}
            </View>
          </View>

          {/* Rate Trends Chart */}
          <View style={styles.chartSection}>
            <View style={styles.chartHeader}>
              <View style={styles.chartHeaderLeft}>
                <Text style={styles.chartTitle}>Rate Trends Analysis</Text>
                <Text style={styles.chartSubtitle}>
                  Subscriber property vs Compset Average (Next 7 Days)
                </Text>
              </View>
              <View style={styles.viewToggle}>
                <TouchableOpacity
                  style={[styles.toggleButton, viewMode === 'chart' && styles.toggleButtonActive]}
                  onPress={() => setViewMode('chart')}
                >
                  <Icon name="show-chart" size={18} color={viewMode === 'chart' ? '#ffffff' : '#6b7280'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, viewMode === 'table' && styles.toggleButtonActive]}
                  onPress={() => setViewMode('table')}
                >
                  <Icon name="table-chart" size={18} color={viewMode === 'table' ? '#ffffff' : '#6b7280'} />
                </TouchableOpacity>
              </View>
            </View>
            
            {viewMode === 'chart' ? (
              <>
                <View style={styles.chartContainer}>
                  <View style={styles.chartWrapper}>
                    <LineChart
                      data={rateTrendsData}
                      width={width - 32}
                      height={220}
                      chartConfig={chartConfig}
                      bezier
                      style={styles.chart}
                      withInnerLines={false}
                      withOuterLines={true}
                      withVerticalLabels={true}
                      withHorizontalLabels={true}
                      withDots={true}
                      withShadow={false}
                      onDataPointClick={(data) => {
                        const date = rateTrendsData.labels[data.index];
                        handleChartPointPress(date);
                      }}
                    />
                  </View>
                  <View style={styles.chartDateLabels}>
                    {rateTrendsData.labels.map((date, index) => {
                      const dateInfo = dateDataMap[date];
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.dateLabel}
                          onPress={() => handleChartPointPress(date)}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.dateLabelText}>{date}</Text>
                          {dateInfo && (
                            <View style={styles.dateLabelValues}>
                                <Text style={styles.dateLabelValue}>${dateInfo.yourRate}</Text>
                                <Text style={styles.dateLabelValueSmall}>${dateInfo.compsetAvg}</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#2563eb' }]} />
                    <Text style={styles.legendText}>City Hotel Gotland</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#9ca3af' }]} />
                    <Text style={styles.legendText}>Compset Avg. Rate</Text>
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.tableContainer}>
                <RateTrendsTable
                  data={rateTrendsData}
                  onDatePress={handleChartPointPress}
                />
              </View>
            )}
          </View>

          {/* Property Health */}
          <PropertyHealthCard onChannelPress={handleChannelPress} />

          {/* Market Demand */}
          <MarketDemandChips onChipPress={handleMetricChipPress} />

          {/* Top Events */}
          <EventsChips onEventPress={handleEventPress} />
        </ScrollView>
      </SafeAreaView>

      {/* Modals and Sheets */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(filters) => console.log('Filters applied:', filters)}
      />

      <KPIDetailSheet
        visible={kpiDetailVisible}
        onClose={() => setKpiDetailVisible(false)}
        kpi={selectedKPI}
      />

      <ChartPointSheet
        visible={chartPointVisible}
        onClose={() => setChartPointVisible(false)}
        date={selectedDate}
        dateData={selectedDateData}
      />

      <AlertsSheet
        visible={alertsVisible}
        onClose={() => setAlertsVisible(false)}
      />

      <LensChatbot
        visible={lensVisible}
        onClose={() => setLensVisible(false)}
        propertyName="City Hotel Gotland"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isLargeScreen ? 32 : 16,
    paddingVertical: isLargeScreen ? 16 : 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerButton: {
    width: isLargeScreen ? 56 : 44,
    height: isLargeScreen ? 56 : 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: isLargeScreen ? 24 : 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  kpiSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: isLargeScreen ? 24 : 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: isLargeScreen ? 16 : 12,
    paddingHorizontal: isLargeScreen ? 32 : 16,
  },
  kpiCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: isLargeScreen ? 32 : 16,
    gap: isLargeScreen ? 16 : 12,
  },
  chartSection: {
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  chartHeaderLeft: {
    flex: 1,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 2,
    gap: 4,
  },
  toggleButton: {
    width: 36,
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#2563eb',
  },
  chartTitle: {
    fontSize: isLargeScreen ? 24 : 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: isLargeScreen ? 16 : 13,
    color: '#6b7280',
  },
  competitorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  competitorText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  chartContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  chartWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chart: {
    borderRadius: 8,
  },
  chartDateLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  dateLabel: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 60,
  },
  dateLabelText: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '600',
    marginBottom: 4,
  },
  dateLabelValues: {
    alignItems: 'center',
  },
  dateLabelValue: {
    fontSize: 10,
    color: '#1f2937',
    fontWeight: '600',
  },
  dateLabelValueSmall: {
    fontSize: 9,
    color: '#6b7280',
  },
  tableContainer: {
    paddingHorizontal: 16,
  },
  chartPlaceholder: {
    height: 220,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chartPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  chartPlaceholderSubtext: {
    fontSize: 12,
    color: '#6b7280',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default OverviewScreen;
