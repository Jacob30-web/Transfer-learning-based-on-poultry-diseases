import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings as SettingsIcon, User, Bell, Shield, Database, CircleHelp as HelpCircle, FileText, Smartphone, Globe, ChevronRight, Moon, Vibrate, Mail, Phone, ExternalLink } from 'lucide-react-native';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [vibration, setVibration] = useState(true);

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true,
    rightComponent 
  }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Icon size={24} color="#6B7280" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightComponent}
        {showArrow && <ChevronRight size={20} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Profile management coming soon!');
  };

  const handleDataExportPress = () => {
    Alert.alert(
      'Export Data',
      'Would you like to export your diagnosis history and farm data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => Alert.alert('Success', 'Data exported successfully!') }
      ]
    );
  };

  const handleBackupPress = () => {
    Alert.alert(
      'Backup Data',
      'Create a backup of your farm data and settings?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Backup', onPress: () => Alert.alert('Success', 'Backup created successfully!') }
      ]
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert('Privacy Policy', 'Opens privacy policy document...');
  };

  const handleTermsPress = () => {
    Alert.alert('Terms of Service', 'Opens terms of service document...');
  };

  const handleSupportPress = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact support?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email', onPress: () => Alert.alert('Email', 'support@poultryhealth.com') },
        { text: 'Phone', onPress: () => Alert.alert('Phone', '+1 (555) 123-4567') }
      ]
    );
  };

  const handleAboutPress = () => {
    Alert.alert(
      'About Poultry Health App',
      'Version 1.0.0\n\nAI-powered poultry disease classification system designed to help farmers manage their flock health effectively.\n\nDeveloped with transfer learning technology for accurate disease detection.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SettingsIcon size={32} color="#22C55E" />
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>
          Customize your app experience
        </Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <SectionHeader title="Profile" />
        <View style={styles.section}>
          <SettingItem
            icon={User}
            title="Farm Profile"
            subtitle="Manage your farm information"
            onPress={handleProfilePress}
          />
        </View>

        {/* Notifications Section */}
        <SectionHeader title="Notifications" />
        <View style={styles.section}>
          <SettingItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Receive alerts and updates"
            showArrow={false}
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
                thumbColor={notifications ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={Vibrate}
            title="Vibration"
            subtitle="Vibrate for notifications"
            showArrow={false}
            rightComponent={
              <Switch
                value={vibration}
                onValueChange={setVibration}
                trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
                thumbColor={vibration ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
        </View>

        {/* App Preferences */}
        <SectionHeader title="App Preferences" />
        <View style={styles.section}>
          <SettingItem
            icon={Moon}
            title="Dark Mode"
            subtitle="Use dark theme"
            showArrow={false}
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
                thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={Globe}
            title="Language"
            subtitle="English"
            onPress={() => Alert.alert('Language', 'Language selection coming soon!')}
          />
        </View>

        {/* Data Management */}
        <SectionHeader title="Data Management" />
        <View style={styles.section}>
          <SettingItem
            icon={Database}
            title="Auto Sync"
            subtitle="Automatically sync data"
            showArrow={false}
            rightComponent={
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
                thumbColor={autoSync ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={FileText}
            title="Export Data"
            subtitle="Export diagnosis history"
            onPress={handleDataExportPress}
          />
          <SettingItem
            icon={Shield}
            title="Backup Data"
            subtitle="Create data backup"
            onPress={handleBackupPress}
          />
        </View>

        {/* Support & Legal */}
        <SectionHeader title="Support & Legal" />
        <View style={styles.section}>
          <SettingItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={handleSupportPress}
          />
          <SettingItem
            icon={FileText}
            title="Privacy Policy"
            subtitle="How we handle your data"
            onPress={handlePrivacyPress}
          />
          <SettingItem
            icon={FileText}
            title="Terms of Service"
            subtitle="App terms and conditions"
            onPress={handleTermsPress}
          />
        </View>

        {/* About */}
        <SectionHeader title="About" />
        <View style={styles.section}>
          <SettingItem
            icon={Smartphone}
            title="About App"
            subtitle="Version 1.0.0"
            onPress={handleAboutPress}
          />
        </View>

        {/* Contact Info */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Need Help?</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail size={16} color="#6B7280" />
              <Text style={styles.contactText}>support@poultryhealth.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={16} color="#6B7280" />
              <Text style={styles.contactText}>+1 (555) 123-4567</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Poultry Health App © 2024
          </Text>
          <Text style={styles.footerSubtext}>
            AI-powered disease classification for better farm management
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 32,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 16,
    padding: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 4,
  },
});