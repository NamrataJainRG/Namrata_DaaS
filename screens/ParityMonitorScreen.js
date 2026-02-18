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
import { MaterialIcons as Icon } from '@expo/vector-icons';
import FilterModal from '../components/FilterModal';
import BottomSheet from '../components/BottomSheet';
import LensChatbot from '../components/LensChatbot';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const ParityMonitorScreen = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [detailsSheetVisible, setDetailsSheetVisible] = useState(false);

  // Channel Performance Data
  const channels = [
    {
      id: 1,
      name: 'Booking.com',
      logo: 'B',
      logoColor: '#003580',
      isBenchmark: true,
      parityScore: 100,
      win: 71,
      meet: 29,
      loss: 0,
      violations: 0,
      rateViolations: 0,
      availabilityViolations: 0,
    },
    {
      id: 2,
      name: 'Agoda',
      logo: 'A',
      logoColor: '#FF6600',
      isBenchmark: false,
      parityScore: 100,
      win: 71,
      meet: 29,
      loss: 0,
      violations: 0,
      rateViolations: 0,
      availabilityViolations: 0,
    },
    {
      id: 3,
      name: 'Expedia',
      logo: 'E',
      logoColor: '#FF8000',
      isBenchmark: false,
      parityScore: 100,
      win: 71,
      meet: 29,
      loss: 0,
      violations: 0,
      rateViolations: 0,
      availabilityViolations: 0,
    },
  ];

  // Daily Parity Data (Feb 10-16) - Realistic mixed outcomes
  const dailyParityData = [
    {
      date: '10 Feb',
      day: 'Mon',
      channels: [
        { channel: 'Booking.com', rate: null, status: 'sold-out', parityScore: 85, win: 45, meet: 35, loss: 20, rateViolations: 0, availabilityViolations: 1 },
        { channel: 'Agoda', rate: null, status: 'sold-out', parityScore: 80, win: 40, meet: 30, loss: 30, rateViolations: 0, availabilityViolations: 1 },
        { channel: 'Expedia', rate: null, status: 'sold-out', parityScore: 90, win: 50, meet: 40, loss: 10, rateViolations: 0, availabilityViolations: 1 },
      ],
    },
    {
      date: '11 Feb',
      day: 'Tue',
      channels: [
        { channel: 'Booking.com', rate: 520, status: 'available', parityScore: 92, win: 60, meet: 25, loss: 15, rateViolations: 1, availabilityViolations: 0 },
        { channel: 'Agoda', rate: 580, status: 'available', parityScore: 88, win: 55, meet: 28, loss: 17, rateViolations: 0, availabilityViolations: 0 },
        { channel: 'Expedia', rate: null, status: 'sold-out', parityScore: 75, win: 35, meet: 30, loss: 35, rateViolations: 0, availabilityViolations: 1 },
      ],
    },
    {
      date: '12 Feb',
      day: 'Wed',
      channels: [
        { channel: 'Booking.com', rate: 468, status: 'available', parityScore: 95, win: 65, meet: 25, loss: 10, rateViolations: 0, availabilityViolations: 0 },
        { channel: 'Agoda', rate: 600, status: 'available', parityScore: 78, win: 40, meet: 38, loss: 22, rateViolations: 1, availabilityViolations: 0 },
        { channel: 'Expedia', rate: null, status: 'sold-out', parityScore: 82, win: 45, meet: 32, loss: 23, rateViolations: 0, availabilityViolations: 1 },
      ],
    },
    {
      date: '13 Feb',
      day: 'Thu',
      channels: [
        { channel: 'Booking.com', rate: 668, status: 'available', parityScore: 88, win: 50, meet: 35, loss: 15, rateViolations: 0, availabilityViolations: 0 },
        { channel: 'Agoda', rate: 750, status: 'available', parityScore: 72, win: 30, meet: 40, loss: 30, rateViolations: 1, availabilityViolations: 0 },
        { channel: 'Expedia', rate: 680, status: 'available', parityScore: 90, win: 55, meet: 30, loss: 15, rateViolations: 0, availabilityViolations: 0 },
      ],
    },
    {
      date: '14 Feb',
      day: 'Fri',
      channels: [
        { channel: 'Booking.com', rate: 584, status: 'available', parityScore: 85, win: 45, meet: 35, loss: 20, rateViolations: 0, availabilityViolations: 0 },
        { channel: 'Agoda', rate: 750, status: 'available', parityScore: 80, win: 42, meet: 33, loss: 25, rateViolations: 1, availabilityViolations: 0 },
        { channel: 'Expedia', rate: null, status: 'sold-out', parityScore: 70, win: 30, meet: 35, loss: 35, rateViolations: 0, availabilityViolations: 1 },
      ],
    },
    {
      date: '15 Feb',
      day: 'Sat',
      channels: [
        { channel: 'Booking.com', rate: 342, status: 'available', parityScore: 93, win: 62, meet: 28, loss: 10, rateViolations: 0, availabilityViolations: 0 },
        { channel: 'Agoda', rate: 450, status: 'available', parityScore: 87, win: 52, meet: 30, loss: 18, rateViolations: 0, availabilityViolations: 0 },
        { channel: 'Expedia', rate: 380, status: 'available', parityScore: 91, win: 58, meet: 28, loss: 14, rateViolations: 0, availabilityViolations: 0 },
      ],
    },
    {
      date: '16 Feb',
      day: 'Sun',
      channels: [
        { channel: 'Booking.com', rate: 401, status: 'available', parityScore: 89, win: 54, meet: 32, loss: 14, rateViolations: 0, availabilityViolations: 0 },
        { channel: 'Agoda', rate: 450, status: 'available', parityScore: 84, win: 48, meet: 32, loss: 20, rateViolations: 1, availabilityViolations: 0 },
        { channel: 'Expedia', rate: null, status: 'sold-out', parityScore: 76, win: 38, meet: 32, loss: 30, rateViolations: 0, availabilityViolations: 1 },
      ],
    },
  ];

  const handleChannelPress = (channel) => {
    setSelectedChannel(channel);
    setDetailsSheetVisible(true);
  };

  const handleDatePress = (dateData) => {
    setSelectedDate(dateData);
    setDetailsSheetVisible(true);
  };

  // Calculate aggregated Win/Meet/Loss for each date
  const getAggregatedWinMeetLoss = (dateData) => {
    let totalWin = 0;
    let totalMeet = 0;
    let totalLoss = 0;
    
    dateData.channels.forEach((ch) => {
      totalWin += ch.win;
      totalMeet += ch.meet;
      totalLoss += ch.loss;
    });
    
    const count = dateData.channels.length;
    return {
      win: Math.round(totalWin / count),
      meet: Math.round(totalMeet / count),
      loss: Math.round(totalLoss / count),
    };
  };

  // Calculate average parity score for a date
  const getAverageParityScore = (dateData) => {
    const total = dateData.channels.reduce((sum, ch) => sum + ch.parityScore, 0);
    return Math.round(total / dateData.channels.length);
  };

  // Get affected channels (channels with issues or sold out)
  const getAffectedChannels = (dateData) => {
    return dateData.channels.filter((ch) => 
      ch.status === 'sold-out' || ch.rateViolations > 0 || ch.availabilityViolations > 0 || ch.loss > 20
    );
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
    // Channel Cards Section
    channelsSection: {
      marginTop: isLarge ? 24 : 16,
      marginBottom: isLarge ? 32 : 24,
    },
    channelsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: isLarge ? 32 : 16,
      gap: isLarge ? 16 : 12,
    },
    channelCard: {
      backgroundColor: '#ffffff',
      borderRadius: isLarge ? 12 : 10,
      padding: isLarge ? 14 : 12,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      width: (width - (isLarge ? 64 : 32) - (isLarge ? 32 : 24)) / 2, // 2 columns
    },
    channelHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: isLarge ? 10 : 8,
    },
    channelLogo: {
      width: isLarge ? 36 : 32,
      height: isLarge ? 36 : 32,
      borderRadius: isLarge ? 10 : 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isLarge ? 8 : 6,
    },
    channelLogoText: {
      color: '#ffffff',
      fontSize: isLarge ? 16 : 14,
      fontWeight: 'bold',
    },
    channelInfo: {
      flex: 1,
    },
    channelName: {
      fontSize: isLarge ? 14 : 12,
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: 2,
    },
    benchmarkBadge: {
      backgroundColor: '#eff6ff',
      paddingHorizontal: isLarge ? 6 : 5,
      paddingVertical: isLarge ? 2 : 2,
      borderRadius: isLarge ? 4 : 3,
      alignSelf: 'flex-start',
    },
    benchmarkText: {
      fontSize: isLarge ? 10 : 9,
      color: '#2563eb',
      fontWeight: '600',
    },
    parityScore: {
      fontSize: isLarge ? 24 : 20,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: isLarge ? 10 : 8,
    },
    winMeetLossContainer: {
      marginBottom: isLarge ? 10 : 8,
    },
    winMeetLossBar: {
      height: isLarge ? 18 : 16,
      borderRadius: isLarge ? 9 : 8,
      flexDirection: 'row',
      overflow: 'hidden',
      marginBottom: isLarge ? 6 : 4,
    },
    winBar: {
      backgroundColor: '#f97316',
      justifyContent: 'center',
      alignItems: 'center',
    },
    meetBar: {
      backgroundColor: '#10b981',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lossBar: {
      backgroundColor: '#ef4444',
      justifyContent: 'center',
      alignItems: 'center',
    },
    winMeetLossLabel: {
      fontSize: isLarge ? 10 : 9,
      color: '#ffffff',
      fontWeight: '600',
      textAlign: 'center',
    },
    miniWinMeetLossBar: {
      height: isLarge ? 16 : 14,
      borderRadius: isLarge ? 8 : 7,
      flexDirection: 'row',
      overflow: 'hidden',
      marginBottom: isLarge ? 4 : 3,
    },
    violationsContainer: {
      marginTop: isLarge ? 8 : 6,
      paddingTop: isLarge ? 8 : 6,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    },
    violationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: isLarge ? 4 : 3,
    },
    violationLabel: {
      fontSize: isLarge ? 11 : 10,
      color: '#6b7280',
    },
    violationValue: {
      fontSize: isLarge ? 11 : 10,
      fontWeight: '600',
      color: '#1f2937',
    },
    // Daily Parity Section
    dailySection: {
      marginBottom: isLarge ? 32 : 24,
    },
    dailyCardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: isLarge ? 32 : 16,
      gap: isLarge ? 12 : 10,
    },
    dailyCard: {
      backgroundColor: '#ffffff',
      borderRadius: isLarge ? 12 : 10,
      padding: isLarge ? 14 : 12,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      width: (width - (isLarge ? 64 : 32) - (isLarge ? 24 : 20)) / 2, // 2 columns
    },
    dailyCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: isLarge ? 10 : 8,
    },
    dailyDateContainer: {
      flex: 1,
    },
    dailyDate: {
      fontSize: isLarge ? 16 : 14,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 2,
    },
    dailyDay: {
      fontSize: isLarge ? 12 : 11,
      color: '#6b7280',
    },
    dailyParityScore: {
      fontSize: isLarge ? 18 : 16,
      fontWeight: 'bold',
      color: '#2563eb',
    },
    dailyAggregatedBar: {
      marginBottom: isLarge ? 10 : 8,
    },
    dailyChannelsIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: isLarge ? 6 : 4,
      marginTop: isLarge ? 8 : 6,
    },
    dailyChannelIcon: {
      width: isLarge ? 28 : 24,
      height: isLarge ? 28 : 24,
      borderRadius: isLarge ? 6 : 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dailyChannelIconText: {
      color: '#ffffff',
      fontSize: isLarge ? 12 : 10,
      fontWeight: 'bold',
    },
    channelRow: {
      marginBottom: isLarge ? 16 : 12,
      paddingBottom: isLarge ? 12 : 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    },
    channelRowHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: isLarge ? 8 : 6,
    },
    channelRowLogo: {
      width: isLarge ? 32 : 28,
      height: isLarge ? 32 : 28,
      borderRadius: isLarge ? 8 : 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isLarge ? 8 : 6,
    },
    channelRowLogoText: {
      color: '#ffffff',
      fontSize: isLarge ? 14 : 12,
      fontWeight: 'bold',
    },
    channelRowName: {
      fontSize: isLarge ? 14 : 13,
      fontWeight: '600',
      color: '#1f2937',
      flex: 1,
    },
    channelRowRate: {
      fontSize: isLarge ? 16 : 14,
      fontWeight: 'bold',
      color: '#1f2937',
    },
    soldOutText: {
      fontSize: isLarge ? 14 : 12,
      color: '#f59e0b',
      fontWeight: '600',
    },
    miniWinMeetLossBar: {
      height: isLarge ? 20 : 18,
      borderRadius: isLarge ? 10 : 9,
      flexDirection: 'row',
      overflow: 'hidden',
      marginTop: isLarge ? 6 : 4,
    },
    legend: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: isLarge ? 16 : 12,
      paddingHorizontal: isLarge ? 32 : 16,
      marginTop: isLarge ? 16 : 12,
      paddingTop: isLarge ? 16 : 12,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    legendSquare: {
      width: isLarge ? 14 : 12,
      height: isLarge ? 14 : 12,
      borderRadius: 2,
    },
    legendText: {
      fontSize: isLarge ? 12 : 11,
      color: '#6b7280',
    },
  });

  const styles = getResponsiveStyles(isLargeScreen);

  const renderWinMeetLossBar = (win, meet, loss, isMini = false) => {
    const total = win + meet + loss;
    const winPercent = total > 0 ? (win / total) * 100 : 0;
    const meetPercent = total > 0 ? (meet / total) * 100 : 0;
    const lossPercent = total > 0 ? (loss / total) * 100 : 0;

    return (
      <View>
        <View style={isMini ? styles.miniWinMeetLossBar : styles.winMeetLossBar}>
          {winPercent > 0 && (
            <View style={[styles.winBar, { width: `${winPercent}%` }]}>
              <Text style={styles.winMeetLossLabel}>{win}%</Text>
            </View>
          )}
          {meetPercent > 0 && (
            <View style={[styles.meetBar, { width: `${meetPercent}%` }]}>
              <Text style={styles.winMeetLossLabel}>{meet}%</Text>
            </View>
          )}
          {lossPercent > 0 && (
            <View style={[styles.lossBar, { width: `${lossPercent}%` }]}>
              <Text style={styles.winMeetLossLabel}>{loss}%</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const getChannelLogoColor = (channelName) => {
    const channel = channels.find((c) => c.name === channelName);
    return channel ? channel.logoColor : '#6b7280';
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
            <Text style={styles.headerTitle}>Parity Monitor</Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              Rate parity monitoring with channel insights
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
          {/* Channel Performance Insights */}
          <View style={styles.channelsSection}>
            <Text style={styles.sectionTitle}>Channel Performance Insights</Text>
            <View style={styles.channelsContainer}>
              {channels.map((channel) => (
                <TouchableOpacity
                  key={channel.id}
                  style={styles.channelCard}
                  onPress={() => handleChannelPress(channel)}
                  activeOpacity={0.7}
                >
                  <View style={styles.channelHeader}>
                    <View
                      style={[
                        styles.channelLogo,
                        { backgroundColor: channel.logoColor },
                      ]}
                    >
                      <Text style={styles.channelLogoText}>{channel.logo}</Text>
                    </View>
                    <View style={styles.channelInfo}>
                      <Text style={styles.channelName}>{channel.name}</Text>
                      {channel.isBenchmark && (
                        <View style={styles.benchmarkBadge}>
                          <Text style={styles.benchmarkText}>Benchmark</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text style={styles.parityScore}>{channel.parityScore}%</Text>

                  <View style={styles.winMeetLossContainer}>
                    {renderWinMeetLossBar(channel.win, channel.meet, channel.loss)}
                  </View>

                  <View style={styles.violationsContainer}>
                    <View style={styles.violationRow}>
                      <Text style={styles.violationLabel}>Violations</Text>
                      <Text style={styles.violationValue}>{channel.violations}%</Text>
                    </View>
                    <View style={styles.violationRow}>
                      <Text style={styles.violationLabel}>Rate Violations</Text>
                      <Text style={styles.violationValue}>{channel.rateViolations}%</Text>
                    </View>
                    <View style={styles.violationRow}>
                      <Text style={styles.violationLabel}>Availability Violations</Text>
                      <Text style={styles.violationValue}>{channel.availabilityViolations}%</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Daily Parity Calendar */}
          <View style={styles.dailySection}>
            <Text style={styles.sectionTitle}>Parity Calendar View</Text>
            <View style={styles.dailyCardsContainer}>
              {dailyParityData.map((day, index) => {
                const aggregated = getAggregatedWinMeetLoss(day);
                const averageParityScore = getAverageParityScore(day);
                const affectedChannels = getAffectedChannels(day);
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.dailyCard}
                    onPress={() => handleDatePress(day)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.dailyCardHeader}>
                      <View style={styles.dailyDateContainer}>
                        <Text style={styles.dailyDate}>{day.date}</Text>
                        <Text style={styles.dailyDay}>{day.day}</Text>
                      </View>
                      <Text style={styles.dailyParityScore}>{averageParityScore}%</Text>
                    </View>

                    <View style={styles.dailyAggregatedBar}>
                      {renderWinMeetLossBar(aggregated.win, aggregated.meet, aggregated.loss, true)}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendSquare, { backgroundColor: '#f97316' }]} />
              <Text style={styles.legendText}>Win</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSquare, { backgroundColor: '#10b981' }]} />
              <Text style={styles.legendText}>Meet</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSquare, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>Loss</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendSquare,
                  { backgroundColor: '#ef4444', borderRadius: 7 },
                ]}
              >
                <Text style={{ color: '#ffffff', fontSize: 8, fontWeight: 'bold' }}>A</Text>
              </View>
              <Text style={styles.legendText}>Availability Violation</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendSquare,
                  { backgroundColor: '#ef4444', borderRadius: 7 },
                ]}
              >
                <Text style={{ color: '#ffffff', fontSize: 8, fontWeight: 'bold' }}>R</Text>
              </View>
              <Text style={styles.legendText}>Rate Violation</Text>
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
        title={selectedChannel?.name || selectedDate?.date || 'Parity Details'}
        height={isLargeScreen ? 500 : 400}
      >
        <View style={{ padding: 20 }}>
          {selectedChannel && (
            <>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
                {selectedChannel.name}
              </Text>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                  Parity Score
                </Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
                  {selectedChannel.parityScore}%
                </Text>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                  Win/Meet/Loss
                </Text>
                <Text style={{ fontSize: 16, color: '#1f2937' }}>
                  Win: {selectedChannel.win}% | Meet: {selectedChannel.meet}% | Loss:{' '}
                  {selectedChannel.loss}%
                </Text>
              </View>
            </>
          )}
          {selectedDate && (
            <>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
                {selectedDate.date} - {selectedDate.day}
              </Text>
              <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
                  Overall Parity Score
                </Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2563eb', marginBottom: 12 }}>
                  {getAverageParityScore(selectedDate)}%
                </Text>
                {(() => {
                  const aggregated = getAggregatedWinMeetLoss(selectedDate);
                  return (
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
                        Win/Meet/Loss (Aggregated)
                      </Text>
                      {renderWinMeetLossBar(aggregated.win, aggregated.meet, aggregated.loss)}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 }}>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>
                          Win: {aggregated.win}%
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>
                          Meet: {aggregated.meet}%
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>
                          Loss: {aggregated.loss}%
                        </Text>
                      </View>
                    </View>
                  );
                })()}
              </View>
              {selectedDate.channels.map((ch, idx) => (
                <View key={idx} style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        backgroundColor: getChannelLogoColor(ch.channel),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 8,
                      }}
                    >
                      <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>
                        {ch.channel.charAt(0)}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '600', flex: 1 }}>
                      {ch.channel}
                    </Text>
                    {/* Show violations inline with channel name */}
                    {(ch.rateViolations > 0 || ch.availabilityViolations > 0) && (
                      <View style={{ flexDirection: 'row', gap: 4 }}>
                        {ch.rateViolations > 0 && (
                          <View
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 12,
                              backgroundColor: '#ef4444',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ color: '#ffffff', fontSize: 11, fontWeight: 'bold' }}>
                              R
                            </Text>
                          </View>
                        )}
                        {ch.availabilityViolations > 0 && (
                          <View
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 12,
                              backgroundColor: '#ef4444',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ color: '#ffffff', fontSize: 11, fontWeight: 'bold' }}>
                              A
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                  
                  {/* Subscriber Property Rate on this OTA */}
                  {ch.status === 'sold-out' ? (
                    <View style={{ marginBottom: 12 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Icon name="block" size={16} color="#f59e0b" />
                        <Text style={{ fontSize: 14, color: '#f59e0b', marginLeft: 6, fontWeight: '600' }}>
                          Sold Out
                        </Text>
                      </View>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>
                        Subscriber Property Rate: Not Available
                      </Text>
                    </View>
                  ) : (
                    <View style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
                        Subscriber Property Rate
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>
                          ${ch.rate}
                        </Text>
                    </View>
                  )}
                  
                  {/* Win/Meet/Loss Bar */}
                  <View style={{ marginBottom: 8 }}>
                    {renderWinMeetLossBar(ch.win, ch.meet, ch.loss, true)}
                  </View>
                  
                  {/* Violation Details */}
                  {(ch.rateViolations > 0 || ch.availabilityViolations > 0) && (
                    <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#f3f4f6' }}>
                      <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>
                        Violations:
                      </Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {ch.rateViolations > 0 && (
                          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef2f2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                            <View
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: 9,
                                backgroundColor: '#ef4444',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 6,
                              }}
                            >
                              <Text style={{ color: '#ffffff', fontSize: 9, fontWeight: 'bold' }}>
                                R
                              </Text>
                            </View>
                            <Text style={{ fontSize: 12, color: '#ef4444', fontWeight: '600' }}>
                              Rate Violation
                            </Text>
                          </View>
                        )}
                        {ch.availabilityViolations > 0 && (
                          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef2f2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                            <View
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: 9,
                                backgroundColor: '#ef4444',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 6,
                              }}
                            >
                              <Text style={{ color: '#ffffff', fontSize: 9, fontWeight: 'bold' }}>
                                A
                              </Text>
                            </View>
                            <Text style={{ fontSize: 12, color: '#ef4444', fontWeight: '600' }}>
                              Availability Violation
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
        </View>
      </BottomSheet>

      <LensChatbot
        visible={lensVisible}
        onClose={() => setLensVisible(false)}
        propertyName="City Hotel Gotland"
      />
    </View>
  );
};

export default ParityMonitorScreen;
