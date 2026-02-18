import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 1000;

const LensChatbot = ({ visible, onClose, propertyName = 'City Hotel Gotland' }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const scrollViewRef = useRef(null);

  const samplePrompts = {
    rate: [
      'How do my rates compare to my compset over the next 14 days?',
      'Which competitors changed their rates after my most recent update?',
      'Who is the price leader in my compset for the upcoming weekend?',
      'On which dates in the next 30 days am I priced highest within my compset?',
      'What is the average rate gap between my property and the compset for the next 7 days?',
    ],
    demand: [
      'Which upcoming dates show strong demand but my rates are below the compset average?',
      'What is the demand forecast for the next 2 weeks?',
      'Are there any demand spikes expected in the next month?',
      'How does current demand compare to the same period last year?',
    ],
    parity: [
      'Show me all rate parity violations for the next 7 days',
      'Which channels have the most parity issues?',
      'Are there any availability violations this week?',
      'What is my overall parity score across all channels?',
    ],
    market: [
      'What are the current market pricing trends?',
      'How is my positioning compared to competitors?',
      'What events are affecting demand in the next month?',
      'Show me market ADR trends for the next 30 days',
    ],
  };

  useEffect(() => {
    if (visible && messages.length === 0) {
      // Add welcome message
      setMessages([
        {
          id: 1,
          type: 'ai',
          text: `Hello! I'm Lens, your AI assistant. I can help you analyze rates, demand, parity, and market trends for ${propertyName}. Ask me anything!`,
        },
      ]);
    }
  }, [visible]);

  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        text: `I'm analyzing your query: "${inputText}". This feature is currently in development. In the full version, I would provide detailed insights based on your Navigator data.`,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handlePromptSelect = (prompt) => {
    setInputText(prompt);
    if (!isLargeScreen) {
      setShowSidebar(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderMessage = (message) => {
    if (message.type === 'user') {
      return (
        <View key={message.id} style={styles.userMessage}>
          <Text style={styles.userMessageText}>{message.text}</Text>
        </View>
      );
    } else {
      return (
        <View key={message.id} style={styles.aiMessage}>
          <Icon name="star" size={16} color="#fbbf24" style={styles.starIcon} />
          <View style={styles.aiMessageContent}>
            <Text style={styles.aiMessageText}>{message.text}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Lens - AI Assistant</Text>
            <Icon name="star" size={16} color="#fbbf24" style={styles.headerStar} />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => setShowSidebar(!showSidebar)}
              style={styles.headerButton}
            >
              <Icon name="info-outline" size={22} color="#1f2937" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Icon name="close" size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {/* Chat Area */}
          <View style={[styles.chatContainer, showSidebar && isLargeScreen && styles.chatContainerWithSidebar]}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            >
              {messages.map(renderMessage)}
            </ScrollView>

            {/* Input Area */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.micButton}>
                  <Icon name="mic" size={20} color="#6b7280" />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Ask me anything..."
                  placeholderTextColor="#9ca3af"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                  maxLength={500}
                  onSubmitEditing={handleSend}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                  disabled={!inputText.trim()}
                >
                  <Icon name="send" size={20} color={inputText.trim() ? '#2563eb' : '#9ca3af'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.disclaimer}>
                Lens may make mistakes at times, but rest assured—your data is not used to train AI models.
              </Text>
            </KeyboardAvoidingView>
          </View>

          {/* Sidebar - Desktop: Side panel, Mobile: Overlay */}
          {showSidebar && (
            <>
              {!isLargeScreen && (
                <TouchableOpacity
                  style={styles.overlay}
                  activeOpacity={1}
                  onPress={() => setShowSidebar(false)}
                />
              )}
              <View style={[
                styles.sidebar,
                !isLargeScreen && styles.sidebarMobile
              ]}>
                <View style={styles.sidebarHeader}>
                  <View style={styles.sidebarHeaderTop}>
                    <Text style={styles.sidebarTitle}>Sample Prompts</Text>
                    {!isLargeScreen && (
                      <TouchableOpacity
                        onPress={() => setShowSidebar(false)}
                        style={styles.closeSidebarButton}
                      >
                        <Icon name="close" size={20} color="#1f2937" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={styles.sidebarSubtitle}>
                    Get instant insights from your Navigator data — compare rates, track demand shifts, detect parity issues, and uncover pricing opportunities using natural language.
                  </Text>
                </View>

                <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
                  {/* Rate Analytics */}
                  <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => toggleSection('rate')}
                  >
                    <Text style={styles.sectionHeaderText}>Rate Analytics</Text>
                    <Icon
                      name={expandedSection === 'rate' ? 'expand-less' : 'expand-more'}
                      size={20}
                      color="#4b5563"
                    />
                  </TouchableOpacity>
                  {expandedSection === 'rate' && (
                    <View style={styles.promptsList}>
                      {samplePrompts.rate.map((prompt, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.promptItem}
                          onPress={() => handlePromptSelect(prompt)}
                        >
                          <Text style={styles.promptText}>{prompt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Demand Analytics */}
                  <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => toggleSection('demand')}
                  >
                    <Text style={styles.sectionHeaderText}>Demand Analytics</Text>
                    <Icon
                      name={expandedSection === 'demand' ? 'expand-less' : 'expand-more'}
                      size={20}
                      color="#4b5563"
                    />
                  </TouchableOpacity>
                  {expandedSection === 'demand' && (
                    <View style={styles.promptsList}>
                      {samplePrompts.demand.map((prompt, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.promptItem}
                          onPress={() => handlePromptSelect(prompt)}
                        >
                          <Text style={styles.promptText}>{prompt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Parity Analytics */}
                  <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => toggleSection('parity')}
                  >
                    <Text style={styles.sectionHeaderText}>Parity Analytics</Text>
                    <Icon
                      name={expandedSection === 'parity' ? 'expand-less' : 'expand-more'}
                      size={20}
                      color="#4b5563"
                    />
                  </TouchableOpacity>
                  {expandedSection === 'parity' && (
                    <View style={styles.promptsList}>
                      {samplePrompts.parity.map((prompt, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.promptItem}
                          onPress={() => handlePromptSelect(prompt)}
                        >
                          <Text style={styles.promptText}>{prompt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Market Dynamics & Pricing Trends */}
                  <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => toggleSection('market')}
                  >
                    <Text style={styles.sectionHeaderText}>Market Dynamics & Pricing Trends</Text>
                    <Icon
                      name={expandedSection === 'market' ? 'expand-less' : 'expand-more'}
                      size={20}
                      color="#4b5563"
                    />
                  </TouchableOpacity>
                  {expandedSection === 'market' && (
                    <View style={styles.promptsList}>
                      {samplePrompts.market.map((prompt, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.promptItem}
                          onPress={() => handlePromptSelect(prompt)}
                        >
                          <Text style={styles.promptText}>{prompt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </ScrollView>
              </View>
            </>
          )}
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
    paddingHorizontal: isLargeScreen ? 24 : 16,
    paddingVertical: isLargeScreen ? 16 : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: isLargeScreen ? 20 : 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  headerStar: {
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isLargeScreen ? 16 : 12,
  },
  headerButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    minWidth: 0,
  },
  chatContainerWithSidebar: {
    flex: 0,
    width: isLargeScreen ? width - 400 : width,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: isLargeScreen ? 24 : 16,
    paddingBottom: isLargeScreen ? 100 : 80,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
    borderRadius: isLargeScreen ? 18 : 16,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 12 : 10,
    maxWidth: '75%',
    marginBottom: isLargeScreen ? 16 : 12,
  },
  userMessageText: {
    color: '#ffffff',
    fontSize: isLargeScreen ? 15 : 14,
    lineHeight: isLargeScreen ? 22 : 20,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    maxWidth: '85%',
    marginBottom: isLargeScreen ? 16 : 12,
  },
  starIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  aiMessageContent: {
    backgroundColor: '#ffffff',
    borderRadius: isLargeScreen ? 18 : 16,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 12 : 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flex: 1,
  },
  aiMessageText: {
    color: '#1f2937',
    fontSize: isLargeScreen ? 15 : 14,
    lineHeight: isLargeScreen ? 22 : 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 16 : 12,
    paddingVertical: isLargeScreen ? 12 : 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: isLargeScreen ? 12 : 8,
  },
  micButton: {
    padding: isLargeScreen ? 8 : 6,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: isLargeScreen ? 24 : 20,
    paddingHorizontal: isLargeScreen ? 16 : 14,
    paddingVertical: isLargeScreen ? 12 : 10,
    fontSize: isLargeScreen ? 15 : 14,
    color: '#1f2937',
    maxHeight: 100,
  },
  sendButton: {
    padding: isLargeScreen ? 8 : 6,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  disclaimer: {
    fontSize: isLargeScreen ? 11 : 10,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: isLargeScreen ? 16 : 12,
    paddingBottom: isLargeScreen ? 12 : 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  sidebar: {
    width: isLargeScreen ? 400 : width * 0.9,
    maxWidth: isLargeScreen ? 400 : width * 0.9,
    backgroundColor: '#ffffff',
    borderLeftWidth: isLargeScreen ? 1 : 0,
    borderLeftColor: '#e5e7eb',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sidebarMobile: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    maxHeight: '80%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  sidebarHeader: {
    padding: isLargeScreen ? 24 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sidebarHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isLargeScreen ? 12 : 8,
  },
  closeSidebarButton: {
    padding: 4,
  },
  sidebarTitle: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  sidebarSubtitle: {
    fontSize: isLargeScreen ? 14 : 12,
    color: '#6b7280',
    lineHeight: isLargeScreen ? 20 : 18,
  },
  sidebarContent: {
    flex: 1,
    padding: isLargeScreen ? 24 : 16,
    paddingBottom: isLargeScreen ? 24 : 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: isLargeScreen ? 12 : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionHeaderText: {
    fontSize: isLargeScreen ? 15 : 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  promptsList: {
    paddingVertical: isLargeScreen ? 8 : 6,
  },
  promptItem: {
    paddingVertical: isLargeScreen ? 12 : 10,
    paddingHorizontal: isLargeScreen ? 12 : 10,
    borderRadius: isLargeScreen ? 8 : 6,
    backgroundColor: '#f9fafb',
    marginBottom: isLargeScreen ? 8 : 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  promptText: {
    fontSize: isLargeScreen ? 14 : 13,
    color: '#1f2937',
    lineHeight: isLargeScreen ? 20 : 18,
  },
});

export default LensChatbot;
