import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;
const isLargeScreen = width >= 1000;

const NavigatorDrawer = ({ navigation }) => {
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('City Hotel Gotland');
  const [dropdownAnimation] = useState(new Animated.Value(0));
  const currentRoute = useNavigationState((state) => state?.routes[state?.index]?.name) || 'Overview';

  const properties = [
    'City Hotel Gotland',
    'Ayodhya Bali',
    'Grand Tulum Resort',
  ];

  const menuItems = [
    {
      section: 'REVENUE MANAGEMENT',
      items: [
        { name: 'Cluster', icon: 'people', route: 'Cluster', showIf: false }, // Only if user has access
        { name: 'Overview', icon: 'home', route: 'Overview' },
        { name: 'Rate Trends', icon: 'show-chart', route: 'RateTrends' },
        { name: 'Demand Forecast', icon: 'bar-chart', route: 'DemandForecast' },
        { name: 'Parity Monitor', icon: 'security', route: 'ParityMonitor' },
        { name: 'OTA Rankings', icon: 'star', route: 'OTARankings' },
        { name: 'Events Calendar', icon: 'event', route: 'EventsCalendar' },
      ],
    },
    {
      section: 'SUPPORT',
      items: [
        { name: 'Reports', icon: 'description', route: 'Reports' },
        { name: 'Help & Support', icon: 'help', route: 'HelpSupport' },
      ],
    },
  ];

  const handleNavigate = (route) => {
    navigation.navigate(route);
    navigation.closeDrawer();
  };

  const togglePropertyDropdown = () => {
    const toValue = propertyDropdownOpen ? 0 : 1;
    setPropertyDropdownOpen(!propertyDropdownOpen);
    
    Animated.spring(dropdownAnimation, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    togglePropertyDropdown();
    // In real app, this would change the property context
  };

  const dropdownHeight = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, properties.length * 52],
  });

  const dropdownOpacity = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.logoText}>Navigator</Text>
            <TouchableOpacity
              onPress={() => navigation.closeDrawer()}
              style={styles.closeButton}
            >
              <Icon name="close" size={isLargeScreen ? 28 : 24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Revenue Intelligence</Text>
          
          {/* Current Property with Dropdown */}
          <View style={styles.propertyContainer}>
            <TouchableOpacity
              style={styles.propertySelector}
              onPress={togglePropertyDropdown}
              activeOpacity={0.7}
            >
              <Icon name="location-on" size={isLargeScreen ? 20 : 18} color="#ffffff" />
              <Text style={styles.propertyText} numberOfLines={1}>
                {selectedProperty}
              </Text>
              <Icon
                name={propertyDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
                size={isLargeScreen ? 24 : 20}
                color="#ffffff"
              />
            </TouchableOpacity>

            {/* Property Dropdown with Animation */}
            <Animated.View
              style={[
                styles.propertyDropdown,
                {
                  maxHeight: dropdownHeight,
                  opacity: dropdownOpacity,
                },
              ]}
            >
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                style={styles.dropdownScroll}
              >
                {properties.map((property, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.propertyOption,
                      selectedProperty === property && styles.propertyOptionActive,
                    ]}
                    onPress={() => handlePropertySelect(property)}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name={selectedProperty === property ? 'check-circle' : 'location-on'}
                      size={isLargeScreen ? 20 : 18}
                      color={selectedProperty === property ? '#2563eb' : '#6b7280'}
                    />
                    <Text
                      style={[
                        styles.propertyOptionText,
                        selectedProperty === property && styles.propertyOptionTextActive,
                      ]}
                    >
                      {property}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </View>
        </View>

        {/* Navigation Items */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionHeader}>{section.section}</Text>
              {section.items
                .filter((item) => item.showIf !== false)
                .map((item, itemIndex) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <TouchableOpacity
                      key={itemIndex}
                      style={[styles.menuItem, isActive && styles.menuItemActive]}
                      onPress={() => handleNavigate(item.route)}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name={item.icon}
                        size={isLargeScreen ? 26 : 22}
                        color={isActive ? '#2563eb' : '#4b5563'}
                      />
                      <Text
                        style={[
                          styles.menuItemText,
                          isActive && styles.menuItemTextActive,
                        ]}
                      >
                        {item.name}
                      </Text>
                      {isActive && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                  );
                })}
            </View>
          ))}
        </ScrollView>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => handleNavigate('MyAccount')}
            activeOpacity={0.7}
          >
            <Icon name="account-circle" size={isLargeScreen ? 26 : 22} color="#4b5563" />
            <Text style={styles.footerText}>My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => {
              // Handle logout
              navigation.closeDrawer();
            }}
            activeOpacity={0.7}
          >
            <Icon name="logout" size={isLargeScreen ? 26 : 22} color="#ef4444" />
            <Text style={[styles.footerText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: DRAWER_WIDTH,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2563eb',
    paddingHorizontal: isLargeScreen ? 32 : 20,
    paddingTop: isLargeScreen ? 24 : 16,
    paddingBottom: isLargeScreen ? 28 : 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isLargeScreen ? 12 : 8,
  },
  logoText: {
    fontSize: isLargeScreen ? 28 : 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: isLargeScreen ? 16 : 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: isLargeScreen ? 20 : 16,
  },
  propertyContainer: {
    position: 'relative',
    zIndex: 10,
  },
  propertySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: isLargeScreen ? 16 : 12,
    paddingVertical: isLargeScreen ? 14 : 10,
    borderRadius: isLargeScreen ? 10 : 8,
    gap: isLargeScreen ? 12 : 8,
  },
  propertyText: {
    flex: 1,
    fontSize: isLargeScreen ? 16 : 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  propertyDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: isLargeScreen ? 12 : 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  propertyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 16 : 12,
    paddingVertical: isLargeScreen ? 16 : 12,
    gap: isLargeScreen ? 12 : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    minHeight: isLargeScreen ? 56 : 52,
  },
  propertyOptionActive: {
    backgroundColor: '#eff6ff',
  },
  propertyOptionText: {
    flex: 1,
    fontSize: isLargeScreen ? 16 : 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  propertyOptionTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: isLargeScreen ? 32 : 20,
  },
  section: {
    marginTop: isLargeScreen ? 32 : 24,
    paddingHorizontal: isLargeScreen ? 32 : 20,
  },
  sectionHeader: {
    fontSize: isLargeScreen ? 13 : 11,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: isLargeScreen ? 16 : 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isLargeScreen ? 18 : 14,
    paddingHorizontal: isLargeScreen ? 16 : 12,
    borderRadius: isLargeScreen ? 10 : 8,
    marginBottom: isLargeScreen ? 6 : 4,
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: '#eff6ff',
  },
  menuItemText: {
    flex: 1,
    fontSize: isLargeScreen ? 18 : 15,
    color: '#4b5563',
    fontWeight: '500',
    marginLeft: isLargeScreen ? 20 : 16,
  },
  menuItemTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: isLargeScreen ? 5 : 4,
    backgroundColor: '#2563eb',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: isLargeScreen ? 32 : 20,
    paddingVertical: isLargeScreen ? 20 : 16,
    gap: isLargeScreen ? 12 : 8,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isLargeScreen ? 16 : 12,
    gap: isLargeScreen ? 16 : 12,
  },
  footerText: {
    fontSize: isLargeScreen ? 18 : 15,
    color: '#4b5563',
    fontWeight: '500',
  },
  logoutText: {
    color: '#ef4444',
  },
});

export default NavigatorDrawer;
