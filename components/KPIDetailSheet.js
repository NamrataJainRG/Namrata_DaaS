import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import BottomSheet from './BottomSheet';

const KPIDetailSheet = ({ visible, onClose, kpi }) => {
  if (!kpi) return null;

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={kpi.title}
      height={400}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.valueSection}>
            <Text style={styles.valueLabel}>Current Value</Text>
            <Text style={styles.value}>{kpi.value}</Text>
            {kpi.change && (
              <View style={styles.changeSection}>
                <Icon
                  name={kpi.changeType === 'up' ? 'arrow-upward' : 'arrow-downward'}
                  size={16}
                  color={kpi.changeType === 'up' ? '#10b981' : '#ef4444'}
                />
                <Text
                  style={[
                    styles.changeText,
                    { color: kpi.changeType === 'up' ? '#10b981' : '#ef4444' },
                  ]}
                >
                  {kpi.change} {kpi.vs}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.actionsSection}>
            <Text style={styles.actionsTitle}>Quick Actions</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="trending-up" size={20} color="#2563eb" />
              <Text style={styles.actionText}>Adjust Prices</Text>
              <Icon name="chevron-right" size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="compare-arrows" size={20} color="#2563eb" />
              <Text style={styles.actionText}>Compare Competitors</Text>
              <Icon name="chevron-right" size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="notifications" size={20} color="#2563eb" />
              <Text style={styles.actionText}>Create Alert</Text>
              <Icon name="chevron-right" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.contextSection}>
            <Text style={styles.contextTitle}>Context</Text>
            <Text style={styles.contextText}>
              {kpi.title} shows {kpi.change || 'no change'} compared to {kpi.vs || 'previous period'}.
              This metric helps track overall performance and market positioning.
            </Text>
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
  valueSection: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  valueLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  changeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  actionsSection: {
    marginBottom: 24,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 8,
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    marginLeft: 12,
    fontWeight: '500',
  },
  contextSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  contextTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  contextText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});

export default KPIDetailSheet;
