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
import EventsBookmarkModal from '../components/EventsBookmarkModal';
import AddEventModal from '../components/AddEventModal';
import LensChatbot from '../components/LensChatbot';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const EventsCalendarScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [bookmarkModalVisible, setBookmarkModalVisible] = useState(false);
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);
  const [eventDetailVisible, setEventDetailVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [lensVisible, setLensVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filters, setFilters] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    country: 'United Kingdom',
    cities: [],
    categories: ['All'],
  });

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tu B'Shevat (Arbor Day)",
      date: new Date(2026, 1, 2),
      endDate: new Date(2026, 1, 2),
      city: 'London',
      country: 'United Kingdom',
      category: 'Holidays',
      description: 'Jewish holiday celebrating trees',
      bookmarked: true,
    },
    {
      id: 2,
      name: 'Navigator Dev Team',
      date: new Date(2026, 1, 2),
      endDate: new Date(2026, 1, 2),
      city: 'London',
      country: 'United Kingdom',
      category: 'Conferences',
      description: 'Development team meeting',
      bookmarked: true,
    },
    {
      id: 3,
      name: 'Carnival / Shrove Tuesday / Pancake Day',
      date: new Date(2026, 1, 17),
      endDate: new Date(2026, 1, 17),
      city: 'Ibiza',
      country: 'United Kingdom',
      category: 'Holidays',
      description: 'Traditional celebration',
      bookmarked: true,
    },
    {
      id: 4,
      name: 'Lunar New Year',
      date: new Date(2026, 1, 17),
      endDate: new Date(2026, 1, 17),
      city: 'London',
      country: 'United Kingdom',
      category: 'Holidays',
      description: 'Lunar New Year celebration',
      bookmarked: true,
    },
    {
      id: 5,
      name: 'Carnival / Ash Wednesday',
      date: new Date(2026, 1, 18),
      endDate: new Date(2026, 1, 18),
      city: 'Ibiza',
      country: 'United Kingdom',
      category: 'Holidays',
      description: 'Ash Wednesday celebration',
      bookmarked: true,
    },
    {
      id: 6,
      name: 'Ramadan Start (Tentative Date)',
      date: new Date(2026, 1, 18),
      endDate: new Date(2026, 1, 18),
      city: 'London',
      country: 'United Kingdom',
      category: 'Holidays',
      description: 'Start of Ramadan',
      bookmarked: true,
    },
  ]);

  const toggleBookmark = (eventId) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, bookmarked: !event.bookmarked } : event
      )
    );
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setSelectedEvents([event]);
    setSelectedDate(null);
    setEventDetailVisible(true);
  };

  const handleDatePress = (day) => {
    const dayEvents = getEventsForDate(day);
    if (dayEvents.length > 0) {
      setSelectedEvents(dayEvents);
      setSelectedEvent(dayEvents[0]);
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      setSelectedDate(date);
      setEventDetailVisible(true);
    }
  };

  const handleAddEvent = (newEvent) => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      bookmarked: false,
    };
    setEvents([...events, event]);
    setAddEventModalVisible(false);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Conferences': 'business-center',
      'Trade Shows': 'store',
      'Workshop': 'school',
      'Social': 'celebration',
      'Holidays': 'star',
      'All': 'category',
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
      'All': '#6b7280',
    };
    return colors[category] || '#6b7280';
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendarView = () => {
    const days = getDaysInMonth(currentMonth);
    const monthName = monthNames[currentMonth.getMonth()];
    const year = currentMonth.getFullYear();

    return (
      <View style={styles.calendarContainer}>
        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity
            onPress={() => navigateMonth(-1)}
            style={styles.monthNavButton}
          >
            <Icon name="chevron-left" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.monthYearText}>
            {monthName} {year}
          </Text>
          <TouchableOpacity
            onPress={() => navigateMonth(1)}
            style={styles.monthNavButton}
          >
            <Icon name="chevron-right" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {/* Day Headers */}
          {dayNames.map((day) => (
            <View key={day} style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{day}</Text>
            </View>
          ))}

          {/* Calendar Days */}
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const hasBookmarked = dayEvents.some((e) => e.bookmarked);
            const hasHoliday = dayEvents.some((e) => e.category === 'Holidays');

            return (
              <TouchableOpacity
                key={index}
                style={[styles.calendarDay, !day && styles.calendarDayEmpty]}
                onPress={() => day && dayEvents.length > 0 && handleDatePress(day)}
                disabled={!day || dayEvents.length === 0}
              >
                {day && (
                  <>
                    <Text style={styles.calendarDayNumber}>{day}</Text>
                    {dayEvents.length > 0 && (
                      <View style={styles.calendarDayEvents}>
                        {hasBookmarked && (
                          <View style={[styles.eventDot, { backgroundColor: '#10b981' }]} />
                        )}
                        {hasHoliday && (
                          <View style={[styles.eventDot, { backgroundColor: '#f59e0b' }]} />
                        )}
                        {dayEvents.length > 1 && (
                          <Text style={styles.moreEventsText}>+{dayEvents.length - 1}</Text>
                        )}
                      </View>
                    )}
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderListView = () => {
    // Group events by date
    const groupedEvents = {};
    events.forEach((event) => {
      const dateKey = event.date.toISOString().split('T')[0];
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    });

    const sortedDates = Object.keys(groupedEvents).sort();

    return (
      <View style={styles.listContainer}>
        {sortedDates.map((dateKey) => {
          const dateEvents = groupedEvents[dateKey];
          const date = new Date(dateKey);
          const dayName = dayNames[date.getDay()];
          const day = date.getDate();
          const month = monthNames[date.getMonth()].substring(0, 3);
          const year = date.getFullYear().toString().substring(2);

          return (
            <View key={dateKey} style={styles.dateGroup}>
              <View style={styles.dateHeader}>
                <Icon name="event" size={20} color="#2563eb" />
                <Text style={styles.dateHeaderText}>
                  {dayName}, {day} {month} {year}
                </Text>
                <Text style={styles.dateEventCount}>{dateEvents.length} events</Text>
              </View>

              {dateEvents.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => handleEventPress(event)}
                  activeOpacity={0.7}
                >
                  <View style={styles.eventCardContent}>
                    <View style={styles.eventCardLeft}>
                      <View
                        style={[
                          styles.eventCategoryIcon,
                          { backgroundColor: getCategoryColor(event.category) + '20' },
                        ]}
                      >
                        <Icon
                          name={getCategoryIcon(event.category)}
                          size={20}
                          color={getCategoryColor(event.category)}
                        />
                      </View>
                      <View style={styles.eventCardInfo}>
                        <Text style={styles.eventCardName}>{event.name}</Text>
                        <View style={styles.eventCardMeta}>
                          <Text style={styles.eventCardDate}>
                            {event.date.toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: '2-digit',
                            })}
                          </Text>
                          <Text style={styles.eventCardSeparator}>•</Text>
                          <Text style={styles.eventCardCity}>{event.city}</Text>
                          <Text style={styles.eventCardSeparator}>•</Text>
                          <Text style={styles.eventCardCategory}>{event.category}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.eventCardActions}>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          toggleBookmark(event.id);
                        }}
                        style={styles.bookmarkButton}
                      >
                        <Icon
                          name={event.bookmarked ? 'bookmark' : 'bookmark-border'}
                          size={20}
                          color={event.bookmarked ? '#10b981' : '#6b7280'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.openDrawer()}
            style={styles.headerButton}
          >
            <Icon name="menu" size={isLargeScreen ? 28 : 24} color="#1f2937" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Events Calendar</Text>
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
          </View>
        </View>

        {/* Filters and Actions Bar */}
        <View style={styles.filtersBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
            contentContainerStyle={styles.filtersScrollContent}
          >
            <TouchableOpacity
              style={styles.filterChip}
              onPress={() => setFilterModalVisible(true)}
            >
              <Icon name="calendar-today" size={16} color="#1f2937" />
              <Text style={styles.filterChipText}>
                {monthNames[filters.month].substring(0, 3)} {filters.year}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterChip}
              onPress={() => setFilterModalVisible(true)}
            >
              <Icon name="public" size={16} color="#1f2937" />
              <Text style={styles.filterChipText}>{filters.country}</Text>
            </TouchableOpacity>
            {filters.cities.length > 0 && (
              <TouchableOpacity
                style={styles.filterChip}
                onPress={() => setFilterModalVisible(true)}
              >
                <Icon name="location-on" size={16} color="#1f2937" />
                <Text style={styles.filterChipText}>
                  {filters.cities.length} cities
                </Text>
              </TouchableOpacity>
            )}
            {filters.categories.length > 0 && filters.categories[0] !== 'All' && (
              <TouchableOpacity
                style={styles.filterChip}
                onPress={() => setFilterModalVisible(true)}
              >
                <Icon name="category" size={16} color="#1f2937" />
                <Text style={styles.filterChipText}>
                  {filters.categories.length} categories
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          <View style={styles.filtersRight}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setBookmarkModalVisible(true)}
            >
              <Icon name="bookmark" size={18} color="#10b981" />
              {isLargeScreen && <Text style={styles.actionButtonText}>Bookmark</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPrimary]}
              onPress={() => setAddEventModalVisible(true)}
            >
              <Icon name="add" size={18} color="#ffffff" />
              {isLargeScreen && <Text style={[styles.actionButtonText, styles.actionButtonTextPrimary]}>
                Add
              </Text>}
            </TouchableOpacity>
          </View>
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewToggleButton, viewMode === 'calendar' && styles.viewToggleButtonActive]}
            onPress={() => setViewMode('calendar')}
          >
            <Icon
              name="calendar-today"
              size={18}
              color={viewMode === 'calendar' ? '#2563eb' : '#6b7280'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggleButton, viewMode === 'list' && styles.viewToggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Icon
              name="list"
              size={18}
              color={viewMode === 'list' ? '#2563eb' : '#6b7280'}
            />
          </TouchableOpacity>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
            <Text style={styles.legendText}>Bookmarked</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.legendText}>Holidays</Text>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {viewMode === 'calendar' ? renderCalendarView() : renderListView()}
        </ScrollView>
      </SafeAreaView>

      {/* Modals and Sheets */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setFilterModalVisible(false);
        }}
        filterType="events"
        initialFilters={filters}
      />

      <BottomSheet
        visible={eventDetailVisible}
        onClose={() => {
          setEventDetailVisible(false);
          setSelectedEvents([]);
          setSelectedDate(null);
        }}
        title={
          selectedEvents.length > 1
            ? `${selectedDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} - ${selectedEvents.length} Events`
            : selectedEvent?.name || 'Event Details'
        }
        height={isLargeScreen ? 600 : Math.min(600, height * 0.85)}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20 }}>
            {selectedEvents.length > 1 ? (
              // Multiple events view
              <>
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
                  {selectedEvents.length} events on this date
                </Text>
                {selectedEvents.map((event, index) => (
                  <TouchableOpacity
                    key={event.id}
                    style={{
                      backgroundColor: '#f9fafb',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: '#e5e7eb',
                    }}
                    onPress={() => {
                      setSelectedEvent(event);
                      setSelectedEvents([event]);
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: getCategoryColor(event.category) + '20',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Icon
                          name={getCategoryIcon(event.category)}
                          size={20}
                          color={getCategoryColor(event.category)}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 }}>
                          {event.name}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <Text style={{ fontSize: 13, color: '#6b7280' }}>
                            {event.city}, {event.country}
                          </Text>
                          <Text style={{ fontSize: 13, color: '#d1d5db' }}>•</Text>
                          <Text style={{ fontSize: 13, color: '#6b7280' }}>
                            {event.category}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          toggleBookmark(event.id);
                        }}
                        style={{ padding: 4 }}
                      >
                        <Icon
                          name={event.bookmarked ? 'bookmark' : 'bookmark-border'}
                          size={20}
                          color={event.bookmarked ? '#10b981' : '#6b7280'}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ) : selectedEvent ? (
              // Single event view
              <>
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                    Date
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>
                    {selectedEvent.date.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                </View>

                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                    Location
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>
                    {selectedEvent.city}, {selectedEvent.country}
                  </Text>
                </View>

                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                    Category
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: getCategoryColor(selectedEvent.category) + '20',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Icon
                        name={getCategoryIcon(selectedEvent.category)}
                        size={18}
                        color={getCategoryColor(selectedEvent.category)}
                      />
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>
                      {selectedEvent.category}
                    </Text>
                  </View>
                </View>

                {selectedEvent.description && (
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      Description
                    </Text>
                    <Text style={{ fontSize: 16, color: '#1f2937', lineHeight: 24 }}>
                      {selectedEvent.description}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                    backgroundColor: selectedEvent.bookmarked ? '#10b981' : '#f3f4f6',
                    borderRadius: 12,
                    marginTop: 8,
                  }}
                  onPress={() => {
                    toggleBookmark(selectedEvent.id);
                  }}
                >
                  <Icon
                    name={selectedEvent.bookmarked ? 'bookmark' : 'bookmark-border'}
                    size={20}
                    color={selectedEvent.bookmarked ? '#ffffff' : '#6b7280'}
                  />
                  <Text
                    style={{
                      marginLeft: 8,
                      fontSize: 16,
                      fontWeight: '600',
                      color: selectedEvent.bookmarked ? '#ffffff' : '#6b7280',
                    }}
                  >
                    {selectedEvent.bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </ScrollView>
      </BottomSheet>

      <EventsBookmarkModal
        visible={bookmarkModalVisible}
        onClose={() => setBookmarkModalVisible(false)}
        events={events}
        onToggleBookmark={toggleBookmark}
      />

      <AddEventModal
        visible={addEventModalVisible}
        onClose={() => setAddEventModalVisible(false)}
        onSave={handleAddEvent}
      />

      <LensChatbot
        visible={lensVisible}
        onClose={() => setLensVisible(false)}
        propertyName="City Hotel Gotland"
      />
    </View>
  );
};

const getResponsiveStyles = (isLargeScreen) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 16 : 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: isLargeScreen ? 22 : 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isLargeScreen ? 12 : 8,
  },
  filtersBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 16 : 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: isLargeScreen ? 16 : 12,
  },
  filtersScroll: {
    flex: 1,
  },
  filtersScrollContent: {
    flexDirection: 'row',
    gap: isLargeScreen ? 12 : 8,
    paddingRight: isLargeScreen ? 0 : 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: isLargeScreen ? 14 : 12,
    paddingVertical: isLargeScreen ? 8 : 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterChipText: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#1f2937',
    fontWeight: '500',
  },
  filtersRight: {
    flexDirection: 'row',
    gap: isLargeScreen ? 12 : 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 10 : 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  actionButtonPrimary: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  actionButtonText: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#10b981',
    fontWeight: '600',
  },
  actionButtonTextPrimary: {
    color: '#ffffff',
  },
  viewToggle: {
    flexDirection: 'row',
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 12 : 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 8,
  },
  viewToggleButton: {
    padding: isLargeScreen ? 10 : 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  viewToggleButtonActive: {
    backgroundColor: '#dbeafe',
  },
  legend: {
    flexDirection: 'row',
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 12 : 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: isLargeScreen ? 24 : 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: isLargeScreen ? 24 : 16,
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: isLargeScreen ? 24 : 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isLargeScreen ? 24 : 20,
  },
  monthNavButton: {
    padding: 8,
  },
  monthYearText: {
    fontSize: isLargeScreen ? 20 : 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayHeader: {
    width: `${100 / 7}%`,
    paddingVertical: isLargeScreen ? 12 : 10,
    alignItems: 'center',
  },
  dayHeaderText: {
    fontSize: isLargeScreen ? 14 : 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  calendarDay: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: isLargeScreen ? 8 : 6,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  calendarDayEmpty: {
    borderColor: 'transparent',
  },
  calendarDayNumber: {
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  calendarDayEvents: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  moreEventsText: {
    fontSize: isLargeScreen ? 10 : 9,
    color: '#6b7280',
    fontWeight: '500',
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  dateGroup: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: isLargeScreen ? 20 : 16,
    paddingVertical: isLargeScreen ? 14 : 12,
    backgroundColor: '#eff6ff',
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
  },
  dateHeaderText: {
    flex: 1,
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  dateEventCount: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
  },
  eventCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  eventCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 20 : 16,
    paddingVertical: isLargeScreen ? 16 : 14,
  },
  eventCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isLargeScreen ? 16 : 12,
    flex: 1,
  },
  eventCategoryIcon: {
    width: isLargeScreen ? 40 : 36,
    height: isLargeScreen ? 40 : 36,
    borderRadius: isLargeScreen ? 20 : 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCardInfo: {
    flex: 1,
  },
  eventCardName: {
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  eventCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  eventCardDate: {
    fontSize: isLargeScreen ? 13 : 12,
    color: '#6b7280',
  },
  eventCardSeparator: {
    fontSize: isLargeScreen ? 13 : 12,
    color: '#d1d5db',
  },
  eventCardCity: {
    fontSize: isLargeScreen ? 13 : 12,
    color: '#6b7280',
  },
  eventCardCategory: {
    fontSize: isLargeScreen ? 13 : 12,
    color: '#6b7280',
  },
  eventCardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  bookmarkButton: {
    padding: 8,
  },
});

const styles = getResponsiveStyles(isLargeScreen);

export default EventsCalendarScreen;
