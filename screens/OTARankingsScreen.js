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
import LensChatbot from '../components/LensChatbot';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const OTARankingsScreen = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [viewMode, setViewMode] = useState('rank'); // 'rank' or 'reviews'
  const [selectedOTA, setSelectedOTA] = useState(null);
  const [detailsSheetVisible, setDetailsSheetVisible] = useState(false);

  // OTA Data for Rank View
  const otaRankData = [
    {
      id: 1,
      name: 'Booking.com',
      logo: 'B',
      logoColor: '#003580',
      isActive: true,
      currentRank: 81,
      totalRankings: 500,
      rankChange: -49,
      changeType: 'up', // Lower rank number is better
      changePeriod: 'vs. Last 1 week',
      trendData: [130, 125, 115, 105, 95, 88, 81],
      trendLabels: ['11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb', '16 Feb', '17 Feb'],
    },
    {
      id: 2,
      name: 'Agoda',
      logo: 'A',
      logoColor: '#FF6600',
      isActive: true,
      currentRank: 81,
      totalRankings: 500,
      rankChange: -49,
      changeType: 'up',
      changePeriod: 'vs. Last 1 week',
      trendData: [130, 125, 115, 105, 95, 88, 81],
      trendLabels: ['11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb', '16 Feb', '17 Feb'],
    },
    {
      id: 3,
      name: 'Expedia',
      logo: 'E',
      logoColor: '#FF8000',
      isActive: true,
      currentRank: 95,
      totalRankings: 500,
      rankChange: -12,
      changeType: 'up',
      changePeriod: 'vs. Last 1 week',
      trendData: [107, 105, 103, 101, 99, 97, 95],
      trendLabels: ['11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb', '16 Feb', '17 Feb'],
    },
  ];

  // OTA Data for Reviews View
  const otaReviewsData = [
    {
      id: 1,
      name: 'Booking.com',
      logo: 'B',
      logoColor: '#003580',
      isActive: true,
      reviewScore: 8.6,
      maxScore: 10,
      reviewCount: 1245,
      reviewChange: 23,
      changeType: 'up',
      changePeriod: 'vs. Last 1 week',
      volumeTrendData: [1200, 1210, 1215, 1220, 1225, 1235, 1245],
      volumeTrendLabels: ['11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb', '16 Feb', '17 Feb'],
      scoreTrendData: [8.4, 8.45, 8.5, 8.52, 8.55, 8.58, 8.6],
    },
    {
      id: 2,
      name: 'Agoda',
      logo: 'A',
      logoColor: '#FF6600',
      isActive: true,
      reviewScore: 8.6,
      maxScore: 10,
      reviewCount: 1180,
      reviewChange: 18,
      changeType: 'up',
      changePeriod: 'vs. Last 1 week',
      volumeTrendData: [1150, 1160, 1165, 1170, 1175, 1178, 1180],
      volumeTrendLabels: ['11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb', '16 Feb', '17 Feb'],
      scoreTrendData: [8.4, 8.45, 8.5, 8.52, 8.55, 8.58, 8.6],
    },
    {
      id: 3,
      name: 'Expedia',
      logo: 'E',
      logoColor: '#FF8000',
      isActive: true,
      reviewScore: 8.3,
      maxScore: 10,
      reviewCount: 980,
      reviewChange: 12,
      changeType: 'up',
      changePeriod: 'vs. Last 1 week',
      volumeTrendData: [960, 965, 970, 972, 975, 978, 980],
      volumeTrendLabels: ['11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb', '16 Feb', '17 Feb'],
      scoreTrendData: [8.2, 8.25, 8.28, 8.3, 8.3, 8.3, 8.3],
    },
  ];

  const handleOTAPress = (ota) => {
    setSelectedOTA(ota);
    setDetailsSheetVisible(true);
  };

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
      r: '4',
      strokeWidth: '2',
      stroke: '#2563eb',
    },
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
    // Tabs Section
    tabsSection: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      paddingHorizontal: isLarge ? 32 : 16,
      paddingVertical: isLarge ? 12 : 8,
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: '#f3f4f6',
      borderRadius: isLarge ? 10 : 8,
      padding: 4,
      gap: 4,
    },
    tabButton: {
      flex: 1,
      paddingVertical: isLarge ? 12 : 10,
      paddingHorizontal: isLarge ? 16 : 12,
      borderRadius: isLarge ? 8 : 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabButtonActive: {
      backgroundColor: '#2563eb',
    },
    tabButtonText: {
      fontSize: isLarge ? 16 : 14,
      fontWeight: '600',
      color: '#6b7280',
    },
    tabButtonTextActive: {
      color: '#ffffff',
    },
    // OTA Cards Section
    otasSection: {
      marginTop: isLarge ? 24 : 16,
      marginBottom: isLarge ? 32 : 24,
    },
    otasContainer: {
      paddingHorizontal: isLarge ? 32 : 16,
      gap: isLarge ? 16 : 12,
    },
    otaCard: {
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
    otaCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: isLarge ? 16 : 12,
    },
    otaCardHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    otaLogo: {
      width: isLarge ? 48 : 40,
      height: isLarge ? 48 : 40,
      borderRadius: isLarge ? 12 : 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isLarge ? 12 : 10,
    },
    otaLogoText: {
      color: '#ffffff',
      fontSize: isLarge ? 20 : 18,
      fontWeight: 'bold',
    },
    otaName: {
      fontSize: isLarge ? 18 : 16,
      fontWeight: '600',
      color: '#1f2937',
    },
    activeBadge: {
      backgroundColor: '#10b981',
      paddingHorizontal: isLarge ? 10 : 8,
      paddingVertical: isLarge ? 6 : 4,
      borderRadius: isLarge ? 6 : 4,
    },
    activeBadgeText: {
      color: '#ffffff',
      fontSize: isLarge ? 11 : 10,
      fontWeight: '600',
    },
    // Rank View Styles
    rankSection: {
      marginBottom: isLarge ? 20 : 16,
    },
    rankLabel: {
      fontSize: isLarge ? 13 : 12,
      color: '#6b7280',
      marginBottom: isLarge ? 8 : 6,
    },
    rankValue: {
      fontSize: isLarge ? 32 : 28,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: isLarge ? 8 : 6,
    },
    rankChange: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    rankChangeText: {
      fontSize: isLarge ? 14 : 13,
      fontWeight: '600',
    },
    rankChangeUp: {
      color: '#10b981',
    },
    rankChangeDown: {
      color: '#ef4444',
    },
    rankChangePeriod: {
      fontSize: isLarge ? 12 : 11,
      color: '#6b7280',
    },
    // Reviews View Styles
    reviewsSection: {
      marginBottom: isLarge ? 20 : 16,
    },
    reviewScoreRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: isLarge ? 12 : 10,
    },
    reviewScore: {
      fontSize: isLarge ? 36 : 32,
      fontWeight: 'bold',
      color: '#1f2937',
      marginRight: 8,
    },
    reviewMaxScore: {
      fontSize: isLarge ? 20 : 18,
      color: '#6b7280',
    },
    reviewCount: {
      fontSize: isLarge ? 14 : 13,
      color: '#6b7280',
      marginBottom: isLarge ? 8 : 6,
    },
    reviewChange: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    reviewChangeText: {
      fontSize: isLarge ? 14 : 13,
      fontWeight: '600',
    },
    reviewChangeUp: {
      color: '#10b981',
    },
    reviewChangeDown: {
      color: '#ef4444',
    },
    reviewChangePeriod: {
      fontSize: isLarge ? 12 : 11,
      color: '#6b7280',
    },
    // Trend Chart Section
    trendSection: {
      marginTop: isLarge ? 20 : 16,
    },
    trendTitle: {
      fontSize: isLarge ? 16 : 14,
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: isLarge ? 12 : 10,
    },
    chartContainer: {
      backgroundColor: '#ffffff',
      borderRadius: isLarge ? 12 : 10,
      padding: isLarge ? 16 : 12,
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    chartWrapper: {
      alignItems: 'center',
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
            <Text style={styles.headerTitle}>OTA Rankings</Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              City Hotel Gotland
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

        {/* Tabs */}
        <View style={styles.tabsSection}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, viewMode === 'rank' && styles.tabButtonActive]}
              onPress={() => setViewMode('rank')}
            >
              <Text style={[styles.tabButtonText, viewMode === 'rank' && styles.tabButtonTextActive]}>
                Rank
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, viewMode === 'reviews' && styles.tabButtonActive]}
              onPress={() => setViewMode('reviews')}
            >
              <Text style={[styles.tabButtonText, viewMode === 'reviews' && styles.tabButtonTextActive]}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* OTA Cards */}
          <View style={styles.otasSection}>
            <View style={styles.otasContainer}>
              {(viewMode === 'rank' ? otaRankData : otaReviewsData).map((ota) => (
                <TouchableOpacity
                  key={ota.id}
                  style={styles.otaCard}
                  onPress={() => handleOTAPress(ota)}
                  activeOpacity={0.7}
                >
                  {/* Card Header */}
                  <View style={styles.otaCardHeader}>
                    <View style={styles.otaCardHeaderLeft}>
                      <View style={[styles.otaLogo, { backgroundColor: ota.logoColor }]}>
                        <Text style={styles.otaLogoText}>{ota.logo}</Text>
                      </View>
                      <Text style={styles.otaName}>{ota.name}</Text>
                    </View>
                    {ota.isActive && (
                      <View style={styles.activeBadge}>
                        <Text style={styles.activeBadgeText}>Active</Text>
                      </View>
                    )}
                  </View>

                  {/* Rank View Content */}
                  {viewMode === 'rank' && (
                    <>
                      <View style={styles.rankSection}>
                        <Text style={styles.rankLabel}>RANK</Text>
                        <Text style={styles.rankValue}>
                          {ota.currentRank} / {ota.totalRankings}
                        </Text>
                        <View style={styles.rankChange}>
                          <Icon
                            name={ota.changeType === 'up' ? 'arrow-downward' : 'arrow-upward'}
                            size={isLargeScreen ? 16 : 14}
                            color={ota.changeType === 'up' ? '#10b981' : '#ef4444'}
                          />
                          <Text
                            style={[
                              styles.rankChangeText,
                              ota.changeType === 'up' ? styles.rankChangeUp : styles.rankChangeDown,
                            ]}
                          >
                            {Math.abs(ota.rankChange)}
                          </Text>
                          <Text style={styles.rankChangePeriod}>{ota.changePeriod}</Text>
                        </View>
                      </View>

                      {/* Rank Trend Chart */}
                      <View style={styles.trendSection}>
                        <Text style={styles.trendTitle}>Ranking Trend</Text>
                        <View style={styles.chartContainer}>
                          <View style={styles.chartWrapper}>
                            <LineChart
                              data={{
                                labels: ota.trendLabels,
                                datasets: [
                                  {
                                    data: ota.trendData,
                                    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                                    strokeWidth: 2,
                                  },
                                ],
                              }}
                              width={width - (isLargeScreen ? 96 : 64)}
                              height={isLargeScreen ? 200 : 160}
                              chartConfig={chartConfig}
                              bezier
                              withInnerLines={false}
                              withOuterLines={true}
                              withVerticalLabels={true}
                              withHorizontalLabels={true}
                              withDots={true}
                              withShadow={false}
                              style={{
                                marginVertical: 8,
                                borderRadius: 8,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </>
                  )}

                  {/* Reviews View Content */}
                  {viewMode === 'reviews' && (
                    <>
                      <View style={styles.reviewsSection}>
                        <Text style={styles.rankLabel}>REVIEW SCORE</Text>
                        <View style={styles.reviewScoreRow}>
                          <Text style={styles.reviewScore}>{ota.reviewScore}</Text>
                          <Text style={styles.reviewMaxScore}>/ {ota.maxScore}</Text>
                        </View>
                        <Text style={styles.reviewCount}>
                          {ota.reviewCount.toLocaleString()} reviews
                        </Text>
                        <View style={styles.reviewChange}>
                          <Icon
                            name={ota.changeType === 'up' ? 'arrow-upward' : 'arrow-downward'}
                            size={isLargeScreen ? 16 : 14}
                            color={ota.changeType === 'up' ? '#10b981' : '#ef4444'}
                          />
                          <Text
                            style={[
                              styles.reviewChangeText,
                              ota.changeType === 'up' ? styles.reviewChangeUp : styles.reviewChangeDown,
                            ]}
                          >
                            +{ota.reviewChange}
                          </Text>
                          <Text style={styles.reviewChangePeriod}>{ota.changePeriod}</Text>
                        </View>
                      </View>

                      {/* Review Volume Trend Chart */}
                      <View style={styles.trendSection}>
                        <Text style={styles.trendTitle}>Review Volume Trend</Text>
                        <View style={styles.chartContainer}>
                          <View style={styles.chartWrapper}>
                            <LineChart
                              data={{
                                labels: ota.volumeTrendLabels,
                                datasets: [
                                  {
                                    data: ota.volumeTrendData,
                                    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                                    strokeWidth: 2,
                                  },
                                ],
                              }}
                              width={width - (isLargeScreen ? 96 : 64)}
                              height={isLargeScreen ? 200 : 160}
                              chartConfig={chartConfig}
                              bezier
                              withInnerLines={false}
                              withOuterLines={true}
                              withVerticalLabels={true}
                              withHorizontalLabels={true}
                              withDots={true}
                              withShadow={false}
                              style={{
                                marginVertical: 8,
                                borderRadius: 8,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </>
                  )}
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
        visible={detailsSheetVisible}
        onClose={() => setDetailsSheetVisible(false)}
        title={selectedOTA?.name || 'OTA Details'}
        height={isLargeScreen ? 500 : 400}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20 }}>
            {selectedOTA && (
              <>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
                  {selectedOTA.name} Details
                </Text>
                {viewMode === 'rank' && (
                  <>
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                        Current Rank
                      </Text>
                      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
                        {selectedOTA.currentRank} / {selectedOTA.totalRankings}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                        Rank Change
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: '600', color: selectedOTA.changeType === 'up' ? '#10b981' : '#ef4444' }}>
                        {selectedOTA.changeType === 'up' ? '-' : '+'}{Math.abs(selectedOTA.rankChange)} {selectedOTA.changePeriod}
                      </Text>
                    </View>
                  </>
                )}
                {viewMode === 'reviews' && (
                  <>
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                        Review Score
                      </Text>
                      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
                        {selectedOTA.reviewScore} / {selectedOTA.maxScore}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                        Total Reviews
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>
                        {selectedOTA.reviewCount.toLocaleString()}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                        Review Change
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: '600', color: selectedOTA.changeType === 'up' ? '#10b981' : '#ef4444' }}>
                        +{selectedOTA.reviewChange} {selectedOTA.changePeriod}
                      </Text>
                    </View>
                  </>
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

export default OTARankingsScreen;
