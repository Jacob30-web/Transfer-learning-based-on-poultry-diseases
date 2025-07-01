import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, ChevronRight, Circle as XCircle, TriangleAlert as AlertTriangle, Shield, Activity, Thermometer, Droplets, Clock } from 'lucide-react-native';

type DiseaseInfo = {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  color: string;
  image: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  mortality: string;
  incubation: string;
  contagious: boolean;
};

export default function Information() {
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const diseases: DiseaseInfo[] = [
    {
      id: '1',
      name: 'Coccidiosis',
      description: 'A parasitic disease caused by protozoan parasites of the genus Eimeria that affects the intestinal tract of poultry.',
      severity: 'high',
      color: '#F59E0B',
      image: 'https://images.pexels.com/photos/6875131/pexels-photo-6875131.jpeg?auto=compress&cs=tinysrgb&w=400',
      symptoms: [
        'Bloody or mucoid diarrhea',
        'Loss of appetite',
        'Weight loss',
        'Lethargy and weakness',
        'Pale comb and wattles',
        'Dehydration',
        'Reduced egg production'
      ],
      causes: [
        'Ingestion of sporulated oocysts from contaminated environment',
        'Poor sanitation and hygiene',
        'Overcrowding',
        'Stress factors',
        'Wet litter conditions'
      ],
      treatment: [
        'Administer anticoccidial drugs (Amprolium, Sulfadimethoxine)',
        'Provide electrolyte solutions',
        'Isolate affected birds',
        'Improve environmental conditions',
        'Supportive care with vitamins'
      ],
      prevention: [
        'Use anticoccidial feed additives',
        'Maintain dry litter',
        'Regular cleaning and disinfection',
        'Avoid overcrowding',
        'Vaccination programs where appropriate'
      ],
      mortality: '10-80%',
      incubation: '4-7 days',
      contagious: true
    },
    {
      id: '2',
      name: 'Newcastle Disease',
      description: 'A highly contagious viral disease affecting domestic and wild birds worldwide, caused by Newcastle Disease Virus (NDV).',
      severity: 'critical',
      color: '#EF4444',
      image: 'https://images.pexels.com/photos/6875126/pexels-photo-6875126.jpeg?auto=compress&cs=tinysrgb&w=400',
      symptoms: [
        'Respiratory distress (gasping, coughing)',
        'Greenish watery diarrhea',
        'Nervous signs (paralysis, twisted neck)',
        'Swelling around eyes and neck',
        'Drop in egg production',
        'Soft-shelled or misshapen eggs',
        'Sudden death'
      ],
      causes: [
        'Newcastle Disease Virus (NDV) infection',
        'Contact with infected birds',
        'Contaminated feed, water, or equipment',
        'Airborne transmission',
        'Wild bird carriers'
      ],
      treatment: [
        'No specific treatment available',
        'Supportive care (fluids, vitamins)',
        'Quarantine affected birds',
        'Contact veterinary authorities',
        'Implement strict biosecurity'
      ],
      prevention: [
        'Regular vaccination programs',
        'Strict biosecurity measures',
        'Quarantine new birds',
        'Control access to poultry areas',
        'Proper disposal of dead birds'
      ],
      mortality: '90-100%',
      incubation: '2-15 days',
      contagious: true
    },
    {
      id: '3',
      name: 'Salmonella',
      description: 'A bacterial infection caused by various Salmonella species that can affect poultry and pose risks to human health.',
      severity: 'high',
      color: '#EF4444',
      image: 'https://images.pexels.com/photos/6875133/pexels-photo-6875133.jpeg?auto=compress&cs=tinysrgb&w=400',
      symptoms: [
        'Diarrhea (may be bloody)',
        'Loss of appetite',
        'Dehydration',
        'Listlessness',
        'Unkempt appearance',
        'Reduced egg production',
        'Joint swelling (in chronic cases)'
      ],
      causes: [
        'Contaminated feed or water',
        'Poor sanitation',
        'Infected breeding stock',
        'Rodent and insect vectors',
        'Contaminated equipment'
      ],
      treatment: [
        'Antibiotic therapy (under veterinary guidance)',
        'Fluid and electrolyte replacement',
        'Probiotics to restore gut flora',
        'Improved hygiene practices',
        'Isolation of affected birds'
      ],
      prevention: [
        'Source feed from reputable suppliers',
        'Regular testing of feed and water',
        'Rodent and pest control',
        'Proper hand hygiene',
        'Regular cleaning and disinfection'
      ],
      mortality: '10-50%',
      incubation: '6-72 hours',
      contagious: true
    },
    {
      id: '4',
      name: 'Healthy Practices',
      description: 'Guidelines and best practices for maintaining optimal poultry health and preventing disease outbreaks.',
      severity: 'low',
      color: '#22C55E',
      image: 'https://images.pexels.com/photos/6875125/pexels-photo-6875125.jpeg?auto=compress&cs=tinysrgb&w=400',
      symptoms: [
        'Alert and active behavior',
        'Bright red combs and wattles',
        'Clear, bright eyes',
        'Regular eating and drinking',
        'Normal egg production',
        'Clean, well-formed droppings',
        'Smooth, well-kept feathers'
      ],
      causes: [
        'Proper nutrition and feed quality',
        'Clean water supply',
        'Adequate ventilation',
        'Appropriate stocking density',
        'Regular health monitoring'
      ],
      treatment: [
        'Continue current management practices',
        'Regular health monitoring',
        'Maintain environmental conditions',
        'Provide balanced nutrition',
        'Ensure adequate space and ventilation'
      ],
      prevention: [
        'Implement biosecurity protocols',
        'Regular vaccination schedules',
        'Quality feed and clean water',
        'Proper ventilation systems',
        'Regular health checks and monitoring'
      ],
      mortality: '< 2%',
      incubation: 'N/A',
      contagious: false
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'high': return AlertTriangle;
      case 'medium': return Activity;
      case 'low': return Shield;
      default: return Activity;
    }
  };

  const DiseaseCard = ({ disease }: { disease: DiseaseInfo }) => {
    const SeverityIcon = getSeverityIcon(disease.severity);
    
    return (
      <TouchableOpacity
        style={[styles.diseaseCard, { borderLeftColor: disease.color }]}
        onPress={() => {
          setSelectedDisease(disease);
          setShowDetails(true);
        }}
      >
        <Image source={{ uri: disease.image }} style={styles.diseaseImage} />
        <View style={styles.diseaseInfo}>
          <View style={styles.diseaseHeader}>
            <Text style={styles.diseaseName}>{disease.name}</Text>
            <View style={styles.severityContainer}>
              <SeverityIcon size={16} color={disease.color} />
              <Text style={[styles.severityText, { color: disease.color }]}>
                {disease.severity.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.diseaseDescription} numberOfLines={3}>
            {disease.description}
          </Text>
          <View style={styles.diseaseStats}>
            <View style={styles.statItem}>
              <Clock size={14} color="#6B7280" />
              <Text style={styles.statText}>Incubation: {disease.incubation}</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDetailsModal = () => (
    <Modal visible={showDetails} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Disease Information</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowDetails(false)}
          >
            <XCircle size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        {selectedDisease && (
          <ScrollView style={styles.modalContent}>
            <View style={styles.detailsHeader}>
              <Image 
                source={{ uri: selectedDisease.image }} 
                style={styles.detailsImage} 
              />
              <View style={styles.detailsOverlay}>
                <Text style={styles.detailsTitle}>{selectedDisease.name}</Text>
                <View style={styles.detailsSeverity}>
                  {React.createElement(getSeverityIcon(selectedDisease.severity), {
                    size: 20,
                    color: '#FFFFFF'
                  })}
                  <Text style={styles.detailsSeverityText}>
                    {selectedDisease.severity.toUpperCase()} RISK
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.detailsContent}>
              <Text style={styles.detailsDescription}>
                {selectedDisease.description}
              </Text>
              
              <View style={styles.quickStats}>
                <View style={styles.quickStat}>
                  <Thermometer size={20} color="#EF4444" />
                  <Text style={styles.quickStatLabel}>Mortality Rate</Text>
                  <Text style={styles.quickStatValue}>{selectedDisease.mortality}</Text>
                </View>
                <View style={styles.quickStat}>
                  <Clock size={20} color="#3B82F6" />
                  <Text style={styles.quickStatLabel}>Incubation</Text>
                  <Text style={styles.quickStatValue}>{selectedDisease.incubation}</Text>
                </View>
                <View style={styles.quickStat}>
                  <Droplets size={20} color={selectedDisease.contagious ? '#F59E0B' : '#22C55E'} />
                  <Text style={styles.quickStatLabel}>Contagious</Text>
                  <Text style={styles.quickStatValue}>
                    {selectedDisease.contagious ? 'Yes' : 'No'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Symptoms</Text>
                <View style={styles.itemsList}>
                  {selectedDisease.symptoms.map((symptom, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={[styles.bullet, { backgroundColor: '#EF4444' }]} />
                      <Text style={styles.listItemText}>{symptom}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Causes</Text>
                <View style={styles.itemsList}>
                  {selectedDisease.causes.map((cause, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={[styles.bullet, { backgroundColor: '#F59E0B' }]} />
                      <Text style={styles.listItemText}>{cause}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Treatment</Text>
                <View style={styles.itemsList}>
                  {selectedDisease.treatment.map((treatment, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={[styles.bullet, { backgroundColor: '#3B82F6' }]} />
                      <Text style={styles.listItemText}>{treatment}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Prevention</Text>
                <View style={styles.itemsList}>
                  {selectedDisease.prevention.map((prevention, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={[styles.bullet, { backgroundColor: '#22C55E' }]} />
                      <Text style={styles.listItemText}>{prevention}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BookOpen size={32} color="#22C55E" />
        <Text style={styles.headerTitle}>Disease Information</Text>
        <Text style={styles.headerSubtitle}>
          Learn about common poultry diseases and health management
        </Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Understanding Poultry Health</Text>
          <Text style={styles.introText}>
            Early detection and proper management are crucial for maintaining healthy flocks. 
            Learn about common diseases, their symptoms, and prevention strategies to protect your poultry.
          </Text>
        </View>
        
        <View style={styles.diseasesSection}>
          <Text style={styles.sectionHeader}>Common Diseases</Text>
          {diseases.map((disease) => (
            <DiseaseCard key={disease.id} disease={disease} />
          ))}
        </View>
        
        <View style={styles.tipsSection}>
          <Text style={styles.sectionHeader}>General Health Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Shield size={20} color="#22C55E" />
              <Text style={styles.tipText}>
                Implement strict biosecurity measures to prevent disease entry
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Activity size={20} color="#3B82F6" />
              <Text style={styles.tipText}>
                Monitor birds daily for changes in behavior or appearance
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Droplets size={20} color="#06B6D4" />
              <Text style={styles.tipText}>
                Ensure clean, fresh water is always available
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Thermometer size={20} color="#F59E0B" />
              <Text style={styles.tipText}>
                Maintain proper ventilation and temperature control
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {renderDetailsModal()}
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
  introSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  introTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  introText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  diseasesSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  diseaseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  diseaseImage: {
    width: '100%',
    height: 160,
  },
  diseaseInfo: {
    padding: 20,
  },
  diseaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diseaseName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  severityText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  diseaseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  diseaseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  tipsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  tipsList: {
    gap: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
  },
  detailsHeader: {
    position: 'relative',
    height: 240,
  },
  detailsImage: {
    width: '100%',
    height: '100%',
  },
  detailsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  detailsTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  detailsSeverity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailsSeverityText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  detailsContent: {
    padding: 20,
  },
  detailsDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 16,
  },
  quickStat: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginTop: 8,
    marginBottom: 4,
  },
  quickStatValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  itemsList: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
});