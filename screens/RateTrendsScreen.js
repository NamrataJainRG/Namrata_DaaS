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
import FilterModal from '../components/FilterModal';
import RateEvolutionSheet from '../components/RateEvolutionSheet';
import CompetitorCard from '../components/CompetitorCard';
import ChartTooltip from '../components/ChartTooltip';
import LensChatbot from '../components/LensChatbot';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const RateTrendsScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('trend'); // 'trend', 'calendar', 'compare'
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [evolutionSheetVisible, setEvolutionSheetVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [selectedCompareDateIndex, setSelectedCompareDateIndex] = useState(2); // Default to Feb 12
  const [dateRange, setDateRange] = useState(7); // Default 7 days, can be 14 or 30

  // Sample data - extendable for 14+ days
  const getRateTrendsData = (days = 7) => {
    const baseLabels = ['Feb 10', 'Feb 11', 'Feb 12', 'Feb 13', 'Feb 14', 'Feb 15', 'Feb 16'];
    const baseMyHotel = [null, null, 468, 668, 584, 342, 401];
    const baseCompset = [759, 808, 669, 582, 557, 454, 480];
    
    if (days <= 7) {
      return {
        labels: baseLabels,
        datasets: [
          {
            data: baseMyHotel,
            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
            strokeWidth: 3,
          },
          {
            data: baseCompset,
            color: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      };
    }
    
    // Extend for 14+ days
    const extendedLabels = [];
    const extendedMyHotel = [];
    const extendedCompset = [];
    
    for (let i = 0; i < days; i++) {
      if (i < 7) {
        extendedLabels.push(baseLabels[i]);
        extendedMyHotel.push(baseMyHotel[i]);
        extendedCompset.push(baseCompset[i]);
      } else {
        const day = 17 + (i - 7);
        extendedLabels.push(`Feb ${day}`);
        extendedMyHotel.push(400 + Math.floor(Math.random() * 200));
        extendedCompset.push(450 + Math.floor(Math.random() * 200));
      }
    }
    
    return {
      labels: extendedLabels,
      datasets: [
        {
          data: extendedMyHotel,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          strokeWidth: 3,
        },
        {
          data: extendedCompset,
          color: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  const rateTrendsData = getRateTrendsData(dateRange);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '3',
      stroke: '#ffffff',
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid lines
      stroke: '#e5e7eb',
      strokeWidth: 1,
    },
    fillShadowGradient: '#2563eb',
    fillShadowGradientOpacity: 0.1,
  };

  // Calendar data
  const calendarData = [
    { date: '10', day: 'Tue', rate: null, status: 'sold-out', roomType: null, delta: null, isLowest: false },
    { date: '11', day: 'Wed', rate: null, status: 'sold-out', roomType: null, delta: null, isLowest: false },
    { date: '12', day: 'Thu', rate: 468, status: 'available', roomType: 'DLX', delta: null, isLowest: true },
    { date: '13', day: 'Fri', rate: 668, status: 'available', roomType: 'STE', delta: '+200', isLowest: false },
    { date: '14', day: 'Sat', rate: 584, status: 'available', roomType: 'STE', delta: '-84', isLowest: false },
    { date: '15', day: 'Sun', rate: 342, status: 'available', roomType: 'DLX', delta: '-242', isLowest: true },
    { date: '16', day: 'Mon', rate: 401, status: 'available', roomType: 'DLX', delta: '+59', isLowest: true },
  ];

  // Get data for selected date
  const getCompareViewData = () => {
    const dateIndex = selectedCompareDateIndex;
    const myRate = rateTrendsData.datasets[0].data[dateIndex];
    const compsetAvg = rateTrendsData.datasets[1].data[dateIndex];
    
    // Competitor rates for the selected date (matching RateTrendsTable structure)
    // These are the actual competitor hotels, not including the subscriber property
    const competitorRates = [
      myRate !== null ? myRate + 2 : null, // Hotel Alexander Plaza
      myRate !== null ? myRate - 13 : null, // Comfort Hotel Auberge
    ];

    return {
      myProperty: {
        name: 'City Hotel Gotland',
        rate: myRate,
        variance: myRate !== null && compsetAvg !== null ? myRate - compsetAvg : null, // My rate vs Compset Avg
        rank: null,
        isMyProperty: true,
      },
      compsetAvg: {
        name: 'Avg Compset',
        rate: compsetAvg,
        variance: null, // Avg Compset doesn't have variance
        rank: null,
        isCompset: true,
      },
      competitors: [
        { 
          name: 'Hotel Alexander Plaza', 
          rate: competitorRates[0], 
          variance: competitorRates[0] !== null && myRate !== null ? competitorRates[0] - myRate : null, 
          rank: 1, 
          isLowest: false,
          status: competitorRates[0] === null ? 'sold-out' : 'available',
        },
        { 
          name: 'Comfort Hotel Auberge', 
          rate: competitorRates[1], 
          variance: competitorRates[1] !== null && myRate !== null ? competitorRates[1] - myRate : null, 
          rank: 2, 
          isLowest: competitorRates[1] !== null && myRate !== null && competitorRates[1] < myRate,
          status: competitorRates[1] === null ? 'sold-out' : 'available',
        },
      ],
    };
  };

  const compareData = getCompareViewData();

  // Tooltip data for each date - dynamically generated
  const getTooltipDataMap = (days = 7, chartData) => {
    const map = {
      0: { date: '10 Feb, Tue', myRate: null, compsetAvg: 759, variance: null, rank: null, event: 'Event' },
      1: { date: '11 Feb, Wed', myRate: null, compsetAvg: 808, variance: null, rank: null, event: 'Event' },
      2: { date: '12 Feb, Thu', myRate: 468, compsetAvg: 669, variance: -201, rank: 1, event: null },
      3: { date: '13 Feb, Fri', myRate: 668, compsetAvg: 582, variance: 86, rank: 3, event: 'World Conference on Science Engi...' },
      4: { date: '14 Feb, Sat', myRate: 584, compsetAvg: 557, variance: 27, rank: 3, event: null },
      5: { date: '15 Feb, Sun', myRate: 342, compsetAvg: 454, variance: -112, rank: 1, event: null },
      6: { date: '16 Feb, Mon', myRate: 401, compsetAvg: 480, variance: -79, rank: 1, event: null },
    };
    
    // Extend for 14+ days
    if (days > 7 && chartData) {
      for (let i = 7; i < days; i++) {
        const day = 17 + (i - 7);
        const myRate = chartData.datasets[0].data[i];
        const compsetAvg = chartData.datasets[1].data[i];
        const variance = myRate !== null && compsetAvg !== null ? myRate - compsetAvg : null;
        map[i] = {
          date: `${day} Feb`,
          myRate: myRate,
          compsetAvg: compsetAvg,
          variance: variance,
          rank: null,
          event: null,
        };
      }
    }
    
    return map;
  };

  const tooltipDataMap = getTooltipDataMap(dateRange, rateTrendsData);

  const handleDatePress = (date, data) => {
    setSelectedDate(date);
    setSelectedDateData(data);
    setEvolutionSheetVisible(true);
  };

  const handleTooltipEvolution = () => {
    const index = Object.keys(tooltipDataMap).find(
      (key) => tooltipDataMap[key].date === tooltipData?.date
    );
    if (index !== undefined) {
      const dateInfo = calendarData[parseInt(index)];
      setTooltipVisible(false);
      handleDatePress(tooltipData.date, {
        myRate: dateInfo.rate,
        compsetAvg: rateTrendsData.datasets[1].data[parseInt(index)],
        date: tooltipData.date,
      });
    }
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
            <Icon name="menu" size={isLargeScreen ? 28 : 24} color="#1f2937" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Rate Trends</Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              Track rate movements and competitive positioning
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

        {/* View Selector */}
        <View style={styles.viewSelector}>
          <TouchableOpacity
            style={[styles.viewTab, viewMode === 'trend' && styles.viewTabActive]}
            onPress={() => setViewMode('trend')}
            activeOpacity={0.7}
          >
            <Icon
              name="show-chart"
              size={18}
              color={viewMode === 'trend' ? '#2563eb' : '#6b7280'}
            />
            <Text
              style={[
                styles.viewTabText,
                viewMode === 'trend' && styles.viewTabTextActive,
              ]}
            >
              Trend
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewTab, viewMode === 'calendar' && styles.viewTabActive]}
            onPress={() => setViewMode('calendar')}
            activeOpacity={0.7}
          >
            <Icon
              name="calendar-today"
              size={18}
              color={viewMode === 'calendar' ? '#2563eb' : '#6b7280'}
            />
            <Text
              style={[
                styles.viewTabText,
                viewMode === 'calendar' && styles.viewTabTextActive,
              ]}
            >
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewTab, viewMode === 'compare' && styles.viewTabActive]}
            onPress={() => setViewMode('compare')}
            activeOpacity={0.7}
          >
            <Icon
              name="compare-arrows"
              size={18}
              color={viewMode === 'compare' ? '#2563eb' : '#6b7280'}
            />
            <Text
              style={[
                styles.viewTabText,
                viewMode === 'compare' && styles.viewTabTextActive,
              ]}
            >
              Compare
            </Text>
          </TouchableOpacity>
        </View>

        {/* Helper Text */}
        <View style={styles.helperText}>
          <Icon name="info-outline" size={14} color="#6b7280" />
          <Text style={styles.helperTextContent}>
            Tap any date or chart point to view rate evolution
          </Text>
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {viewMode === 'trend' && (
            <View style={styles.trendView}>
              <View style={styles.chartHeader}>
                <View>
                  <Text style={styles.chartTitle}>Trend Analysis</Text>
                  <Text style={styles.chartSubtitle}>
                    Subscriber vs Compset Average (Next 7 Days)
                  </Text>
                </View>
              </View>

              <View style={styles.chartContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={dateRange >= 14}
                  contentContainerStyle={styles.chartScrollContent}
                  style={styles.chartScrollView}
                >
                  <View style={styles.chartWrapper}>
                    <LineChart
                      data={rateTrendsData}
                      width={Math.max(width - (isLargeScreen ? 64 : 32), dateRange * (isLargeScreen ? 80 : 70))}
                      height={isLargeScreen ? 320 : 240}
                      chartConfig={chartConfig}
                      bezier
                      style={styles.chart}
                      withInnerLines={true}
                      withOuterLines={true}
                      withVerticalLabels={true}
                      withHorizontalLabels={true}
                      withDots={true}
                      withShadow={true}
                      segments={4}
                      onDataPointClick={(data) => {
                        const index = data.index;
                        const tooltipInfo = tooltipDataMap[index];
                        if (tooltipInfo) {
                          setTooltipData(tooltipInfo);
                          setTooltipVisible(true);
                        }
                      }}
                    />
                  </View>
                </ScrollView>
                {/* Clickable Date Labels */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chartDateLabelsScrollContent}
                  style={styles.chartDateLabelsScroll}
                >
                  <View style={styles.chartDateLabels}>
                    {rateTrendsData.labels.map((date, index) => {
                      const myRate = rateTrendsData.datasets[0].data[index];
                      const compsetAvg = rateTrendsData.datasets[1].data[index];
                      const variance = myRate !== null && compsetAvg !== null ? myRate - compsetAvg : null;
                      const isHigher = variance !== null && variance > 0;
                      const isLower = variance !== null && variance < 0;
                      
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.dateLabel}
                          onPress={() => {
                            const tooltipInfo = tooltipDataMap[index] || {
                              date: date,
                              myRate: myRate,
                              compsetAvg: compsetAvg,
                              variance: variance,
                            };
                            setTooltipData(tooltipInfo);
                            setTooltipVisible(true);
                          }}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.dateLabelText}>{date.split(' ')[1]}</Text>
                          <View style={styles.dateLabelContent}>
                            {/* My Hotel Rate */}
                            <View style={styles.dateLabelRow}>
                              <Text style={styles.dateLabelType}>My Hotel</Text>
                              {myRate !== null ? (
                                <Text style={styles.dateLabelValue}>${myRate}</Text>
                              ) : (
                                <Text style={styles.dateLabelValueSoldOut}>Sold Out</Text>
                              )}
                            </View>
                            {/* Compset Avg Rate */}
                            <View style={styles.dateLabelRow}>
                              <Text style={styles.dateLabelType}>Compset Avg</Text>
                              {compsetAvg && (
                                <Text style={styles.dateLabelValueSmall}>${compsetAvg}</Text>
                              )}
                            </View>
                            {/* Variance */}
                            {variance !== null && (
                              <View style={styles.dateLabelRow}>
                                <View style={[
                                  styles.varianceContainer,
                                  isHigher && styles.varianceContainerRed,
                                  isLower && styles.varianceContainerGreen,
                                ]}>
                                  <Icon
                                    name={isHigher ? 'add' : 'remove'}
                                    size={12}
                                    color={isHigher ? '#ef4444' : '#10b981'}
                                  />
                                  <Text style={[
                                    styles.varianceText,
                                    isHigher && styles.varianceTextRed,
                                    isLower && styles.varianceTextGreen,
                                  ]}>
                                    ${Math.abs(variance)}
                                  </Text>
                                </View>
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>

              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#2563eb' }]} />
                  <Text style={styles.legendText}>My Hotel</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#9ca3af' }]} />
                  <Text style={styles.legendText}>Compset Avg. Rate</Text>
                </View>
              </View>
            </View>
          )}

          {viewMode === 'calendar' && (
            <View style={styles.calendarView}>
              <Text style={styles.sectionTitle}>Rates Calendar</Text>
              <Text style={styles.sectionSubtitle}>
                In from 10 Feb to 16 Feb
              </Text>
              <View style={styles.calendarCardsContainer}>
                {calendarData.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.calendarCard}
                    onPress={() => handleDatePress(`Feb ${day.date}`, {
                      myRate: day.rate,
                      compsetAvg: rateTrendsData.datasets[1].data[index],
                      date: `Feb ${day.date}`,
                    })}
                    activeOpacity={0.7}
                  >
                    <View style={styles.calendarCardHeader}>
                      <Text style={styles.calendarDate}>{day.date}</Text>
                      {day.isLowest && (
                        <View style={styles.lowestBadge}>
                          <View style={styles.lowestDot} />
                        </View>
                      )}
                    </View>
                    <Text style={styles.calendarDay}>{day.day}</Text>
                    {day.status === 'sold-out' ? (
                      <View style={styles.soldOutContainer}>
                        <Icon name="star" size={16} color="#f59e0b" />
                        <Text style={styles.soldOutText}>Sold Out</Text>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.calendarRate}>${day.rate}</Text>
                        {day.delta && (
                          <Text
                            style={[
                              styles.calendarDelta,
                              day.delta.startsWith('+') ? styles.deltaPositive : styles.deltaNegative,
                            ]}
                          >
                            {day.delta}
                          </Text>
                        )}
                        <Text style={styles.calendarRoomType}>{day.roomType}</Text>
                      </>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {viewMode === 'compare' && (
            <View style={styles.compareView}>
              <Text style={styles.sectionTitle}>Detailed Analysis</Text>
              <Text style={styles.sectionSubtitle}>
                Compare rates across competitors
              </Text>
              
              {/* Date Selector */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateSelector}
              >
                {rateTrendsData.labels.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateChip,
                      selectedCompareDateIndex === index && styles.dateChipActive,
                    ]}
                    onPress={() => setSelectedCompareDateIndex(index)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dateChipText,
                        selectedCompareDateIndex === index && styles.dateChipTextActive,
                      ]}
                    >
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Property Cards */}
              <View style={styles.competitorsContainer}>
                {/* My Property Card */}
                <CompetitorCard
                  competitor={compareData.myProperty}
                  onPress={() => handleDatePress(rateTrendsData.labels[selectedCompareDateIndex], {
                    myRate: compareData.myProperty.rate,
                    compsetAvg: compareData.compsetAvg.rate,
                    date: rateTrendsData.labels[selectedCompareDateIndex],
                  })}
                />

                {/* Avg Compset Card */}
                <CompetitorCard
                  competitor={compareData.compsetAvg}
                  onPress={() => handleDatePress(rateTrendsData.labels[selectedCompareDateIndex], {
                    myRate: compareData.myProperty.rate,
                    compsetAvg: compareData.compsetAvg.rate,
                    date: rateTrendsData.labels[selectedCompareDateIndex],
                  })}
                />

                {/* Competitor Cards */}
                {compareData.competitors.map((competitor, index) => (
                  <CompetitorCard
                    key={index}
                    competitor={competitor}
                    onPress={() => handleDatePress(rateTrendsData.labels[selectedCompareDateIndex], {
                      competitor: competitor.name,
                      rate: competitor.rate,
                      date: rateTrendsData.labels[selectedCompareDateIndex],
                    })}
                  />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Modals and Sheets */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(filters) => console.log('Filters applied:', filters)}
      />

      <RateEvolutionSheet
        visible={evolutionSheetVisible}
        onClose={() => setEvolutionSheetVisible(false)}
        date={selectedDate}
        dateData={selectedDateData}
      />

      <ChartTooltip
        visible={tooltipVisible}
        data={tooltipData}
        onClose={() => setTooltipVisible(false)}
        onViewEvolution={handleTooltipEvolution}
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
  viewSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: isLargeScreen ? 32 : 16,
    paddingVertical: isLargeScreen ? 12 : 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: isLargeScreen ? 16 : 8,
  },
  viewTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isLargeScreen ? 14 : 10,
    paddingHorizontal: isLargeScreen ? 16 : 12,
    borderRadius: isLargeScreen ? 10 : 8,
    backgroundColor: '#f3f4f6',
    gap: 6,
  },
  viewTabActive: {
    backgroundColor: '#eff6ff',
  },
  viewTabText: {
    fontSize: isLargeScreen ? 16 : 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  viewTabTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  helperText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 32 : 16,
    paddingVertical: isLargeScreen ? 12 : 8,
    backgroundColor: '#f9fafb',
    gap: 6,
  },
  helperTextContent: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  trendView: {
    marginTop: isLargeScreen ? 24 : 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: isLargeScreen ? 32 : 16,
    marginBottom: isLargeScreen ? 16 : 12,
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
  chartContainer: {
    marginBottom: isLargeScreen ? 16 : 12,
  },
  chartScrollView: {
    marginHorizontal: isLargeScreen ? 32 : 16,
  },
  chartScrollContent: {
    paddingRight: isLargeScreen ? 16 : 8,
  },
  chartWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: isLargeScreen ? 16 : 12,
    padding: isLargeScreen ? 20 : 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chart: {
    borderRadius: 8,
    marginVertical: 8,
  },
  chartDateLabelsScroll: {
    marginHorizontal: isLargeScreen ? 32 : 16,
    marginTop: isLargeScreen ? 12 : 8,
  },
  chartDateLabelsScrollContent: {
    paddingRight: isLargeScreen ? 16 : 8,
  },
  chartDateLabels: {
    flexDirection: 'row',
    gap: isLargeScreen ? 12 : 8,
  },
  dateLabel: {
    paddingVertical: isLargeScreen ? 12 : 10,
    paddingHorizontal: isLargeScreen ? 12 : 10,
    borderRadius: 12,
    alignItems: 'flex-start',
    minWidth: isLargeScreen ? 100 : 85,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateLabelText: {
    fontSize: isLargeScreen ? 13 : 11,
    color: '#2563eb',
    fontWeight: '600',
    marginBottom: isLargeScreen ? 8 : 6,
  },
  dateLabelContent: {
    width: '100%',
    gap: isLargeScreen ? 6 : 4,
  },
  dateLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dateLabelType: {
    fontSize: isLargeScreen ? 10 : 9,
    color: '#6b7280',
    fontWeight: '500',
  },
  dateLabelValue: {
    fontSize: isLargeScreen ? 13 : 11,
    color: '#1f2937',
    fontWeight: '700',
  },
  dateLabelValueSmall: {
    fontSize: isLargeScreen ? 12 : 10,
    color: '#6b7280',
    fontWeight: '600',
  },
  dateLabelValueSoldOut: {
    fontSize: isLargeScreen ? 11 : 9,
    color: '#f59e0b',
    fontWeight: '700',
  },
  varianceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: isLargeScreen ? 6 : 5,
    paddingVertical: isLargeScreen ? 3 : 2,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    marginTop: 2,
  },
  varianceContainerRed: {
    backgroundColor: '#fee2e2',
  },
  varianceContainerGreen: {
    backgroundColor: '#d1fae5',
  },
  varianceText: {
    fontSize: isLargeScreen ? 11 : 9,
    fontWeight: '700',
    color: '#6b7280',
  },
  varianceTextRed: {
    color: '#ef4444',
  },
  varianceTextGreen: {
    color: '#10b981',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: isLargeScreen ? 24 : 16,
    paddingHorizontal: isLargeScreen ? 32 : 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: isLargeScreen ? 10 : 8,
    height: isLargeScreen ? 10 : 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
  },
  calendarView: {
    marginTop: isLargeScreen ? 24 : 16,
  },
  sectionTitle: {
    fontSize: isLargeScreen ? 24 : 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    paddingHorizontal: isLargeScreen ? 32 : 16,
  },
  sectionSubtitle: {
    fontSize: isLargeScreen ? 16 : 13,
    color: '#6b7280',
    marginBottom: isLargeScreen ? 20 : 16,
    paddingHorizontal: isLargeScreen ? 32 : 16,
  },
  calendarCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: isLargeScreen ? 32 : 16,
    justifyContent: 'space-between',
  },
  calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: isLargeScreen ? 16 : 12,
    padding: isLargeScreen ? 20 : 16,
    width: (width - (isLargeScreen ? 64 : 32) - (isLargeScreen ? 32 : 24)) / 3, // 3 columns: (screen width - padding - gaps) / 3
    marginBottom: isLargeScreen ? 16 : 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  calendarCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  calendarDate: {
    fontSize: isLargeScreen ? 24 : 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  lowestBadge: {
    width: isLargeScreen ? 10 : 8,
    height: isLargeScreen ? 10 : 8,
  },
  lowestDot: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  calendarDay: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
    marginBottom: isLargeScreen ? 12 : 8,
  },
  soldOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: isLargeScreen ? 12 : 8,
  },
  soldOutText: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
  calendarRate: {
    fontSize: isLargeScreen ? 20 : 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  calendarDelta: {
    fontSize: isLargeScreen ? 14 : 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  deltaPositive: {
    color: '#ef4444',
  },
  deltaNegative: {
    color: '#10b981',
  },
  calendarRoomType: {
    fontSize: isLargeScreen ? 12 : 10,
    color: '#6b7280',
    marginTop: 4,
  },
  compareView: {
    marginTop: isLargeScreen ? 24 : 16,
  },
  dateSelector: {
    paddingHorizontal: isLargeScreen ? 32 : 16,
    marginBottom: isLargeScreen ? 20 : 16,
    gap: isLargeScreen ? 12 : 8,
  },
  dateChip: {
    paddingHorizontal: isLargeScreen ? 20 : 16,
    paddingVertical: isLargeScreen ? 12 : 10,
    borderRadius: isLargeScreen ? 20 : 16,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateChipActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#2563eb',
  },
  dateChipText: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  dateChipTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  competitorsContainer: {
    paddingHorizontal: isLargeScreen ? 32 : 16,
    gap: isLargeScreen ? 16 : 12,
  },
});

export default RateTrendsScreen;
