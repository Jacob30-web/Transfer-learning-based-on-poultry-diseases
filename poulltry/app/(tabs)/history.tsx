import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Calendar, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, TrendingUp, Eye, Circle as XCircle, FileText } from 'lucide-react-native';

type DiagnosisHistory = {
  id: string;
  date: string;
  disease: string;
  confidence: number;
  status: 'treated' | 'monitoring' | 'resolved';
  location: string;
  birdCount: number;
  symptoms: string[];
  treatment: string[];
};

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'treated' | 'monitoring' | 'resolved'>('all');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisHistory | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const diagnoses: DiagnosisHistory[] = [
    {
      id: '1',
      date: '2024-01-15',
      disease: 'Coccidiosis',
      confidence: 87,
      status: 'treated',
      location: 'Coop A',
      birdCount: 15,
      symptoms: ['Diarrhea', 'Blood in droppings', 'Lethargy'],
      treatment: ['Amprolium medication', 'Electrolyte solution', 'Isolation']
    },
    {
      id: '2',
      date: '2024-01-12',
      disease: 'Newcastle Disease',
      confidence: 92,
      status: 'monitoring',
      location: 'Coop B',
      birdCount: 8,
      symptoms: ['Respiratory distress', 'Twisted neck', 'Paralysis'],
      treatment: ['Quarantine', 'Supportive care', 'Veterinary consultation']
    },
    {
      id: '3',
      date: '2024-01-10',
      disease: 'Salmonella',
      confidence: 78,
      status: 'resolved',
      location: 'Coop C',
      birdCount: 12,
      symptoms: ['Diarrhea', 'Loss of appetite', 'Dehydration'],
      treatment: ['Antibiotic therapy', 'Probiotics', 'Enhanced hygiene']
    },
    {
      id: '4',
      date: '2024-01-08',
      disease: 'Healthy',
      confidence: 94,
      status: 'resolved',
      location: 'Coop D',
      birdCount: 25,
      symptoms: ['Routine check'],
      treatment: ['Continue monitoring', 'Maintain current practices']
    },
    {
      id: '5',
      date: '2024-01-05',
      disease: 'Coccidiosis',
      confidence: 82,
      status: 'resolved',
      location: 'Coop A',
      birdCount: 7,
      symptoms: ['Mild diarrhea', 'Reduced appetite'],
      treatment: ['Preventive medication', 'Improved sanitation']
    }
  ];

  const filteredDiagnoses = diagnoses.filter(diagnosis => {
    const matchesSearch = diagnosis.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         diagnosis.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || diagnosis.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'treated': return '#F59E0B';
      case 'monitoring': return '#EF4444';
      case 'resolved': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const getDiseaseColor = (disease: string) => {
    switch (disease) {
      case 'Newcastle Disease': return '#EF4444';
      case 'Salmonella': return '#EF4444';
      case 'Coccidiosis': return '#F59E0B';
      case 'Healthy': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'treated': return AlertTriangle;
      case 'monitoring': return AlertTriangle;
      case 'resolved': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const DiagnosisCard = ({ diagnosis }: { diagnosis: DiagnosisHistory }) => {
    const StatusIcon = getStatusIcon(diagnosis.status);
    
    return (
      <TouchableOpacity
        style={styles.diagnosisCard}
        onPress={() => {
          setSelectedDiagnosis(diagnosis);
          setShowDetails(true);
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.diseaseInfo}>
            <View style={[
              styles.diseaseIndicator,
              { backgroundColor: getDiseaseColor(diagnosis.disease) }
            ]} />
            <View>
              <Text style={styles.diseaseName}>{diagnosis.disease}</Text>
              <Text style={styles.diagnosisDate}>{formatDate(diagnosis.date)}</Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <StatusIcon 
              size={20} 
              color={getStatusColor(diagnosis.status)} 
            />
            <Text style={[
              styles.statusText,
              { color: getStatusColor(diagnosis.status) }
            ]}>
              {diagnosis.status.charAt(0).toUpperCase() + diagnosis.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{diagnosis.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Birds Affected:</Text>
            <Text style={styles.detailValue}>{diagnosis.birdCount}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Confidence:</Text>
            <Text style={styles.detailValue}>{diagnosis.confidence}%</Text>
          </View>
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.symptomsPreview}>
            {diagnosis.symptoms.slice(0, 2).join(', ')}
            {diagnosis.symptoms.length > 2 && ` +${diagnosis.symptoms.length - 2} more`}
          </Text>
          <Eye size={16} color="#9CA3AF" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderDetailsModal = () => (
    <Modal visible={showDetails} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Diagnosis Details</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowDetails(false)}
          >
            <XCircle size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        {selectedDiagnosis && (
          <ScrollView style={styles.modalContent}>
            <View style={styles.detailsCard}>
              <View style={styles.detailsHeader}>
                <View style={[
                  styles.diseaseIndicator,
                  { backgroundColor: getDiseaseColor(selectedDiagnosis.disease) }
                ]} />
                <View style={styles.detailsHeaderInfo}>
                  <Text style={styles.detailsDiseaseName}>
                    {selectedDiagnosis.disease}
                  </Text>
                  <Text style={styles.detailsDate}>
                    {formatDate(selectedDiagnosis.date)}
                  </Text>
                </View>
                <View style={[
                  styles.confidenceBadge,
                  { backgroundColor: getDiseaseColor(selectedDiagnosis.disease) }
                ]}>
                  <Text style={styles.confidenceText}>
                    {selectedDiagnosis.confidence}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.detailsGrid}>
                <View style={styles.detailsItem}>
                  <Text style={styles.detailsLabel}>Location</Text>
                  <Text style={styles.detailsValue}>{selectedDiagnosis.location}</Text>
                </View>
                <View style={styles.detailsItem}>
                  <Text style={styles.detailsLabel}>Birds Affected</Text>
                  <Text style={styles.detailsValue}>{selectedDiagnosis.birdCount}</Text>
                </View>
                <View style={styles.detailsItem}>
                  <Text style={styles.detailsLabel}>Status</Text>
                  <Text style={[
                    styles.detailsValue,
                    { color: getStatusColor(selectedDiagnosis.status) }
                  ]}>
                    {selectedDiagnosis.status.charAt(0).toUpperCase() + selectedDiagnosis.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Observed Symptoms</Text>
              <View style={styles.symptomsList}>
                {selectedDiagnosis.symptoms.map((symptom, index) => (
                  <View key={index} style={styles.symptomItem}>
                    <View style={styles.symptomBullet} />
                    <Text style={styles.symptomText}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Treatment Applied</Text>
              <View style={styles.treatmentList}>
                {selectedDiagnosis.treatment.map((treatment, index) => (
                  <View key={index} style={styles.treatmentItem}>
                    <View style={styles.treatmentBullet} />
                    <Text style={styles.treatmentText}>{treatment}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );

  const stats = {
    total: diagnoses.length,
    resolved: diagnoses.filter(d => d.status === 'resolved').length,
    monitoring: diagnoses.filter(d => d.status === 'monitoring').length,
    treated: diagnoses.filter(d => d.status === 'treated').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diagnosis History</Text>
        <Text style={styles.headerSubtitle}>
          Track your poultry health records
        </Text>
      </View>
      
      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { borderLeftColor: '#3B82F6' }]}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Cases</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#22C55E' }]}>
          <Text style={styles.statNumber}>{stats.resolved}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#F59E0B' }]}>
          <Text style={styles.statNumber}>{stats.treated}</Text>
          <Text style={styles.statLabel}>Treated</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#EF4444' }]}>
          <Text style={styles.statNumber}>{stats.monitoring}</Text>
          <Text style={styles.statLabel}>Monitoring</Text>
        </View>
      </View>
      
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search diagnoses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {(['all', 'resolved', 'treated', 'monitoring'] as const).map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                filterStatus === status && styles.filterButtonActive
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text style={[
                styles.filterButtonText,
                filterStatus === status && styles.filterButtonTextActive
              ]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Diagnoses List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredDiagnoses.length > 0 ? (
          filteredDiagnoses.map((diagnosis) => (
            <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <FileText size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>No Records Found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start diagnosing your poultry to see history here'
              }
            </Text>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  diagnosisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  diseaseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diseaseIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  diseaseName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  diagnosisDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  symptomsPreview: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 32,
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
    padding: 20,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  detailsDiseaseName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  detailsDate: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confidenceText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  detailsValue: {
    fontSize: 16,
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
  symptomsList: {
    gap: 12,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symptomBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginRight: 12,
  },
  symptomText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  treatmentList: {
    gap: 12,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  treatmentBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginTop: 8,
    marginRight: 12,
  },
  treatmentText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
});