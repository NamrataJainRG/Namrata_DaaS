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

const FilterModal = ({ visible, onClose, onApply, filterType = 'default', initialFilters = {} }) => {
  // Events filters
  const [selectedMonth, setSelectedMonth] = useState(initialFilters.month !== undefined ? initialFilters.month : new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(initialFilters.year !== undefined ? initialFilters.year : new Date().getFullYear());
  const [selectedCountry, setSelectedCountry] = useState(initialFilters.country || 'United Kingdom');
  const [selectedCities, setSelectedCities] = useState(initialFilters.cities || []);
  const [selectedCategories, setSelectedCategories] = useState(initialFilters.categories || ['All']);
  const [showMonthYearDropdown, setShowMonthYearDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCitiesDropdown, setShowCitiesDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  // Default filters
  const [dateRange, setDateRange] = useState("Next 7 Days");
  const [compareWith, setCompareWith] = useState('Yesterday');
  const [selectedChannels, setSelectedChannels] = useState(['All Channels']);
  const [compset, setCompset] = useState('Primary Compset');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showCompareWithDropdown, setShowCompareWithDropdown] = useState(false);
  const [showChannelsDropdown, setShowChannelsDropdown] = useState(false);
  const [rateType, setRateType] = useState('Lowest (LOW)');
  const [roomType, setRoomType] = useState('Any');
  const [guest, setGuest] = useState('Any');
  const [lengthOfStay, setLengthOfStay] = useState('Any');
  const [inclusions, setInclusions] = useState({
    any: true,
    allInclusive: true,
    fullBoard: true,
    roomOnly: true,
  });

  const quickPresets = [
    { label: 'Today', value: "Today" },
    { label: 'Next 7 Days', value: "Next 7 Days" },
    { label: 'Next 14 Days', value: "Next 14 Days" },
    { label: 'Next 30 Days', value: "Next 30 Days" },
  ];

  const compareWithOptions = ['Yesterday', 'Last 1 Week', 'Last 4 Week', 'Last Quarter'];
  
  const channelOptions = ['All Channels', 'Booking.com', 'Agoda', 'Expedia', 'Hotels.com', 'TripAdvisor'];

  const compsetOptions = ['Primary Compset', 'Secondary Compset'];

  // Events filter options
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const countryOptions = ['United Kingdom', 'Spain', 'France', 'Germany', 'Italy', 'Netherlands'];
  const cityOptions = ['Ibiza', 'London', 'Paris', 'Berlin', 'Rome', 'Amsterdam', 'Madrid'];
  const categoryOptions = ['All', 'Conferences', 'Trade Shows', 'Workshop', 'Social', 'Holidays'];

  const rateTypes = ['Lowest (LOW)', 'Best Available Rate (BAR)'];
  const roomTypes = ['Any', 'Deluxe Room (DLX)', 'Standard Room (STD)', 'Studio (STU)', 'Suite (STE)', 'Superior Room (SUP)'];
  const guestOptions = ['Any', '2'];
  const losOptions = ['Any', '1'];
  const inclusionOptions = [
    { key: 'any', label: 'Any' },
    { key: 'allInclusive', label: 'All Inclusive' },
    { key: 'fullBoard', label: 'Full Board' },
    { key: 'roomOnly', label: 'Room Only' },
  ];

  const handleApply = () => {
    if (filterType === 'events') {
      onApply({
        month: selectedMonth,
        year: selectedYear,
        country: selectedCountry,
        cities: selectedCities,
        categories: selectedCategories,
      });
    } else {
      onApply({
        dateRange,
        compareWith,
        channels: selectedChannels,
        compset,
        rateType,
        roomType,
        guest,
        lengthOfStay,
        inclusions,
      });
    }
    onClose();
  };

  const handleCityToggle = (city) => {
    setSelectedCities((prev) => {
      if (prev.includes(city)) {
        return prev.filter((c) => c !== city);
      } else {
        return [...prev, city];
      }
    });
  };

  const handleCategoryToggle = (category) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      setSelectedCategories((prev) => {
        const newCategories = prev.filter((c) => c !== 'All');
        if (newCategories.includes(category)) {
          const updated = newCategories.filter((c) => c !== category);
          return updated.length > 0 ? updated : ['All'];
        } else {
          return [...newCategories, category];
        }
      });
    }
  };

  const getCitiesDisplayText = () => {
    if (selectedCities.length === 0) {
      return 'Select cities';
    }
    if (selectedCities.length === 1) {
      return selectedCities[0];
    }
    return `${selectedCities.length} cities selected`;
  };

  const getCategoriesDisplayText = () => {
    if (selectedCategories.length === 0 || selectedCategories.includes('All')) {
      return 'All Categories';
    }
    if (selectedCategories.length === 1) {
      return selectedCategories[0];
    }
    return `${selectedCategories.length} categories selected`;
  };

  const handleChannelToggle = (channel) => {
    if (channel === 'All Channels') {
      setSelectedChannels(['All Channels']);
    } else {
      setSelectedChannels((prev) => {
        const newChannels = prev.filter((c) => c !== 'All Channels');
        if (newChannels.includes(channel)) {
          const updated = newChannels.filter((c) => c !== channel);
          return updated.length > 0 ? updated : ['All Channels'];
        } else {
          return [...newChannels, channel];
        }
      });
    }
  };

  const getChannelsDisplayText = () => {
    if (selectedChannels.length === 0 || selectedChannels.includes('All Channels')) {
      return 'All Channels';
    }
    if (selectedChannels.length === 1) {
      return selectedChannels[0];
    }
    return `${selectedChannels.length} channels selected`;
  };

  const toggleInclusion = (key) => {
    setInclusions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={isLargeScreen ? 28 : 24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filterType === 'events' ? (
            <>
              {/* Month/Year Filter */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Month / Year</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => {
                    setShowMonthYearDropdown(!showMonthYearDropdown);
                    setShowCountryDropdown(false);
                    setShowCitiesDropdown(false);
                    setShowCategoriesDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>
                    {monthNames[selectedMonth]} {selectedYear}
                  </Text>
                  <Icon
                    name={showMonthYearDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                    size={isLargeScreen ? 28 : 24}
                    color="#4b5563"
                  />
                </TouchableOpacity>
                {showMonthYearDropdown && (
                  <View style={styles.dropdownOptions}>
                    <View style={styles.monthYearSelector}>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.monthSelector}>
                          {monthNames.map((month, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.monthYearOption,
                                selectedMonth === index && styles.monthYearOptionActive,
                              ]}
                              onPress={() => setSelectedMonth(index)}
                            >
                              <Text
                                style={[
                                  styles.monthYearOptionText,
                                  selectedMonth === index && styles.monthYearOptionTextActive,
                                ]}
                              >
                                {month}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </ScrollView>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.yearSelector}>
                          {yearOptions.map((year) => (
                            <TouchableOpacity
                              key={year}
                              style={[
                                styles.monthYearOption,
                                selectedYear === year && styles.monthYearOptionActive,
                              ]}
                              onPress={() => setSelectedYear(year)}
                            >
                              <Text
                                style={[
                                  styles.monthYearOptionText,
                                  selectedYear === year && styles.monthYearOptionTextActive,
                                ]}
                              >
                                {year}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                )}
              </View>

              {/* Country Filter */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Country</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => {
                    setShowCountryDropdown(!showCountryDropdown);
                    setShowMonthYearDropdown(false);
                    setShowCitiesDropdown(false);
                    setShowCategoriesDropdown(false);
                  }}
                >
                  <Icon name="public" size={18} color="#4b5563" />
                  <Text style={styles.dropdownText}>{selectedCountry}</Text>
                  <Icon
                    name={showCountryDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                    size={isLargeScreen ? 28 : 24}
                    color="#4b5563"
                  />
                </TouchableOpacity>
                {showCountryDropdown && (
                  <View style={styles.dropdownOptions}>
                    {countryOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownOption,
                          selectedCountry === option && styles.dropdownOptionActive,
                        ]}
                        onPress={() => {
                          setSelectedCountry(option);
                          setShowCountryDropdown(false);
                        }}
                      >
                        <View style={styles.radioButton}>
                          {selectedCountry === option && <View style={styles.radioButtonInner} />}
                        </View>
                        <Text style={styles.dropdownOptionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Cities Filter (Multi-select) */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>City</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => {
                    setShowCitiesDropdown(!showCitiesDropdown);
                    setShowMonthYearDropdown(false);
                    setShowCountryDropdown(false);
                    setShowCategoriesDropdown(false);
                  }}
                >
                  <Icon name="location-on" size={18} color="#4b5563" />
                  <Text style={styles.dropdownText}>{getCitiesDisplayText()}</Text>
                  <Icon
                    name={showCitiesDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                    size={isLargeScreen ? 28 : 24}
                    color="#4b5563"
                  />
                </TouchableOpacity>
                {showCitiesDropdown && (
                  <View style={styles.dropdownOptions}>
                    {cityOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.checkboxOption}
                        onPress={() => handleCityToggle(option)}
                      >
                        <View style={styles.checkbox}>
                          {selectedCities.includes(option) && (
                            <Icon name="check" size={16} color="#ffffff" />
                          )}
                        </View>
                        <Text style={styles.checkboxText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Categories Filter (Multi-select) */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => {
                    setShowCategoriesDropdown(!showCategoriesDropdown);
                    setShowMonthYearDropdown(false);
                    setShowCountryDropdown(false);
                    setShowCitiesDropdown(false);
                  }}
                >
                  <Icon name="category" size={18} color="#4b5563" />
                  <Text style={styles.dropdownText}>{getCategoriesDisplayText()}</Text>
                  <Icon
                    name={showCategoriesDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                    size={isLargeScreen ? 28 : 24}
                    color="#4b5563"
                  />
                </TouchableOpacity>
                {showCategoriesDropdown && (
                  <View style={styles.dropdownOptions}>
                    {categoryOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.checkboxOption}
                        onPress={() => handleCategoryToggle(option)}
                      >
                        <View style={styles.checkbox}>
                          {selectedCategories.includes(option) && (
                            <Icon name="check" size={16} color="#ffffff" />
                          )}
                        </View>
                        <Text style={styles.checkboxText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </>
          ) : (
            <>
              {/* Date Range */}
              <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date Range</Text>
            <View style={styles.presetsContainer}>
              {quickPresets.map((preset, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.presetChip,
                    dateRange === preset.value && styles.presetChipActive,
                  ]}
                  onPress={() => setDateRange(preset.value)}
                >
                  <Text
                    style={[
                      styles.presetText,
                      dateRange === preset.value && styles.presetTextActive,
                    ]}
                  >
                    {preset.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Compare With */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compare With</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowCompareWithDropdown(!showCompareWithDropdown);
                setShowChannelsDropdown(false);
              }}
            >
              <Text style={styles.dropdownText}>{compareWith}</Text>
              <Icon
                name={showCompareWithDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                size={isLargeScreen ? 28 : 24}
                color="#4b5563"
              />
            </TouchableOpacity>
            {showCompareWithDropdown && (
              <View style={styles.dropdownOptions}>
                {compareWithOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownOption,
                      compareWith === option && styles.dropdownOptionActive,
                    ]}
                    onPress={() => {
                      setCompareWith(option);
                      setShowCompareWithDropdown(false);
                    }}
                  >
                    <View style={styles.radioButton}>
                      {compareWith === option && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text style={styles.dropdownOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Channels */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Channels</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowChannelsDropdown(!showChannelsDropdown);
                setShowCompareWithDropdown(false);
              }}
            >
              <Text style={styles.dropdownText}>{getChannelsDisplayText()}</Text>
              <Icon
                name={showChannelsDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                size={isLargeScreen ? 28 : 24}
                color="#4b5563"
              />
            </TouchableOpacity>
            {showChannelsDropdown && (
              <View style={styles.dropdownOptions}>
                {channelOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.checkboxOption}
                    onPress={() => handleChannelToggle(option)}
                  >
                    <View style={styles.checkbox}>
                      {selectedChannels.includes(option) && (
                        <Icon name="check" size={16} color="#ffffff" />
                      )}
                    </View>
                    <Text style={styles.checkboxText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Compset */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compset</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{compset}</Text>
              <Icon name="arrow-drop-down" size={isLargeScreen ? 28 : 24} color="#4b5563" />
            </TouchableOpacity>
            {compsetOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioOption}
                onPress={() => setCompset(option)}
              >
                <View style={styles.radioButton}>
                  {compset === option && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.radioText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Advanced Filters */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.advancedHeader}
              onPress={() => setShowAdvancedFilters(!showAdvancedFilters)}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionTitle}>Advanced Filters</Text>
              <Icon
                name={showAdvancedFilters ? 'expand-less' : 'expand-more'}
                size={isLargeScreen ? 28 : 24}
                color="#4b5563"
              />
            </TouchableOpacity>
            <Text style={styles.advancedSubtitle}>Room Type, LOS, Guest Count</Text>

            {showAdvancedFilters && (
              <View style={styles.advancedContent}>
                {/* Rate Types */}
                <View style={styles.filterGroup}>
                  <Text style={styles.filterGroupTitle}>Rate Types</Text>
                  {rateTypes.map((type, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.radioOption}
                      onPress={() => setRateType(type)}
                    >
                      <View style={styles.radioButton}>
                        {rateType === type && <View style={styles.radioButtonInner} />}
                      </View>
                      <Text style={styles.radioText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Room Types */}
                <View style={styles.filterGroup}>
                  <Text style={styles.filterGroupTitle}>Room Types</Text>
                  {roomTypes.map((type, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.radioOption}
                      onPress={() => setRoomType(type)}
                    >
                      <View style={styles.radioButton}>
                        {roomType === type && <View style={styles.radioButtonInner} />}
                      </View>
                      <Text style={styles.radioText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Guest */}
                <View style={styles.filterGroup}>
                  <Text style={styles.filterGroupTitle}>Guest</Text>
                  {guestOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.radioOption}
                      onPress={() => setGuest(option)}
                    >
                      <View style={styles.radioButton}>
                        {guest === option && <View style={styles.radioButtonInner} />}
                      </View>
                      <Text style={styles.radioText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Length of Stay */}
                <View style={styles.filterGroup}>
                  <Text style={styles.filterGroupTitle}>Length of Stay</Text>
                  {losOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.radioOption}
                      onPress={() => setLengthOfStay(option)}
                    >
                      <View style={styles.radioButton}>
                        {lengthOfStay === option && <View style={styles.radioButtonInner} />}
                      </View>
                      <Text style={styles.radioText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Inclusions */}
                <View style={styles.filterGroup}>
                  <Text style={styles.filterGroupTitle}>Inclusions</Text>
                  {inclusionOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.checkboxOption}
                      onPress={() => toggleInclusion(option.key)}
                    >
                      <View style={styles.checkbox}>
                        {inclusions[option.key] && (
                          <Icon name="check" size={16} color="#ffffff" />
                        )}
                      </View>
                      <Text style={styles.checkboxText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetButton} onPress={onClose}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyFooterButton} onPress={handleApply}>
            <Text style={styles.applyFooterText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 32 : 16,
    paddingVertical: isLargeScreen ? 20 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: isLargeScreen ? 24 : 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  applyButton: {
    padding: 4,
  },
  applyText: {
    fontSize: isLargeScreen ? 18 : 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: isLargeScreen ? 32 : 16,
  },
  section: {
    marginTop: isLargeScreen ? 32 : 24,
  },
  sectionTitle: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: isLargeScreen ? 16 : 12,
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: isLargeScreen ? 12 : 8,
    marginBottom: isLargeScreen ? 20 : 16,
  },
  presetChip: {
    paddingHorizontal: isLargeScreen ? 20 : 16,
    paddingVertical: isLargeScreen ? 14 : 10,
    borderRadius: isLargeScreen ? 24 : 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  presetChipActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  presetText: {
    fontSize: isLargeScreen ? 16 : 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  presetTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isLargeScreen ? 20 : 16,
    backgroundColor: '#f9fafb',
    borderRadius: isLargeScreen ? 14 : 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dropdownText: {
    fontSize: isLargeScreen ? 16 : 14,
    color: '#1f2937',
  },
  dropdownOptions: {
    marginTop: isLargeScreen ? 8 : 6,
    backgroundColor: '#ffffff',
    borderRadius: isLargeScreen ? 12 : 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: isLargeScreen ? 300 : 250,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isLargeScreen ? 14 : 12,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    gap: isLargeScreen ? 12 : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownOptionActive: {
    backgroundColor: '#eff6ff',
  },
  dropdownOptionText: {
    fontSize: isLargeScreen ? 16 : 14,
    color: '#1f2937',
  },
  advancedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  advancedSubtitle: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
    marginBottom: isLargeScreen ? 16 : 12,
  },
  advancedContent: {
    marginTop: isLargeScreen ? 16 : 12,
  },
  filterGroup: {
    marginBottom: isLargeScreen ? 24 : 20,
  },
  filterGroupTitle: {
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: isLargeScreen ? 12 : 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isLargeScreen ? 12 : 10,
    gap: isLargeScreen ? 12 : 10,
  },
  radioButton: {
    width: isLargeScreen ? 22 : 20,
    height: isLargeScreen ? 22 : 20,
    borderRadius: isLargeScreen ? 11 : 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: isLargeScreen ? 12 : 10,
    height: isLargeScreen ? 12 : 10,
    borderRadius: isLargeScreen ? 6 : 5,
    backgroundColor: '#2563eb',
  },
  radioText: {
    fontSize: isLargeScreen ? 16 : 14,
    color: '#1f2937',
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isLargeScreen ? 12 : 10,
    gap: isLargeScreen ? 12 : 10,
  },
  checkbox: {
    width: isLargeScreen ? 22 : 20,
    height: isLargeScreen ? 22 : 20,
    borderRadius: isLargeScreen ? 4 : 3,
    borderWidth: 2,
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: isLargeScreen ? 16 : 14,
    color: '#1f2937',
  },
  footer: {
    flexDirection: 'row',
    padding: isLargeScreen ? 24 : 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: isLargeScreen ? 16 : 12,
  },
  resetButton: {
    flex: 1,
    padding: isLargeScreen ? 20 : 16,
    borderRadius: isLargeScreen ? 14 : 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  resetText: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: '600',
    color: '#4b5563',
  },
  applyFooterButton: {
    flex: 2,
    padding: isLargeScreen ? 20 : 16,
    borderRadius: isLargeScreen ? 14 : 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  applyFooterText: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  monthYearSelector: {
    padding: isLargeScreen ? 16 : 12,
  },
  monthSelector: {
    flexDirection: 'row',
    marginBottom: isLargeScreen ? 16 : 12,
  },
  yearSelector: {
    flexDirection: 'row',
  },
  monthYearOption: {
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 10 : 8,
    marginRight: isLargeScreen ? 8 : 6,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  monthYearOptionActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  monthYearOptionText: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#1f2937',
    fontWeight: '500',
  },
  monthYearOptionTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default FilterModal;
