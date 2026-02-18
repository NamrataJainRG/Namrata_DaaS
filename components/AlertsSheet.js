import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import BottomSheet from './BottomSheet';

const AlertsSheet = ({ visible, onClose, alerts }) => {
  const alertsData = alerts || [
    {
      id: 1,
      date: '09 Feb',
      isNew: true,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 2,
      date: '10 Feb',
      isNew: true,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 3,
      date: '11 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 4,
      date: '12 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 5,
      date: '14 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 6,
      date: '15 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 7,
      date: '16 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 8,
      date: '17 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 9,
      date: '18 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 10,
      date: '19 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 11,
      date: '20 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 12,
      date: '21 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
    {
      id: 13,
      date: '22 Feb',
      isNew: false,
      message: "My Subscriber Hotel's rate has increased by $1 ADR",
    },
  ];

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Alerts"
      height={600}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={20} color="#4b5563" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {alertsData.map((alert) => (
          <View key={alert.id} style={styles.alertItem}>
            <View style={styles.alertContent}>
              <View style={styles.alertHeader}>
                <View style={styles.bullet} />
                <Text style={styles.alertDate}>{alert.date}</Text>
                {alert.isNew && (
                  <View style={styles.newTag}>
                    <Text style={styles.newTagText}>New</Text>
                  </View>
                )}
              </View>
              <Text style={styles.alertMessage}>{alert.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {alertsData.length === 0 && (
        <View style={styles.emptyState}>
          <Icon name="notifications-none" size={48} color="#d1d5db" />
          <Text style={styles.emptyStateText}>No alerts</Text>
          <Text style={styles.emptyStateSubtext}>
            You're all caught up! New alerts will appear here.
          </Text>
        </View>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  alertItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563eb',
  },
  alertDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  newTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2563eb',
  },
  alertMessage: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginLeft: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default AlertsSheet;
