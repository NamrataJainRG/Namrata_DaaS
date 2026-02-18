import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const AddEventModal = ({ visible, onClose, onSave }) => {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [city, setCity] = useState('Ibiza');
  const [category, setCategory] = useState('Conferences');
  const [description, setDescription] = useState('');

  const countries = ['United Kingdom', 'Spain', 'France', 'Germany', 'Italy'];
  const cities = ['Ibiza', 'London', 'Paris', 'Berlin', 'Rome'];
  const categories = ['Conferences', 'Trade Shows', 'Workshop', 'Social', 'Holidays'];

  const getCategoryIcon = (cat) => {
    const icons = {
      'Conferences': 'business-center',
      'Trade Shows': 'store',
      'Workshop': 'school',
      'Social': 'celebration',
      'Holidays': 'star',
    };
    return icons[cat] || 'event';
  };

  const getCategoryColor = (cat) => {
    const colors = {
      'Conferences': '#2563eb',
      'Trade Shows': '#7c3aed',
      'Workshop': '#10b981',
      'Social': '#ec4899',
      'Holidays': '#f59e0b',
    };
    return colors[cat] || '#6b7280';
  };

  const handleSave = () => {
    if (!eventName.trim() || !startDate.trim() || !endDate.trim() || !category) {
      return;
    }

    // Parse dates
    const start = new Date(startDate.split('/').reverse().join('-'));
    const end = new Date(endDate.split('/').reverse().join('-'));

    onSave({
      name: eventName,
      date: start,
      endDate: end,
      country,
      city,
      category,
      description,
    });

    // Reset form
    setEventName('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Icon name="star" size={24} color="#2563eb" />
                <Text style={styles.headerTitle}>Create New Event</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon name="close" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                {/* Two Column Layout */}
                <View style={styles.formRow}>
                  {/* Left Column */}
                  <View style={styles.formColumn}>
                    {/* Event Name */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>
                        Event Name <Text style={styles.required}>*</Text>
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter event name"
                        placeholderTextColor="#9ca3af"
                        value={eventName}
                        onChangeText={setEventName}
                        maxLength={35}
                      />
                      <Text style={styles.charCount}>{eventName.length}/35</Text>
                    </View>

                    {/* Start Date */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>
                        Start Date <Text style={styles.required}>*</Text>
                      </Text>
                      <View style={styles.dateInput}>
                        <Icon name="calendar-today" size={18} color="#6b7280" />
                        <TextInput
                          style={styles.dateInputText}
                          placeholder="dd/mm/yyyy"
                          placeholderTextColor="#9ca3af"
                          value={startDate}
                          onChangeText={setStartDate}
                        />
                      </View>
                    </View>

                    {/* Country */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Country</Text>
                      <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>{country}</Text>
                        <Icon name="arrow-drop-down" size={20} color="#6b7280" />
                      </TouchableOpacity>
                    </View>

                    {/* Description */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Description</Text>
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Describe the event..."
                        placeholderTextColor="#9ca3af"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                        maxLength={250}
                      />
                      <Text style={styles.charCount}>
                        {description.length}/250 characters
                      </Text>
                    </View>
                  </View>

                  {/* Right Column */}
                  <View style={styles.formColumn}>
                    {/* Category */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>
                        Category <Text style={styles.required}>*</Text>
                      </Text>
                      <TouchableOpacity style={styles.dropdown}>
                        <Icon
                          name={getCategoryIcon(category)}
                          size={18}
                          color={getCategoryColor(category)}
                        />
                        <Text style={styles.dropdownText}>{category}</Text>
                        <Icon name="arrow-drop-down" size={20} color="#6b7280" />
                      </TouchableOpacity>
                    </View>

                    {/* End Date */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>
                        End Date <Text style={styles.required}>*</Text>
                      </Text>
                      <View style={styles.dateInput}>
                        <Icon name="calendar-today" size={18} color="#6b7280" />
                        <TextInput
                          style={styles.dateInputText}
                          placeholder="dd/mm/yyyy"
                          placeholderTextColor="#9ca3af"
                          value={endDate}
                          onChangeText={setEndDate}
                        />
                      </View>
                    </View>

                    {/* City */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>City</Text>
                      <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>{city}</Text>
                        <Icon name="arrow-drop-down" size={20} color="#6b7280" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: isLargeScreen ? '80%' : '95%',
    maxWidth: 900,
    maxHeight: isLargeScreen ? '90%' : '85%',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 20 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: isLargeScreen ? 22 : 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: isLargeScreen ? 24 : 16,
  },
  formRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: isLargeScreen ? 24 : 16,
  },
  formColumn: {
    flex: 1,
  },
  formGroup: {
    marginBottom: isLargeScreen ? 20 : 16,
  },
  label: {
    fontSize: isLargeScreen ? 14 : 13,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: isLargeScreen ? 8 : 6,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 12 : 10,
    fontSize: isLargeScreen ? 15 : 14,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: isLargeScreen ? 12 : 11,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'right',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 12 : 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateInputText: {
    flex: 1,
    fontSize: isLargeScreen ? 15 : 14,
    color: '#1f2937',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 12 : 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dropdownText: {
    flex: 1,
    fontSize: isLargeScreen ? 15 : 14,
    color: '#1f2937',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 20 : 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  cancelButton: {
    paddingHorizontal: isLargeScreen ? 24 : 20,
    paddingVertical: isLargeScreen ? 12 : 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  cancelButtonText: {
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  saveButton: {
    paddingHorizontal: isLargeScreen ? 24 : 20,
    paddingVertical: isLargeScreen ? 12 : 10,
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  saveButtonText: {
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default AddEventModal;
