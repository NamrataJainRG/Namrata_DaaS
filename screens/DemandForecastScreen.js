import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import FilterModal from '../components/FilterModal';
import BottomSheet from '../components/BottomSheet';
import KPICard from '../components/KPICard';
import DemandTrendsTable from '../components/DemandTrendsTable';
import LensChatbot from '../components/LensChatbot';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const DemandForecastScreen = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateSheetVisible, setDateSheetVisible] = useState(false);

  // Market KPI Data
  const marketKPIs = [
    {
      id: 1,
      title: 'Demand Index',
      value: '68.4',
      change: '-6.69%',
      changeType: 'down',
      vs: 'vs WoW',
      sparkline: [75, 72, 70, 68, 68.4],
      color: '#2563eb',
    },
    {
      id: 2,
      title: 'Market ADR',
      value: '$466.47',
      change: '-11.87%',
      changeType: 'down',
      vs: 'vs WoW',
      sparkline: [520, 500, 480, 470, 466],
      color: '#f59e0b',
    },
    {
      id: 3,
      title: 'Market RevPAR',
      value: '$101.48',
      change: null,
      changeType: null,
      vs: null,
      sparkline: [110, 105, 102, 101, 101.48],
      color: '#10b981',
    },
    {
      id: 4,
      title: 'Market Occupancy',
      value: '71.47%',
      change: null,
      changeType: null,
      vs: null,
      sparkline: [75, 73, 72, 71, 71.47],
      color: '#8b5cf6',
    },
  ];

  // Demand Heatmap Data (Next 15 days: Feb 10-24)
  const demandHeatmapData = [
    { date: '10', day: 'Mon', demand: 'high', hasEvent: true },
    { date: '11', day: 'Tue', demand: 'high', hasEvent: true },
    { date: '12', day: 'Wed', demand: 'high', hasEvent: true },
    { date: '13', day: 'Thu', demand: 'high', hasEvent: true },
    { date: '14', day: 'Fri', demand: 'high', hasEvent: true },
    { date: '15', day: 'Sat', demand: 'high', hasEvent: true },
    { date: '16', day: 'Sun', demand: 'very-high', hasEvent: false },
    { date: '17', day: 'Mon', demand: 'very-high', hasEvent: false },
    { date: '18', day: 'Tue', demand: 'very-high', hasEvent: false },
    { date: '19', day: 'Wed', demand: 'very-high', hasEvent: false },
    { date: '20', day: 'Thu', demand: 'very-high', hasEvent: false },
    { date: '21', day: 'Fri', demand: 'very-high', hasEvent: false },
    { date: '22', day: 'Sat', demand: 'very-high', hasEvent: true },
    { date: '23', day: 'Sun', demand: 'very-high', hasEvent: true },
    { date: '24', day: 'Mon', demand: 'very-high', hasEvent: true },
  ];

  // Chart Data - ADR View
  const adrChartData = {
    labels: ['Feb 10', 'Feb 11', 'Feb 12', 'Feb 13', 'Feb 14', 'Feb 15', 'Feb 16', 'Feb 17', 'Feb 18', 'Feb 19', 'Feb 20', 'Feb 21', 'Feb 22', 'Feb 23', 'Feb 24'],
    datasets: [
      {
        data: [450, 480, 520, 550, 540, 530, 510, 500, 490, 485, 480, 475, 470, 465, 460],
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [500, 530, 570, 600, 590, 580, 560, 550, 540, 535, 530, 525, 520, 515, 510],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
        strokeWidth: 2,
        strokeDashArray: [5, 5],
      },
    ],
  };

  // Chart Data - Air Travellers View
  const travellersChartData = {
    labels: ['Feb 10', 'Feb 11', 'Feb 12', 'Feb 13', 'Feb 14', 'Feb 15', 'Feb 16', 'Feb 17', 'Feb 18', 'Feb 19', 'Feb 20', 'Feb 21', 'Feb 22', 'Feb 23', 'Feb 24'],
    datasets: [
      {
        data: [701, 650, 600, 550, 500, 450, 400, 380, 360, 350, 340, 330, 320, 310, 300],
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Demand Bar Chart Data
  const demandBarData = {
    labels: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    datasets: [
      {
        data: [3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 1=Low, 2=Normal, 3=High, 4=Very High
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
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
    },
  };

  // Events Data
  const events = [
    {
      id: 1,
      title: 'Scientific Conference of the Association of Environmental Law Lecturers in Middle East and North Afr',
      startDate: 'Mon, 09 Feb \'26',
      endDate: 'Tue, 10 Feb \'26',
    },
    {
      id: 2,
      title: 'WN Conference Abu Dhabi \'24',
      startDate: 'Wed, 11 Feb \'26',
      endDate: 'Thu, 12 Feb \'26',
    },
    {
      id: 3,
      title: 'World Conference on Science Engineering and Technology',
      startDate: 'Fri, 13 Feb \'26',
      endDate: 'Sat, 14 Feb \'26',
    },
  ];

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'low':
        return '#3b82f6'; // Blue
      case 'normal':
        return '#60a5fa'; // Light blue
      case 'high':
        return '#ef4444'; // Red
      case 'very-high':
        return '#f97316'; // Orange
      default:
        return '#e5e7eb';
    }
  };

  const getDemandLabel = (demand) => {
    switch (demand) {
      case 'low':
        return 'Low';
      case 'normal':
        return 'Normal';
      case 'high':
        return 'High';
      case 'very-high':
        return 'Very High';
      default:
        return '';
    }
  };

  const handleDatePress = (dateInfo) => {
    setSelectedDate(dateInfo);
    setDateSheetVisible(true);
  };

  const getResponsiveStyles = (isLarge) => StyleSheet.create({
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
      paddingHorizontal: isLarge ? 32 : 16,
      paddingVertical: isLarge ? 16 : 12,
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
      width: isLarge ? 56 : 44,
      height: isLarge ? 56 : 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 8,
    },
    headerTitle: {
      fontSize: isLarge ? 24 : 18,
      fontWeight: 'bold',
      color: '#1f2937',
    },
    headerSubtitle: {
      fontSize: isLarge ? 14 : 12,
      color: '#6b7280',
      marginTop: 2,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    sectionTitle: {
      fontSize: isLarge ? 24 : 18,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: isLarge ? 16 : 12,
      paddingHorizontal: isLarge ? 32 : 16,
    },
    sectionSubtitle: {
      fontSize: isLarge ? 16 : 13,
      color: '#6b7280',
      marginBottom: isLarge ? 16 : 12,
      paddingHorizontal: isLarge ? 32 : 16,
    },
    // Demand Heatmap
    heatmapSection: {
      marginTop: isLarge ? 24 : 16,
      marginBottom: isLarge ? 24 : 16,
    },
    heatmapContainer: {
      paddingHorizontal: isLarge ? 32 : 16,
    },
    heatmapScroll: {
      flexDirection: 'row',
      gap: isLarge ? 12 : 8,
    },
    heatmapDay: {
      alignItems: 'center',
      minWidth: isLarge ? 60 : 50,
      paddingVertical: isLarge ? 12 : 10,
      paddingHorizontal: isLarge ? 8 : 6,
      borderRadius: isLarge ? 12 : 10,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    heatmapDate: {
      fontSize: isLarge ? 16 : 14,
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: 4,
    },
    heatmapDayName: {
      fontSize: isLarge ? 12 : 10,
      color: '#6b7280',
      marginBottom: 8,
    },
    heatmapIndicator: {
      width: isLarge ? 24 : 20,
      height: isLarge ? 24 : 20,
      borderRadius: isLarge ? 12 : 10,
      marginBottom: 4,
    },
    heatmapEventIcon: {
      marginTop: 4,
    },
    heatmapLegend: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: isLarge ? 16 : 12,
      paddingHorizontal: isLarge ? 32 : 16,
      marginTop: isLarge ? 16 : 12,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    legendDot: {
      width: isLarge ? 12 : 10,
      height: isLarge ? 12 : 10,
      borderRadius: 6,
    },
    legendText: {
      fontSize: isLarge ? 14 : 12,
      color: '#6b7280',
    },
    // KPI Cards
    kpiSection: {
      marginBottom: isLarge ? 32 : 24,
    },
    kpiCardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: isLarge ? 32 : 16,
      gap: isLarge ? 16 : 12,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    // Chart Section
    chartSection: {
      marginBottom: isLarge ? 32 : 24,
    },
    chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: isLarge ? 32 : 16,
      marginBottom: isLarge ? 16 : 12,
    },
    chartToggle: {
      flexDirection: 'row',
      backgroundColor: '#f3f4f6',
      borderRadius: 8,
      padding: 2,
      gap: 4,
    },
    toggleButton: {
      paddingVertical: isLarge ? 10 : 8,
      paddingHorizontal: isLarge ? 16 : 12,
      borderRadius: 6,
      minWidth: isLarge ? 120 : 100,
      alignItems: 'center',
    },
    toggleButtonActive: {
      backgroundColor: '#2563eb',
    },
    toggleButtonText: {
      fontSize: isLarge ? 14 : 12,
      color: '#6b7280',
      fontWeight: '500',
    },
    toggleButtonTextActive: {
      color: '#ffffff',
      fontWeight: '600',
    },
    chartContainer: {
      paddingHorizontal: isLarge ? 32 : 16,
      marginBottom: isLarge ? 16 : 12,
    },
    chartWrapper: {
      backgroundColor: '#ffffff',
      borderRadius: isLarge ? 16 : 12,
      padding: isLarge ? 16 : 8,
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    chart: {
      borderRadius: 8,
    },
    chartLegend: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: isLarge ? 24 : 16,
      paddingHorizontal: isLarge ? 32 : 16,
      marginTop: isLarge ? 12 : 8,
    },
    // Events Section
    eventsSection: {
      marginBottom: isLarge ? 32 : 24,
    },
    eventsList: {
      paddingHorizontal: isLarge ? 32 : 16,
      gap: isLarge ? 16 : 12,
    },
    eventCard: {
      backgroundColor: '#ffffff',
      borderRadius: isLarge ? 16 : 12,
      padding: isLarge ? 20 : 16,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    eventHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: isLarge ? 12 : 8,
    },
    eventIcon: {
      marginRight: isLarge ? 12 : 8,
      marginTop: 2,
    },
    eventTitle: {
      flex: 1,
      fontSize: isLarge ? 16 : 14,
      fontWeight: '600',
      color: '#1f2937',
      lineHeight: isLarge ? 22 : 20,
    },
    eventDate: {
      fontSize: isLarge ? 14 : 12,
      color: '#6b7280',
      marginTop: isLarge ? 8 : 6,
    },
  });

  const styles = getResponsiveStyles(isLargeScreen);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Sticky Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.openDrawer()}
            style={styles.headerButton}
          >
            <Icon name="menu" size={isLargeScreen ? 28 : 24} color="#1f2937" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Demand Forecast</Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              Abu Dhabi
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => setLensVisible(true)}
              style={styles.headerButton}
            >
              <Icon name="chat" size={isLargeScreen ? 26 : 22} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilterModalVisible(true)}
              style={styles.headerButton}
            >
              <Icon name="tune" size={isLargeScreen ? 26 : 22} color="#1f2937" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="more-vert" size={isLargeScreen ? 26 : 22} color="#1f2937" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Demand Heatmap */}
          <View style={styles.heatmapSection}>
            <Text style={styles.sectionTitle}>Demand Forecast</Text>
            <Text style={styles.sectionSubtitle}>
              Next 15 Days - 10 Feb '26 - 24 Feb '26
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.heatmapContainer}
            >
              <View style={styles.heatmapScroll}>
                {demandHeatmapData.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.heatmapDay}
                    onPress={() => handleDatePress(day)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.heatmapDate}>{day.date}</Text>
                    <Text style={styles.heatmapDayName}>{day.day}</Text>
                    <View
                      style={[
                        styles.heatmapIndicator,
                        { backgroundColor: getDemandColor(day.demand) },
                      ]}
                    />
                    {day.hasEvent && (
                      <Icon
                        name="star"
                        size={isLargeScreen ? 16 : 14}
                        color="#f59e0b"
                        style={styles.heatmapEventIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={styles.heatmapLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
                <Text style={styles.legendText}>Low</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#60a5fa' }]} />
                <Text style={styles.legendText}>Normal</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
                <Text style={styles.legendText}>High</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#f97316' }]} />
                <Text style={styles.legendText}>Very High</Text>
              </View>
              <View style={styles.legendItem}>
                <Icon name="star" size={isLargeScreen ? 14 : 12} color="#f59e0b" />
                <Text style={styles.legendText}>Events</Text>
              </View>
            </View>
          </View>

          {/* Market KPI Cards */}
          <View style={styles.kpiSection}>
            <Text style={styles.sectionTitle}>Market Summary</Text>
            <Text style={styles.sectionSubtitle}>
              Key performance indicators and market positioning
            </Text>
            <View style={styles.kpiCardsContainer}>
              {marketKPIs.map((kpi) => (
                <KPICard
                  key={kpi.id}
                  {...kpi}
                />
              ))}
            </View>
          </View>

          {/* Trends Table */}
          <View style={styles.chartSection}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.sectionTitle}>Trends</Text>
                <Text style={styles.sectionSubtitle}>
                  Demand forecast and pricing analysis
                </Text>
              </View>
            </View>

            <View style={styles.chartContainer}>
              <DemandTrendsTable
                onDatePress={(rowData) => {
                  handleDatePress({
                    date: rowData.date,
                    myADR: rowData.myADR,
                    marketADR: rowData.marketADR,
                    travellers: rowData.airTravellers,
                    demand: rowData.demand,
                    demandValue: rowData.demandValue,
                    demandIndex: rowData.demandIndex,
                    event: rowData.event,
                  });
                }}
              />
            </View>
          </View>

          {/* Events & Holidays */}
          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>Top Events & Holidays</Text>
            <View style={styles.eventsList}>
              {events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => handleDatePress(event)}
                  activeOpacity={0.7}
                >
                  <View style={styles.eventHeader}>
                    <Icon
                      name="event"
                      size={isLargeScreen ? 20 : 18}
                      color="#f59e0b"
                      style={styles.eventIcon}
                    />
                    <Text style={styles.eventTitle} numberOfLines={2}>
                      {event.title}
                    </Text>
                  </View>
                  <Text style={styles.eventDate}>
                    {event.startDate} - {event.endDate}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Modals and Sheets */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(filters) => console.log('Filters applied:', filters)}
      />

      <BottomSheet
        visible={dateSheetVisible}
        onClose={() => setDateSheetVisible(false)}
        title={selectedDate?.date || 'Date Details'}
        height={isLargeScreen ? 500 : 450}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20 }}>
            {selectedDate && (
              <>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
                  {selectedDate.date || selectedDate.title}
                </Text>
                
                {/* Demand Index */}
                {selectedDate.demandIndex !== undefined && (
                  <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      Demand Index
                    </Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2563eb' }}>
                      {selectedDate.demandIndex}
                    </Text>
                  </View>
                )}

                {/* Event Details */}
                {selectedDate.event && (
                  <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Icon name="event" size={20} color="#f59e0b" />
                      <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginLeft: 8 }}>
                        Event
                      </Text>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#1f2937', marginBottom: 6 }}>
                      {selectedDate.event.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>
                      {selectedDate.event.startDate} - {selectedDate.event.endDate}
                    </Text>
                  </View>
                )}

                {/* My ADR */}
                {selectedDate.myADR && (
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      My ADR
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
                      ${selectedDate.myADR}
                    </Text>
                  </View>
                )}

                {/* Market ADR */}
                {selectedDate.marketADR && (
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      Market ADR
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
                      ${selectedDate.marketADR}
                    </Text>
                  </View>
                )}

                {/* Air Travellers */}
                {selectedDate.travellers && (
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      Air Travellers
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
                      {selectedDate.travellers}
                    </Text>
                  </View>
                )}

                {/* Demand Level */}
                {selectedDate.demand && (
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      Demand Level
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          backgroundColor: getDemandColor(selectedDate.demand.toLowerCase()),
                        }}
                      />
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
                        {getDemandLabel(selectedDate.demand.toLowerCase())}
                      </Text>
                      {selectedDate.demandValue && (
                        <Text style={{ fontSize: 14, color: '#6b7280' }}>
                          ({selectedDate.demandValue})
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </BottomSheet>

      <LensChatbot
        visible={lensVisible}
        onClose={() => setLensVisible(false)}
        propertyName="City Hotel Gotland"
      />
    </View>
  );
};

export default DemandForecastScreen;
