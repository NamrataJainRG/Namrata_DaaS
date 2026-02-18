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

const EventsBookmarkModal = ({ visible, onClose, events, onToggleBookmark }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All Categories');

  const categories = ['All Categories', 'Conferences', 'Trade Shows', 'Workshop', 'Social', 'Holidays'];
  const eventTypes = ['All Events', 'Bookmarked', 'Not Bookmarked'];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === 'All Categories' || event.category === selectedCategoryFilter;
    const matchesType =
      selectedCategory === 'All Events' ||
      (selectedCategory === 'Bookmarked' && event.bookmarked) ||
      (selectedCategory === 'Not Bookmarked' && !event.bookmarked);
    return matchesSearch && matchesCategory && matchesType;
  });

  const bookmarkedCount = events.filter((e) => e.bookmarked).length;

  const getCategoryIcon = (category) => {
    const icons = {
      'Conferences': 'business-center',
      'Trade Shows': 'store',
      'Workshop': 'school',
      'Social': 'celebration',
      'Holidays': 'star',
      'All Categories': 'category',
    };
    return icons[category] || 'event';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Conferences': '#2563eb',
      'Trade Shows': '#7c3aed',
      'Workshop': '#10b981',
      'Social': '#ec4899',
      'Holidays': '#f59e0b',
      'All Categories': '#6b7280',
    };
    return colors[category] || '#6b7280';
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
                <Icon name="bookmark" size={24} color="#10b981" />
                <Text style={styles.headerTitle}>Bookmark Events</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon name="close" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>

            {/* Search and Filters */}
            <View style={styles.searchSection}>
              <View style={styles.searchBar}>
                <Icon name="search" size={20} color="#6b7280" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search events to bookmark..."
                  placeholderTextColor="#9ca3af"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>

              <View style={styles.filtersRow}>
                <TouchableOpacity
                  style={styles.filterDropdown}
                  onPress={() => {
                    // Toggle category dropdown - simplified for now
                    setSelectedCategoryFilter(
                      selectedCategoryFilter === 'All Categories'
                        ? 'Conferences'
                        : selectedCategoryFilter === 'Conferences'
                        ? 'Trade Shows'
                        : selectedCategoryFilter === 'Trade Shows'
                        ? 'Workshop'
                        : selectedCategoryFilter === 'Workshop'
                        ? 'Social'
                        : selectedCategoryFilter === 'Social'
                        ? 'Holidays'
                        : 'All Categories'
                    );
                  }}
                >
                  <Icon
                    name={getCategoryIcon(selectedCategoryFilter)}
                    size={18}
                    color={getCategoryColor(selectedCategoryFilter)}
                  />
                  <Text style={styles.filterDropdownText}>{selectedCategoryFilter}</Text>
                  <Icon name="arrow-drop-down" size={20} color="#6b7280" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.filterDropdown}
                  onPress={() => {
                    setSelectedCategory(
                      selectedCategory === 'All Events'
                        ? 'Bookmarked'
                        : selectedCategory === 'Bookmarked'
                        ? 'Not Bookmarked'
                        : 'All Events'
                    );
                  }}
                >
                  <Icon name="star" size={18} color="#f59e0b" />
                  <Text style={styles.filterDropdownText}>{selectedCategory}</Text>
                  <Icon name="arrow-drop-down" size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Events List */}
            <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
              {filteredEvents.map((event) => (
                <View key={event.id} style={styles.eventItem}>
                  <View
                    style={[
                      styles.eventIcon,
                      { backgroundColor: getCategoryColor(event.category) + '20' },
                    ]}
                  >
                    <Icon
                      name={getCategoryIcon(event.category)}
                      size={20}
                      color={getCategoryColor(event.category)}
                    />
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventName}>{event.name}</Text>
                    <Text style={styles.eventDate}>
                      {event.date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: '2-digit',
                      })}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.bookmarkButton,
                      event.bookmarked && styles.bookmarkButtonActive,
                    ]}
                    onPress={() => onToggleBookmark(event.id)}
                  >
                    <Text
                      style={[
                        styles.bookmarkButtonText,
                        event.bookmarked && styles.bookmarkButtonTextActive,
                      ]}
                    >
                      {event.bookmarked ? 'Bookmarked' : 'Bookmark'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {bookmarkedCount} events bookmarked
              </Text>
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
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: isLargeScreen ? '90%' : '85%',
    width: '100%',
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
  searchSection: {
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 16 : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 14 : 12,
    marginBottom: isLargeScreen ? 16 : 12,
  },
  searchInput: {
    flex: 1,
    fontSize: isLargeScreen ? 15 : 14,
    color: '#1f2937',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: isLargeScreen ? 12 : 8,
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: isLargeScreen ? 14 : 12,
    paddingVertical: isLargeScreen ? 12 : 10,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterDropdownText: {
    flex: 1,
    fontSize: isLargeScreen ? 14 : 12,
    color: '#1f2937',
    fontWeight: '500',
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: isLargeScreen ? 24 : 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isLargeScreen ? 16 : 12,
    paddingVertical: isLargeScreen ? 16 : 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  eventIcon: {
    width: isLargeScreen ? 40 : 36,
    height: isLargeScreen ? 40 : 36,
    borderRadius: isLargeScreen ? 20 : 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: isLargeScreen ? 13 : 12,
    color: '#6b7280',
  },
  bookmarkButton: {
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 10 : 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  bookmarkButtonActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  bookmarkButtonText: {
    fontSize: isLargeScreen ? 14 : 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  bookmarkButtonTextActive: {
    color: '#ffffff',
  },
  footer: {
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 16 : 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  footerText: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});

export default EventsBookmarkModal;
